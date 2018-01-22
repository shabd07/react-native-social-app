import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { View, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import firebase from 'firebase';
import { Spinner } from 'nachos-ui';
import RNFetchBlob from 'react-native-fetch-blob'
const timer = require('react-native-timer');
const uuidv4 = require('uuid/v4');
import { Container, Card, CardItem, DeckSwiper, Left, Thumbnail, Body, Icon, Text } from 'native-base';
import { UpdateLoading, UpdateDeck, UpdateKey, DeleteCard } from '../actions/main';

const { width, height } = Dimensions.get('window');

const styles = {
    buttonStyle: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
        borderRadius: 100,
    },
    iconStyle: {
        fontSize: 50,
        color: 'white',
    },
    spinnerStyle: {
        height: height - 60,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
}

const mapStateToProps = ({ profileState, authState, mainState }) => {
    const { name } = profileState;
    const { user } = authState;
    const { deck_loaded, deck, userkey } = mainState
    return { name, user, deck_loaded, deck, userkey }; // access with this.props.user
};

class Deck extends Component {
    componentWillMount() {
        const updateKey = (friends, currentKey) => {
            let included = false;
            if (friends.val() !== null) {
                const friend_keys = Object.keys(friends.val());
                for (i = 0; i < friend_keys.length; i++) {
                    if (currentKey === friend_keys[i]) {
                        included = true;
                        break;
                    }
                }
            }
            if (!included) {
                if (currentKey !== this.props.user.uid) {
                    this.props.UpdateKey(currentKey);
                }
            }
        }
        const childSnapShot = (currentKey) => {
            firebase.database().ref(`pairings/${this.props.user.uid}/`)
                .once("value", function (friends) {
                    updateKey(friends, currentKey);
                }, readFail)

        }
        
        const retrieveData = () => {
            const { userkey } = this.props;
            if (userkey.length < 10) {
                userkey.forEach(element => {
                    if (element === userkey[userkey.length - 1]) {
                        firebase.database().ref(`/userdata/${element}/`)
                            .once("value", function (snapshot) {
                                const updated_snapshot = { ...snapshot.val(), uid: element };
                                retrieveLastImage(element, updated_snapshot);
                            }, readFail)
                    }
                    else {
                        firebase.database().ref(`/userdata/${element}/`)
                            .once("value", function (snapshot) {
                                const updated_snapshot = { ...snapshot.val(), uid: element };
                                retrieveImage(element, updated_snapshot);
                            }, readFail)
                    }
                });
            }
            else {
                for (i = 0; i < 10; i++) {
                    if (i === 9) {
                        firebase.database().ref(`/userdata/${element}/`)
                            .once("value", function (snapshot) {
                                const updated_snapshot = { ...snapshot.val(), uid: element };
                                retrieveLastImage(element, updated_snapshot);
                            }, readFail)
                    }
                    else {
                        firebase.database().ref(`/userdata/${element}/`)
                            .once("value", function (snapshot) {
                                const updated_snapshot = { ...snapshot.val(), uid: element };
                                retrieveImage(element, updated_snapshot);
                            }, readFail)
                    }
                }
            }
        }

        const dataSnapShot = (snapshot) => {
            // use once because we only need to load once everytime component
            // mounts rather than listen continuously, unlike when we get 
            // other user info we need to continuously listen out.
            const all_keys = Object.keys(snapshot.val())
            for (i = 0; i < all_keys.length; i++) {
                if (i === all_keys.length - 1) {
                    childSnapShot(all_keys[i])
                    timer.setTimeout('load_keys', () => retrieveData(), 3000);
                }
                else childSnapShot(all_keys[i]);
            }

        }

        
        const readFail = (errorObject) => {
            Alert.alert("The read failed", errorObject.code);
        }
        const updateLoading = () => {
            this.props.UpdateLoading();
        }
        const retrieveImage = (element, updated_snapshot) => {
            const imageRef = firebase.storage().ref(`/dp/${element}`);
            imageRef.getDownloadURL().then(function (url) {
                RNFetchBlob
                    .config({
                        fileCache: true,
                        // by adding this option, the temp files will have a file extension
                        appendExt: 'jpg',
                    })
                    .fetch('GET', url)
                    .then((res) => updateDeck(res, updated_snapshot))
            });
        }
        const updateDeck = (res, updated_snapshot) => {
            const snapshot_image = { ...updated_snapshot, uri: res.path() }
            this.props.UpdateDeck(snapshot_image);
        }
        const retrieveLastImage = (element, updated_snapshot) => {
            const imageRef = firebase.storage().ref(`/dp/${element}`);
            imageRef.getDownloadURL()
                .then(function (url) {
                    RNFetchBlob
                        .config({
                            fileCache: true,
                            appendExt: 'jpg'
                        })
                        .fetch('GET', url)
                        .then((res) => updateLastDeck(res, updated_snapshot))
                }).catch((error) => console.log(error))
        }
        const updateLastDeck = (res, updated_snapshot) => {
            const snapshot_image = { ...updated_snapshot, uri: res.path() }
            this.props.UpdateDeck(snapshot_image);
            timer.setTimeout('load_img', updateLoading, 3000);
        }

        // ROOT FUNCTION
        firebase.database().ref(`/userkey/`)
            .once("value", dataSnapShot, readFail)
    }
    like(item) {
        const uid = item.uid
        const myuid = this.props.user.uid;
        const pairingsRefA = firebase.database().ref(`/pairings/${uid}/${myuid}`);
        const pairingsRefB = firebase.database().ref(`/pairings/${myuid}/${uid}`);
        pairingsRefA.once("value", function (snapshot) {
            const result = snapshot.val();
            if (result === null) {
                pairingsRefB.set('?');
            }
            else if (result === '?') {
                const newid = uid + '_' + myuid;
                pairingsRefA.set(newid);
                pairingsRefB.set(newid);
                const system = { text: 'The two of you have matched!', createdAt: firebase.database.ServerValue.TIMESTAMP, system: true }
                const uuid_str = uuidv4();
                firebase.database().ref(`/messages/${newid}/${uuid_str}`).set(system);
            }
        }, (errorObject) => {
            Alert.alert("The read failed", errorObject.code);
        })
        // this.props.DeleteCard(item);
    }
    deckLoaded() {
        if (this.props.deck_loaded) {
            return (
                <Container>
                    <View>
                        <DeckSwiper
                            ref={(c) => this._deckSwiper = c}
                            // NativeBase allows its components to have a ref so other components
                            // can call its methods. This is used in the buttons below that control
                            // the swiping of this component.
                            dataSource={this.props.deck}
                            onSwipeRight={() => this.like(this._deckSwiper._root.state.selectedItem)}
                            renderEmpty={() =>
                                <View style={{ alignSelf: "center", justifyContent: 'center' }}>
                                    <Text>Over</Text>
                                </View>
                            }
                            renderItem={item =>
                                <Card style={{ elevation: 3, marginLeft: 20, marginRight: 20, marginTop: 20 }}>
                                    <CardItem>
                                        <Left>
                                            <Body>
                                                <Text>{item.name}</Text>
                                                <Text note>Age {item.myage[0]} | {item.gender}</Text>
                                            </Body>
                                        </Left>
                                    </CardItem>
                                    <CardItem cardBody>
                                        <Image style={{ height: 350, flex: 1 }} source={{ uri: item.uri }} />
                                    </CardItem>
                                    <CardItem>
                                        <Text>{item.info}</Text>
                                    </CardItem>
                                </Card>
                            }
                        />
                    </View>
                    <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: 25, left: 0, right: 0, justifyContent: 'space-around', padding: 15 }}>
                        <TouchableOpacity
                            onPress={() => this._deckSwiper._root.swipeLeft()}
                            style={{ ...styles.buttonStyle, backgroundColor: '#D24D57' }}
                        >
                            <Icon name={"close"} style={styles.iconStyle} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this._deckSwiper._root.swipeRight();
                                this.like(this._deckSwiper._root.state.selectedItem);
                            }}
                            style={{ ...styles.buttonStyle, backgroundColor: '#03A678' }}
                        >
                            <Icon name={"checkmark"} style={styles.iconStyle} />
                        </TouchableOpacity>
                    </View>
                </Container>
            );
        }
        else {
            return (
                <View style={styles.spinnerStyle}>
                    <Spinner size={40} />
                </View>
            );
        };
    }
    render() {
        return this.deckLoaded();
    }
}

export default connect(mapStateToProps, { UpdateLoading, UpdateDeck, UpdateKey, DeleteCard })(Deck);

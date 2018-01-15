import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import firebase from 'firebase';
import { Spinner } from 'nachos-ui';
import RNFetchBlob from 'react-native-fetch-blob'
const timer = require('react-native-timer');
import { Container, Header, Card, CardItem, DeckSwiper, Left, Thumbnail, Body, Icon, Text } from 'native-base';
import { UpdateLoading } from '../actions/main';

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

let userkey = [];
let deck = [];

const mapStateToProps = ({ profileState, authState, mainState }) => {
    const { name } = profileState;
    const { user } = authState;
    const { deck_loaded } = mainState
    return { name, user, deck_loaded }; // access with this.props.user
};

class Deck extends Component {
    componentDidMount() {
        userkey = [];
        deck = [];
        const childSnapShot = (snapshot) => {
            if (snapshot.key !== this.props.user.uid) {
                userkey.push(snapshot.key);
            }
        }
        const dataSnapShot = (snapshot) => {
            // use once because we only need to load once everytime component
            // mounts rather than listen continuously, unlike when we get 
            // other user info we need to continuously listen out.
            snapshot.forEach(childSnapShot);
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
                    .then((res) => {
                        const snapshot_image = { ...updated_snapshot, uri: res.path() }
                        deck.push(snapshot_image);
                    })
            });
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
                        .then((res) => {
                            const snapshot_image = { ...updated_snapshot, uri: res.path() }
                            deck.push(snapshot_image);
                            timer.setTimeout('load_img', updateLoading, 3000);
                        })
                }).catch((error) => console.log(error))
        }

        // ROOT FUNCTION
        firebase.database().ref(`/userkey/`)
            .once("value", dataSnapShot, readFail)
    }
    deckLoaded() {
        if (this.props.deck_loaded) {
            return (
                <Container>
                    <View>
                        <DeckSwiper
                            looping
                            ref={(c) => this._deckSwiper = c}
                            // NativeBase allows its components to have a ref so other components
                            // can call its methods. This is used in the buttons below that control
                            // the swiping of this component.
                            dataSource={deck}
                            renderEmpty={() =>
                                <View style={{ alignSelf: "center" }}>
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
                            onPress={() => this._deckSwiper._root.swipeRight()}
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

export default connect(mapStateToProps, { UpdateLoading })(Deck);

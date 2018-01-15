import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { Container, Header, Card, CardItem, DeckSwiper, Left, Thumbnail, Body, Icon } from 'native-base';

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
    }
}

const cards = [
    {
        text: 'Card One',
        name: 'One',
        image: require('../../assets/images/defaultUser.png'),
    },
    {
        text: 'Card Two',
        name: 'Two',
        image: require('../../assets/images/defaultUser.png'),
    },
    {
        text: 'Card Three',
        name: 'Three',
        image: require('../../assets/images/defaultUser.png'),
    },

];

const mapStateToProps = ({ profileState }) => {
    const { name } = profileState;
    return { name }; // access with this.props.user
};

class Deck extends Component {
    componentWillMount() {
        firebase.database().ref(`/userkey/`)
        .once("value", function(snapshot) {
            // use once because we only need to load once everytime component
            // mounts rather than listen continuously, unlike when we get 
            // other user info we need to continuously listen out.
            snapshot.forEach(function(childSnapshot) {
                console.log(childSnapshot.key);
            })
        }, function(errorObject) {
            Alert.alert("The read failed", errorObject.code);
        })
    }
    render() {
        return (
            <Container>
                <View>
                    <DeckSwiper
                        ref={(c) => this._deckSwiper = c} 
                        // NativeBase allows its components to have a ref so other components
                        // can call its methods. This is used in the buttons below that control
                        // the swiping of this component.
                        dataSource={cards}
                        renderEmpty={() =>
                            <View style={{ alignSelf: "center" }}>
                                <Text>Over</Text>
                            </View>
                        }
                        renderItem={item =>
                            <Card style={{ elevation: 3, marginLeft: 20, marginRight: 20, marginTop: 20 }}>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={item.image} />
                                        <Body>
                                            <Text>{item.text}</Text>
                                            <Text note>NativeBase</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem cardBody>
                                    <Image style={{ height: 300, flex: 1 }} source={item.image} />
                                </CardItem>
                                <CardItem>
                                    <Icon name="heart" style={{ color: '#ED4A6A' }} />
                                    <Text>{item.name}</Text>
                                </CardItem>
                            </Card>
                        }
                    />
                </View>
                <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: 30, left: 0, right: 0, justifyContent: 'space-around', padding: 15 }}>
                    <TouchableOpacity
                        onPress={() => this._deckSwiper._root.swipeLeft()}
                        style={{ ...styles.buttonStyle, backgroundColor: '#D24D57' }}
                    >
                        <Icon name={"close"} style={styles.iconStyle} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this._deckSwiper._root.swipeRight()}
                        style={{ ...styles.buttonStyle, backgroundColor: '#03A678'}}
                    >
                        <Icon name={"checkmark"} style={styles.iconStyle} />
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}

export default connect(mapStateToProps)(Deck);

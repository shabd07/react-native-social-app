import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { View, Dimensions, Alert, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { Spinner } from 'nachos-ui';
import { Container, Content, List, ListItem, Left, Thumbnail, Body, Text } from 'native-base';
import RNFetchBlob from 'react-native-fetch-blob'
const timer = require('react-native-timer');
import { UpdateFriendInfo, ChatListLoaded } from '../actions/main';

const { width, height } = Dimensions.get('window');

const mapStateToProps = ({ authState, mainState }) => {
    const { user } = authState;
    const { chatList_loaded, friend_list } = mainState;
    return { user, friend_list, chatList_loaded };
};

const styles = {
    spinnerStyle: {
        height: height - 60,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listStyle: {
        backgroundColor: 'powderblue',
        marginTop: 5,
        marginBottom: 5
    },
    buttonStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
}

class ChatList extends Component {
    componentWillMount() {
        const own_uid = this.props.user.uid;
        // PROMISE REJECTED
        const readFail = (errorObject) => {
            Alert.alert("The read failed", errorObject.code);
        };

        const getFriendList = (snapshot) => {
            if (snapshot.val() === null) {
                Alert.alert("No Chats");
            }
            else {
                const friendList = [];
                snapshot.forEach(function (child_snapshot) {
                    // Grab only those that are matched
                    if (child_snapshot.val() !== '?') {
                        // Create each object
                        friendList.push({
                            uid: child_snapshot.key,
                            msg_uid: child_snapshot.val(),
                        })
                    }
                });

                const storeFriendList = () => {
                    this.props.UpdateFriendInfo(friendList);
                    this.props.ChatListLoaded();
                }

                const retrieveLastThumbnail = (each_friend) => {
                    const { uid } = each_friend;
                    const thumbRef = firebase.storage().ref(`/dp/${uid}`);
                    thumbRef.getDownloadURL().then(function (url) {
                        RNFetchBlob
                            .config({
                                fileCache: true,
                                appendExt: 'jpg'
                            })
                            .fetch('GET', url)
                            .then((res) => {
                                each_friend.uri = res.path();
                                timer.setTimeout('load_img', storeFriendList, 3000);
                            });
                    })
                }

                // Get Thumbnail
                const retrieveThumbnail = (each_friend) => {
                    const { uid } = each_friend;
                    const thumbRef = firebase.storage().ref(`/dp/${uid}`);
                    thumbRef.getDownloadURL().then(function (url) {
                        RNFetchBlob
                            .config({
                                fileCache: true,
                                appendExt: 'jpg'
                            })
                            .fetch('GET', url)
                            .then((res) => {
                                each_friend.uri = res.path();
                            });
                    })
                }

                // Get friend name
                friendList.forEach(function (each_friend) {
                    if (each_friend === friendList[friendList.keys.length - 1]) {
                        firebase.database().ref(`/userdata/${each_friend.uid}/name`)
                            .once("value", function (snapshot) {
                                each_friend.name = snapshot.val();
                                retrieveThumbnail(each_friend);
                            }, readFail)
                    }
                    else {
                        firebase.database().ref(`/userdata/${each_friend.uid}/name`)
                            .once("value", function (snapshot) {
                                each_friend.name = snapshot.val();
                                retrieveLastThumbnail(each_friend);
                            }, readFail)
                    }
                })

            }
        };

        // ROOT FUNCTION TO BE PLACED BELOW ALL
        firebase.database().ref(`/pairings/${own_uid}`)
            .once("value", getFriendList, readFail);

    }
    chatListLoaded() {
        if (this.props.chatList_loaded) {
            return (
                <Container style={styles.containerStyle}>
                    <Content>
                        <List
                            dataArray={this.props.friend_list}
                            renderRow={(item) =>
                                <ListItem
                                    style={styles.listStyle}
                                    avatar
                                >
                                    <TouchableOpacity style={styles.buttonStyle}>
                                        <Left>
                                            <Thumbnail
                                                small
                                                source={{ uri: item.uri }}
                                            />
                                        </Left>
                                        <Body>
                                            <Text>{item.name}</Text>
                                            <Text note>I am feeling good today!</Text>
                                        </Body>
                                    </TouchableOpacity>
                                </ListItem>
                            }>
                        </List>
                    </Content>
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
        return this.chatListLoaded();
    }
}

export default connect(mapStateToProps, { UpdateFriendInfo, ChatListLoaded })(ChatList);

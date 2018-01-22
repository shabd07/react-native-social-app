import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, StatusBar, Platform, Dimensions, StyleSheet, Text, Alert } from 'react-native';
import { Container, Header, Left, Button, Icon, Body, Right, Title } from 'native-base';
import { Spinner } from 'nachos-ui';

const timer = require('react-native-timer');

import { GiftedChat, Bubble, SystemMessage } from 'react-native-gifted-chat';
import { ResetUser, SetMessage, MessagesLoaded } from '../actions/main';

const { width, height } = Dimensions.get('window');

const mapStateToProps = ({ authState, mainState, profileState }) => {
    const { current_friend, messages, messagesLoaded } = mainState;
    const { user } = authState;
    const { name } = profileState;
    return { current_friend, messages, messagesLoaded, user, name };
};

const styles = {
    statusBarStyle: {
        height: Platform.OS === 'ios' ? 20 : 0,
        backgroundColor: '#e0ffff',
    },
    spinnerStyle: {
        backgroundColor: '#e0ffff',
        height: height,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    }
};

class ChatRoom extends Component {
    componentWillMount() {
        // PROMISE REJECTED
        const readFail = (errorObject) => {
            Alert.alert("The read failed", errorObject.code);
        };

        const setMsg = (message) => {
            const msg_obj = { ...message.val(), _id: message.key }
            const currentMessages = this.props.messages.slice();
            if (!currentMessages.map(m => m._id).includes(msg_obj._id)) {
                const newMessages = [ msg_obj, ...currentMessages ];
                this.props.SetMessage(newMessages);
            }
        }

        const messageRef = firebase.database().ref(`messages/${this.props.current_friend.msguid}/`);

        messageRef
            .orderByChild('createdAt')
            .on("value", function (snapshot) {
            snapshot.forEach(setMsg)
        }, readFail);

        timer.setTimeout('set_msg', this.props.MessagesLoaded, 1500);
    }

    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#f0f0f0',
                    }
                }}
            />
        );
    }

    renderSystemMessage(props) {
        return (
            <SystemMessage
                {...props}
                containerStyle={{
                    marginBottom: 15,
                }}
                textStyle={{
                    color: '#a9a9a9',
                    fontSize: 14,
                    // fontWeight: 'bold'
                }}
            />
        );
    }

    onSend(message) {
        message_obj = message[0]
        message_obj = { text: message_obj.text, user: message_obj.user, createdAt: firebase.database.ServerValue.TIMESTAMP }
        const msgRef = firebase.database().ref(`messages/${this.props.current_friend.msguid}/`).push();
        msgRef.key = message[0]._id;
        msgRef.set(message_obj);
    };

    loadChat() {
        if (this.props.messagesLoaded) {
            return (
                <Container style={{ backgroundColor: 'powderblue' }}>
                    <Header style={{ backgroundColor: '#e0ffff' }}>
                        <Left>
                            <Button
                                transparent
                                onPress={() => {
                                    firebase.database().ref(`messages/${this.props.current_friend.msguid}/`).off();
                                    this.props.ResetUser();
                                    Actions.pop();
                                }}
                            >
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>{this.props.current_friend.name}</Title>
                        </Body>
                        <Right>
                            <Button transparent>
                                <Text>Info</Text>
                            </Button>
                        </Right>
                    </Header>
                    <GiftedChat
                        onSend={(message)=>{this.onSend(message)}}
                        messages={this.props.messages}
                        user={{ _id: this.props.user.uid, name: this.props.name }}
                        renderBubble={this.renderBubble}
                        renderSystemMessage={this.renderSystemMessage}
                    />
                </Container>
            );
        }
        else {
            return (
                <View style={styles.spinnerStyle}>
                    <Spinner size={40} />
                </View>
            );
        }
    }

    render() {
        return this.loadChat();
    }
}

export default connect(mapStateToProps, { ResetUser, SetMessage, MessagesLoaded })(ChatRoom);

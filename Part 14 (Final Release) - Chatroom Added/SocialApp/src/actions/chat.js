import firebase from 'firebase';
import React from 'react';
import { Alert } from 'react-native';
const timer = require('react-native-timer');

import { ADD_MESSAGE, START_FETCHING_MESSAGES, RECEIVED_MESSAGES } from '../types';

export const StartFetching = () => ({
    type: START_FETCHING_MESSAGES
});

export const ReceivedMessages = () => ({
    type: RECEIVED_MESSAGES
})

export const AddMessage = (msg_obj) => ({
    type: ADD_MESSAGE,
    payload: msg_obj
})

export const SendMessage = (message) => (dispatch) => {
    dispatch({type: ADD_MESSAGE, payload: message[0]});
    let message_obj = message[0];
    message_obj = { text: message_obj.text, user: message_obj.user, createdAt: firebase.database.ServerValue.TIMESTAMP }
    const msgRef = firebase.database().ref(`messages/${this.props.current_friend.msguid}/`).push();
    msgRef.key = message[0]._id;
    msgRef.set(message_obj);

}
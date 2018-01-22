import firebase from 'firebase';
import React from 'react';
import { Alert } from 'react-native';
import { SET_USER, SET_DATA, RESET_PROFILE_STATE, RESET_LOGIN_STATE, MAIN_LOADED, DECK_LOADED, DECK_STOPPED, MAIN_STOPPED, ADD_TO_DECK, UPDATE_KEY, UPDATE_LIST, LIST_LOADED, LIST_LOADING, SET_FRIEND, RESET_FRIEND, SET_MESSAGE, MESSAGES_LOADED } from '../types';

export const SetUser = user => ({
    type: SET_USER,
    payload: user,
});

export const SetData = (user) => (dispatch) => {
    const mainLoaded = () => {
        dispatch({
            type: MAIN_LOADED
        })
    }
    const dataSnapShot = (snapshot) => {
        dispatch({
            type: SET_DATA,
            payload: snapshot.val()
        })
        mainLoaded();
    }
    firebase.database().ref(`/userdata/${user.uid}/`)
        .once("value", dataSnapShot, function (errorObject) {
            Alert.alert("The read failed", errorObject.code);
        })
}

export const ResetProfileState = () => ({
    type: RESET_PROFILE_STATE
});

export const UpdateLoading = () => ({
    type: DECK_LOADED
});

export const ResetMainState = () => ({
    type: MAIN_STOPPED
});

export const ResetDeckState = () => ({
    type: DECK_STOPPED
});

export const UpdateDeck = (obj) => ({
    type: ADD_TO_DECK,
    payload: obj
});

export const UpdateKey = (obj) => ({
    type: UPDATE_KEY,
    payload: obj
});

// ChatList actions
export const UpdateFriendInfo = (friendList) => ({
    type: UPDATE_LIST,
    payload: friendList,
});

export const ChatListLoaded = () => ({
    type: LIST_LOADED
});

export const ResetChatListState = () => ({
    type: LIST_LOADING
});

export const SetCurrentFriend = (user) => ({
    type: SET_FRIEND,
    payload: user
});

export const ResetUser = () => ({
    type: RESET_FRIEND
});

export const SetMessage = (msg) => ({
    type: SET_MESSAGE,
    payload: msg
});

export const MessagesLoaded = () => ({
    type: MESSAGES_LOADED
});

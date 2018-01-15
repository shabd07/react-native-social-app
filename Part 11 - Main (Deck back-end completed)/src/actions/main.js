import firebase from 'firebase';
import React from 'react';
import { Alert } from 'react-native';
import { SET_USER, SET_DATA, RESET_PROFILE_STATE, RESET_LOGIN_STATE, MAIN_LOADED, DECK_LOADED } from '../types';

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
        .once("value", dataSnapShot, function(errorObject) {
            Alert.alert("The read failed", errorObject.code);
        })
}

export const ResetProfileState = () => ({
    type: RESET_PROFILE_STATE
});

export const UpdateLoading = () => ({
    type: DECK_LOADED
})
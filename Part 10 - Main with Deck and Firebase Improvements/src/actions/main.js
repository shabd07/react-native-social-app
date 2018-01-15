import firebase from 'firebase';
import React from 'react';
import { Alert } from 'react-native';
import { SET_USER, SET_DATA, RESET_PROFILE_STATE, RESET_LOGIN_STATE } from '../types';

export const SetUser = user => ({
    type: SET_USER,
    payload: user,
});

export const SetData = (user) => (dispatch) => {
    firebase.database().ref(`/userdata/${user.uid}/`)
        .once("value", function(snapshot) {
            // use once because we only need to load once everytime component
            // mounts rather than listen continuously, unlike when we get 
            // other user info we need to continuously listen out.
            dispatch({
                type: SET_DATA,
                payload: snapshot.val()
            })
        }, function(errorObject) {
            Alert.alert("The read failed", errorObject.code);
        })
}

export const ResetProfileState = () => ({
    type: RESET_PROFILE_STATE
});

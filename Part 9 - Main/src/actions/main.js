import firebase from 'firebase';
import { SET_USER, SET_DATA } from '../types';

export const SetUser = user => ({
    type: SET_USER,
    payload: user,
});

export const SetData = (user) => (dispatch) => {
    firebase.database().ref(`/users/${user.uid}/profile`)
        .on("value", function(snapshot) {
            dispatch({
                type: SET_DATA,
                payload: snapshot.val()
            })
        }, function(errorObject) {
            Alert.alert("The read failed", errorObject.code);
        })
}
import firebase from 'firebase';
import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGGING_IN, LOGIN_SWITCH, LOGIN_SUCCESS, LOGIN_FAIL } from '../types';

export const OnEmailChange = text => ({
    type: EMAIL_CHANGED,
    payload: text,
});

export const OnPasswordChange = text => ({
    type: PASSWORD_CHANGED,
    payload: text,
});

export const OnSwitch = value => ({
    type: LOGIN_SWITCH,
    payload: value,
});

// In this new scenario where we need to perform asynchronous actions like logging
// in or signing up, it takes time for the user data to be retrieved / retrieved
// after creation for later use inside the app. Furthermore, such an action returns
// a Promise that may lead to either login pass or login fail and likewise for
// signing up. As such, we will dispatch actions that vary depending on the outcome.
// Consequently, we can no longer use connect() to pre-bind dispatch into the usual
// action creators. This is where redux-thunk comes into play, as it allows Redux
// to now recognise special functions aside from the usual action creators. And
// instead of binding it, it passes dispatch as an argument into the asynchronous
// functions so that we can dispatch for various outcomes.

// export const OnLoginPressed = () => ({
//     type: LOGGING_IN,
// });


// Define new action creators which are used in OnLoginPressed and don't need
// to be exported.
const LoginSuccess = (user, dispatch) => {
    dispatch({
        type: LOGIN_SUCCESS,
        payload: user,
    });
};

const LoginFail = (msg, dispatch) => {
    dispatch({
        type: LOGIN_FAIL,
        payload: msg,
    });
};

// Now we need the follow arguments email, password and switchStatus to determine
// how to proceed with back-end authentication. Notice how dispatch is also passed
// as an argument.
export const OnLoginPressed = (email, password, switchStatus) => (dispatch) => {
    dispatch({ type: LOGGING_IN });
    if (switchStatus === 'log-in') {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                LoginSuccess(user, dispatch);
                // Rather than dispatching here, since it will be re-used in the
                // sign-up status portion, we write an external function instead
            })
            .catch((error) => {
                LoginFail(error.message, dispatch);
            });
    } else if (switchStatus === 'sign-up') {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                LoginSuccess(user, dispatch);
            })
            .catch((error) => {
                LoginFail(error.message, dispatch);
            });
    }
};


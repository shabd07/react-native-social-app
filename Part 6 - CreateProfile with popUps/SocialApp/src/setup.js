import React, { Component } from 'react';
import { themeManager } from 'nachos-ui';
import { StyleProvider } from 'native-base';
// Note that the two themes will not interfere with one another,
// instead they will only affect their individual components.
// As such you can stack them together.
import { Provider } from 'react-redux';
// Added appleMiddleware and ReduxThunk
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
// Added firebase
import firebase from 'firebase';
import reducers from './reducers';
// Replaced nachos-ui with native-base
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

// import LoginForm from './components/LoginForm';
import CreateProfile from './components/CreateProfile';

const config = {
    apiKey: 'AIzaSyAV0JoCsPZCJryqhRTdvXNgZkKl-EqnOrM',
    authDomain: 'auth-9b55c.firebaseapp.com',
    databaseURL: 'https://auth-9b55c.firebaseio.com',
    projectId: 'auth-9b55c',
    storageBucket: 'auth-9b55c.appspot.com',
    messagingSenderId: '372239909535',
};
firebase.initializeApp(config);

class setup extends Component {
    render() {
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                <StyleProvider style={getTheme(platform)}>
                    <CreateProfile />
                </StyleProvider>
            </Provider>
        );
    }
}

// nachos-ui theming
const inputTheme = themeManager.getStyle('Input');

const newInputTheme = {
    ...inputTheme,
    INPUT_NORMAL_COLOR: '#659bf2',
};

themeManager.setSource('Input', () => (newInputTheme));


export default setup;

import React, { Component } from 'react';
import { themeManager } from 'nachos-ui';
import { Provider } from 'react-redux';
// Added appleMiddleware and ReduxThunk
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
// Added firebase
import firebase from 'firebase';
import reducers from './reducers';

import LoginForm from './components/LoginForm';

const config = {
    // FILL IN YOUR OWN CONFIG!
};
firebase.initializeApp(config);

class setup extends Component {
    render() {
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                <LoginForm />
            </Provider>
        );
    }
}

const inputTheme = themeManager.getStyle('Input');

const newInputTheme = {
    ...inputTheme,
    INPUT_NORMAL_COLOR: '#659bf2',
};

themeManager.setSource('Input', () => (newInputTheme));


export default setup;

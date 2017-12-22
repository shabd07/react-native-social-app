import React, { Component } from 'react';
import { themeManager } from 'nachos-ui';

// Added these 3 imports for use in relation to react-redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

import LoginForm from './components/LoginForm';

class setup extends Component {
    render() {
        return (
            <Provider store={createStore(reducers)}>
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

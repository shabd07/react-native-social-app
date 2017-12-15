import React, { Component } from 'react';
import LoginForm from './components/LoginForm.js';
import { themeManager } from 'nachos-ui';

class setup extends Component {
    render() {
        return (
            <LoginForm />
        );
    }
}

/* THEME MANAGER */
const inputTheme = themeManager.getStyle('Input'); 
// Retrieve the style of the 'Input' component

const newInputTheme = {
    // Define new theme by using info from the original (inputTheme),
    // then replacing the styles you want. To search for the available
    // styles, go to node_modules/nachos-ui/src/<Component>.js and it
    // will be listed under the const defaultTheme.
    ...inputTheme,
    INPUT_NORMAL_COLOR: '#659bf2'
}

themeManager.setSource('Input', () => (newInputTheme));
// Set the new source of the Component style to the one you defined



export default setup;
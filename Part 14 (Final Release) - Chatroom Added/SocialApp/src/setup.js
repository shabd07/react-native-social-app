import React, { Component } from 'react';
import { themeManager } from 'nachos-ui';
import { StyleProvider } from 'native-base';
// Note that the two themes will not interfere with one another,
// instead they will only affect their individual components.
// As such you can stack them together.
import { Provider } from 'react-redux';
// Added appleMiddleware and ReduxThunk
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import ReduxThunk from 'redux-thunk';
// Added router-flux
import { Scene, Router, Stack, Actions } from 'react-native-router-flux';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
// Added firebase
import firebase from 'firebase';
import reducers from './reducers';
// Replaced nachos-ui with native-base
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

import SplashScreen from './components/SplashScreen';
import LoginForm from './components/LoginForm';
import CreateProfile from './components/CreateProfile';
import Main from './components/Main';
import ChatRoom from './components/ChatRoom';

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
    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            // if loggedIn, then user will be something, else
            // it will be null or equivalent to false.
            if (Actions.currentScene !== 'profile') {
                if (user) {
                    Actions.main();
                } else {
                    Actions.login();
                }
            }
        });
    }

    render() {
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                <StyleProvider style={getTheme(platform)}>
                    <Router>
                        <Stack
                            key="root"
                            // We need to set our transitions nicely so they do not
                            // appear funny when used with the Animatables
                            transitionConfig={() => ({
                                screenInterpolator: (props) => {
                                    const { scene } = props;
                                    switch (scene.route.routeName) {
                                        // .forFade can be swapped to other transition styles
                                        case 'login':
                                            return CardStackStyleInterpolator.forFade(props);
                                        case 'profile':
                                            return CardStackStyleInterpolator.forFade(props);
                                        case 'main':
                                            return CardStackStyleInterpolator.forFade(props);
                                        case 'splashscreen':
                                            return CardStackStyleInterpolator.forFade(props);
                                        case 'chatRoom':
                                            return CardStackStyleInterpolator.forFade(props);
                                        default:
                                            return CardStackStyleInterpolator.forInitial;
                                    }
                                },
                            })}
                        >
                            {
                                // This is where you throw all your scenes.
                                // You can place all scenes within a stack linked to a key
                                // Or when the app gets big, you can segregate the scenes
                                // within different stacks of different keys.
                                // For simplicity right now, we will do the first since the
                                // latter is not necessary yet.
                            }
                            <Scene
                                key="splashscreen" // key is required as a ref to switch to this scene in the future
                                component={SplashScreen} // where you place your component
                                hideNavBar // hides the titlebar which we do not require
                                initial // sets this as the main scene to display when we swap to this stack
                            />
                            <Scene key="login" component={LoginForm} hideNavBar panHandlers={null}/>
                            <Scene key="profile" component={CreateProfile} hideNavBar panHandlers={null}/>
                            <Scene key="main" component={Main} hideNavBar panHandlers={null}/>
                            <Scene key="chatRoom" component={ChatRoom} hideNavBar />
                        </Stack>
                    </Router>
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

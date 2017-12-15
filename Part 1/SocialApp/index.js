import { AppRegistry } from 'react-native';
import setup from './src/setup.js';

/*
index.js, by default registers a single, main component from App.js in the
same folder. Instead of linking these two up, we reorganise the .js files 
into ./src
*/

AppRegistry.registerComponent('SocialApp', () => setup);

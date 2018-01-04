/*
Refer to index.js for more info on the purposes of index.js

Unlike the function expressions in ../actions/ that can be exported as per norm,
reducers require the 'combineReducers' module from 'redux' to be unified from
individual reducer anonymous functions.

The result is similar to that for actions, where you can reference reducers from
the index.js file.
*/

import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';

export default combineReducers({
    authState: auth, profileState: profile,
});

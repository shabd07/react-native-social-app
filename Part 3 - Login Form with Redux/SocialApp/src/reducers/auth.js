import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGGING_IN } from '../types';

// Define the initial state of the LoginForm, like keeping the values of inputs
// blank, the login status to be logged out etc.
const INITIAL_AUTH_STATE = {
    email: '',
    password: '',
    loggingIn: false,
};

export default (state = INITIAL_AUTH_STATE, action) => {
    switch (action.type) {
        case (EMAIL_CHANGED):
            return { ...state, email: action.payload };
        case (PASSWORD_CHANGED):
            return { ...state, password: action.payload };
        case (LOGGING_IN):
            return { ...state, loggingIn: true };
        default:
            return state;
    }
};

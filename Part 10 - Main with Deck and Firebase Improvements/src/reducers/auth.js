import { SET_USER, EMAIL_CHANGED, PASSWORD_CHANGED, LOGGING_IN, LOGIN_SWITCH, LOGIN_FAIL, LOGIN_SUCCESS } from '../types';

const INITIAL_AUTH_STATE = {
    email: '',
    password: '',
    loggingIn: false,
    switchStatus: 'log-in',
    user: null,
    errorMessage: '',
    inputEmpty: true,
};

export default (state = INITIAL_AUTH_STATE, action) => {
    switch (action.type) {
        case (EMAIL_CHANGED):
            if (action.payload === '' || state.password === '') {
                return { ...state, email: action.payload, inputEmpty: true };
            }
            return { ...state, email: action.payload, inputEmpty: false };
        case (PASSWORD_CHANGED):
            if (state.email === '' || action.payload === '') {
                return { ...state, password: action.payload, inputEmpty: true };
            }
            return { ...state, password: action.payload, inputEmpty: false };
        case (LOGGING_IN):
            return { ...state, loggingIn: true, errorMessage: '', email: '', password: '', inputEmpty: true, switchStatus: 'log-in' };
        case (LOGIN_SWITCH):
            return { ...state, switchStatus: action.payload };
        case (LOGIN_FAIL):
            return { ...state, errorMessage: action.payload, loggingIn: false };
        case (LOGIN_SUCCESS):
            return { ...state, user: action.payload, loggingIn: false };
        case (SET_USER):
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

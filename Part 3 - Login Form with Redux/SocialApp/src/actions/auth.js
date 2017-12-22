import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGGING_IN } from '../types';

// Added the following action creators to have control of and access to the state
// the inputs in LoginForm.js

export const OnEmailChange = text => ({
    type: EMAIL_CHANGED,
    payload: text,
});

export const OnPasswordChange = text => ({
    type: PASSWORD_CHANGED,
    payload: text,
});

export const OnLoginPressed = () => ({
    type: LOGGING_IN,
    // No payload needed since all we need to do is to switch the bool
});

/*
Every action has a type, or you may see it as an id. To ensure that we dispatch the
right actions and have our reducer receive the dispatched actions without any typo
errors, we create this types.js file to link a constant parameter to the string of
all the types. Then we import it into both the action and reducer files to use.
Any typos will in parameter names can be detected unlike strings and thus we can
avoid typo errors that may cause actions to not have a follow-up.
*/

export const EMAIL_CHANGED = 'email_changed';
export const PASSWORD_CHANGED = 'password_changed';
export const LOGGING_IN = 'logging_in';

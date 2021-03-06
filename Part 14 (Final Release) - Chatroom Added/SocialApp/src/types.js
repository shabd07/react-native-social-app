/*
Every action has a type, or you may see it as an id. To ensure that we dispatch the
right actions and have our reducer receive the dispatched actions without any typo
errors, we create this types.js file to link a constant parameter to the string of
all the types. Then we import it into both the action and reducer files to use.
Any typos will in parameter names can be detected unlike strings and thus we can
avoid typo errors that may cause actions to not have a follow-up.
*/

// auth.js
export const EMAIL_CHANGED = 'email_changed';
export const PASSWORD_CHANGED = 'password_changed';
export const LOGGING_IN = 'logging_in';
export const LOGIN_SWITCH = 'login_switch';
export const LOGIN_SUCCESS = 'login_success';
export const LOGIN_FAIL = 'login_fail';

// profile.js
export const POP_UP_CHANGED = 'pop_up_changed';
export const NAME_CHANGED = 'name_changed';
export const GENDER_CHANGED = 'gender_changed';
export const INFO_CHANGED = 'info_changed';
export const AGE_CHANGED = 'age_changed';
export const MYAGE_CHANGED = 'myage_changed';
export const IMAGE_PATH = 'image_path';
export const IMAGE_ERROR = 'image_error';

// main.js
export const SET_USER = 'set_user';
export const SET_DATA = 'set_data';
export const RESET_PROFILE_STATE = 'reset_profile_state';
export const MAIN_LOADED = 'main_loaded';
export const DECK_LOADED = 'deck_loaded';
export const DECK_STOPPED = 'deck_stopped';
export const MAIN_STOPPED = 'main_stopped';
export const UPDATE_KEY = 'update_key';
export const ADD_TO_DECK = 'add_to_deck';
// export const DELETE_CARD = 'delete_card';
export const UPDATE_LIST = 'update_list';
export const LIST_LOADED = 'list_loaded';
export const LIST_LOADING = 'list_loading';
export const SET_FRIEND = 'set_friend';
export const RESET_FRIEND = 'reset_friend';
export const SET_MESSAGE = 'set_message';
export const MESSAGES_LOADED = 'messages_loaded';

export const START_FETCHING_MESSAGES = 'start_fetching_messages';
export const RECEIVED_MESSAGES = 'received_messages';
export const ADD_MESSAGE = 'add_messages';
export const SEND_MESSAGE = 'send_messages';


import { MAIN_LOADED, DECK_LOADED, DECK_STOPPED, MAIN_STOPPED } from '../types';

const INITIAL_MAIN_STATE = {
    main_loaded: false,
    deck_loaded: false,
};

export default (state=INITIAL_MAIN_STATE, action) => {
    switch (action.type) {
        case (MAIN_LOADED):
            return { ...state, main_loaded: true };
        case (DECK_LOADED):
            return { ...state, deck_loaded: true };
        case (DECK_STOPPED):
            return { ...state, deck_loaded: false };
        case (MAIN_STOPPED):
            return { ...state, main_loaded: false };
        default:
            return state;
    }
}
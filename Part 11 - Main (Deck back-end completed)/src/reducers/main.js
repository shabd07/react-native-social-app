import { MAIN_LOADED, DECK_LOADED } from '../types';

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
        default:
            return state;
    }
}
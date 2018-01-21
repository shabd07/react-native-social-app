import { MAIN_LOADED, DECK_LOADED, DECK_STOPPED, MAIN_STOPPED, UPDATE_KEY, ADD_TO_DECK, UPDATE_LIST, LIST_LOADED, LIST_LOADING} from '../types';

const INITIAL_MAIN_STATE = {
    main_loaded: false,
    main2_loaded: false,
    deck_loaded: false,
    deck: [],
    userkey: [],
    friend_list: [],
    chatList_loaded: false
};

export default (state=INITIAL_MAIN_STATE, action) => {
    switch (action.type) {
        case (MAIN_LOADED):
            return { ...state, main_loaded: true, main2_loaded: true };
        case (DECK_LOADED):
            return { ...state, deck_loaded: true };
        case (DECK_STOPPED):
            return { ...state, deck_loaded: false, deck: [], userkey: [] };
        case (MAIN_STOPPED):
            return { ...state, main_loaded: false, main2_loaded: false };
        case (ADD_TO_DECK):
            const newDeck = state.deck.slice();
            newDeck.push(action.payload);
            return { ...state, deck: newDeck };
        case (UPDATE_KEY):
            const newKey = state.userkey.slice();
            newKey.push(action.payload);
            return { ...state, userkey: newKey };
        case (UPDATE_LIST): // Referring to Chatlist
            return { ...state, friend_list: action.payload };
        case (LIST_LOADED):
            return { ...state, chatList_loaded: true };
        case (LIST_LOADING):
            return { ...state, chatList_loaded: false };
        default:
            return state;
    }
}
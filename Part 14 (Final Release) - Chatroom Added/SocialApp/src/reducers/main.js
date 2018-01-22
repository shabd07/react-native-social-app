import { MAIN_LOADED, DECK_LOADED, DECK_STOPPED, MAIN_STOPPED, UPDATE_KEY, ADD_TO_DECK, UPDATE_LIST, LIST_LOADED, LIST_LOADING, SET_FRIEND, RESET_FRIEND, SET_MESSAGE, MESSAGES_LOADED, START_FETCHING_MESSAGES, RECEIVED_MESSAGES } from '../types';

const INITIAL_MAIN_STATE = {
    main_loaded: false,
    main2_loaded: false,
    deck_loaded: false,
    deck: [],
    userkey: [],
    friend_list: [],
    chatList_loaded: false,
    current_friend: {},
    messagesLoaded: false,
    messages: []
};

export default (state = INITIAL_MAIN_STATE, action) => {
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
        case (SET_FRIEND):
            return { ...state, current_friend: action.payload };
        case (RESET_FRIEND):
            return { ...state, current_friend: { }, messages: [], messagesLoaded: false };
        case (SET_MESSAGE):
            return { ...state, messages: action.payload }
        case (MESSAGES_LOADED):
            return { ...state, messagesLoaded: true };
        // case (START_FETCHING_MESSAGES):
        //     return {...state, isFetchingMsg: true };
        // case (RECEIVED_MESSAGES):
        //     return {...state, isFetchingMsg: false };
        default:
            return state;
    }
}
import { POP_UP_CHANGED } from '../types';

const INITIAL_PROFILE_STATE = {
    btnNo: 0,
};

export default (state = INITIAL_PROFILE_STATE, action) => {
    switch (action.type) {
        case (POP_UP_CHANGED):
            return { ...state, btnNo: action.payload };
        default:
            return state;
    }
};

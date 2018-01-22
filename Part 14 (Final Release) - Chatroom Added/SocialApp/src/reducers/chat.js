import { ADD_MESSAGE } from '../types';

export default (state = [], action) => {
    switch (action.type) {
        case (ADD_MESSAGE):
            if (state.map(m => m._id).includes(action.payload._id)) {
                return state;
            } else {
                return [ action.payload, ...state ];
            }
        default:
            return state;
    }
}
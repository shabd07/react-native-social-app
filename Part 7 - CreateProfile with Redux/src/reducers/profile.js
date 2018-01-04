import { POP_UP_CHANGED, NAME_CHANGED, GENDER_CHANGED, INFO_CHANGED, AGE_CHANGED, IMAGE_PATH, IMAGE_ERROR } from '../types';

const INITIAL_PROFILE_STATE = {
    btnNo: 0,
    name: '',
    info: '',
    gender: null,
    age: [15, 50],
    imageSource: require('../../assets/images/defaultUser.png'),
    // imageSource takes in uri, which can come from a web URL or a local file path
    imageError: 'Click Picture to Select',
};

export default (state = INITIAL_PROFILE_STATE, action) => {
    switch (action.type) {
        case (POP_UP_CHANGED):
            return { ...state, btnNo: action.payload };
        case (NAME_CHANGED):
            return { ...state, name: action.payload };
        case (GENDER_CHANGED):
            return { ...state, gender: action.payload };
        case (INFO_CHANGED):
            return { ...state, info: action.payload };
        case (AGE_CHANGED):
            return { ...state, age: action.payload };
        case (IMAGE_PATH):
            return { ...state, imageSource: action.payload, imageError: 'Nice Picture!' };
        case (IMAGE_ERROR):
            return { ...state, imageError: action.payload };
        default:
            return state;
    }
};

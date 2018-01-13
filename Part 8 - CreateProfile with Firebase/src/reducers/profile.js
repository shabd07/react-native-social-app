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
    nameValid: '#ff964c',
    infoValid: '#ff964c',
    genderValid: '#ff964c',
    ageValid: '#ff964c',
    imageValid: '#ff964c',
    allValid: '#D24D57',
};

export default (state = INITIAL_PROFILE_STATE, action) => {
    const { ageValid, infoValid, genderValid, imageValid, nameValid } = state;
    switch (action.type) {
        case (POP_UP_CHANGED):
            return { ...state, btnNo: action.payload };
        case (NAME_CHANGED):
            // Basic Logic behind:
            // When name gets updated, if submitted name is empty, then considered
            // incomplete and name remains in incomplete colour code status.
            // If name is indeed valid, then we do another check for others.
            // If all are valid, then update the allValid colour code.
            if (action.payload !== '') {
                if (ageValid === '#03A678' && genderValid === '#03A678' && imageValid === '#03A678' && infoValid === '#03A678') {
                    return { ...state, name: action.payload, nameValid: '#03A678', allValid: '#4169E1' };
                }
                return { ...state, name: action.payload, nameValid: '#03A678' };
            }
            return { ...state, name: action.payload, nameValid: '#ff964c', allValid: '#D24D57' };
        case (GENDER_CHANGED):
            if (ageValid === '#03A678' && infoValid === '#03A678' && imageValid === '#03A678' && nameValid === '#03A678') {
                return { ...state, gender: action.payload, genderValid: '#03A678', allValid: '#4169E1' };
            }
            return { ...state, gender: action.payload, genderValid: '#03A678' };
        case (INFO_CHANGED):
            if (action.payload !== '') {
                if (ageValid === '#03A678' && genderValid === '#03A678' && imageValid === '#03A678' && nameValid === '#03A678') {
                    return { ...state, info: action.payload, infoValid: '#03A678', allValid: '#4169E1' };
                }
                return { ...state, info: action.payload, infoValid: '#03A678' };
            }
            return { ...state, info: action.payload, infoValid: '#ff964c', allValid: '#D24D57' };
        case (AGE_CHANGED):
            // Same logic, but we don't need to check if age is valid because
            // the only values are male/female which will always be valid.
            if (infoValid === '#03A678' && genderValid === '#03A678' && imageValid === '#03A678' && nameValid === '#03A678') {
                return { ...state, age: action.payload, ageValid: '#03A678', allValid: '#4169E1' };
            }
            return { ...state, age: action.payload, ageValid: '#03A678' };
        case (IMAGE_PATH):
            // Same here, the function prior to this already ensures that image
            // is valid.
            if (ageValid === '#03A678' && genderValid === '#03A678' && infoValid === '#03A678' && nameValid === '#03A678') {
                return { ...state, imageSource: action.payload, imageValid: '#03A678', allValid: '#4169E1' };
            }
            return { ...state, imageSource: action.payload, imageError: 'Nice Picture!', imageValid: '#03A678' };
        case (IMAGE_ERROR):
            return { ...state, imageError: action.payload, imageSource: require('../../assets/images/defaultUser.png'), imageValid: '#ff964c', allValid: '#D24D57' };
        default:
            return state;
    }
};


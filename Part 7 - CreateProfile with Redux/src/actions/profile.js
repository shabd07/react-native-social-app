import ImagePicker from 'react-native-image-picker';
import { POP_UP_CHANGED, NAME_CHANGED, GENDER_CHANGED, INFO_CHANGED, AGE_CHANGED, IMAGE_PATH, IMAGE_ERROR } from '../types';

export const WhichPopUp = btnNo => ({
    type: POP_UP_CHANGED,
    payload: btnNo,
});

//
// popUp button state control
//

export const OnNameChange = name => ({
    type: NAME_CHANGED,
    payload: name,
});

export const OnGenderChange = gender => ({
    type: GENDER_CHANGED,
    payload: gender,
});

export const OnInfoChange = info => ({
    type: INFO_CHANGED,
    payload: info,
});

export const OnAgeChange = age => ({
    type: AGE_CHANGED,
    payload: age,
});

// IMAGE PICKER CODE

const options = {
    allowsEditing: true,
    mediaType: 'photo',
};

export const OnImagePressed = () => (dispatch) => {
    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
        if (response.didCancel) {
            dispatch({
                type: IMAGE_ERROR,
                payload: 'User cancelled image picker',
            });
        } else if (response.error) {
            dispatch({
                type: IMAGE_ERROR,
                payload: 'ImagePicker Error',
            });
        } else if (response.height < 750) {
            dispatch({
                type: IMAGE_ERROR,
                payload: 'Height too small',
            });
        } else if (response.width < 750) {
            dispatch({
                type: IMAGE_ERROR,
                payload: 'Width too small',
            });
        } else {
            // Take care to use an object uri instead of just source = response.uri
            const source = { uri: response.uri };

            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };

            dispatch({
                type: IMAGE_PATH,
                payload: source,
            });
        }
    });
};

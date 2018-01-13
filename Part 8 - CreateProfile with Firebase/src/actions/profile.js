import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase';
import { Platform, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import RNFetchBlob from 'react-native-fetch-blob';
import { POP_UP_CHANGED, NAME_CHANGED, GENDER_CHANGED, INFO_CHANGED, AGE_CHANGED, IMAGE_PATH, IMAGE_ERROR } from '../types';

// react-native-fetch-blob boilerplate
const { Blob } = RNFetchBlob.polyfill;
const { fs } = RNFetchBlob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

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
        // console.log('Response = ', response);
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
            console.log(response);
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

// UPLOAD IMAGE FUNCTION

const UploadImage = (user, imageSource) => {
    const { uri } = imageSource;
    console.log(imageSource);
    return new Promise((resolve, reject) => {
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        let uploadBlob = null;
        const imageRef = firebase.storage().ref('users').child(`/${user.uid}/profile`);
        fs.readFile(uploadUri, 'base64')
            .then(data => Blob.build(data, { type: 'image/jpeg;BASE64' }))
            .then((blob) => {
                uploadBlob = blob;
                return imageRef.put(blob, { contentType: 'image/jpeg' });
            })
            .then(() => {
                uploadBlob.close();
                return imageRef.getDownloadURL();
            })
            .then((url) => {
                resolve(url);
                Alert.alert('Submit Status', 'Successfully updated profile picture');
                // Route to userland
                Actions.main();
            })
            .catch((error) => {
                reject(error);
                Alert.alert('Submit Status', 'Failed to updated profile picture');
            });
    });
};

// SUBMIT BUTTON FUNCTION

export const OnSubmitPressed = (user, name, gender, info, age, imageSource, allValid) => {
    if (allValid === '#4169E1') {
        // dispatch({ type: SUBMIT_PROFILE });
        firebase.database().ref(`/users/${user.uid}/profile`)
            .set({ name, gender, info, age })
            .then(() => {
                // Add notification
                Alert.alert('Submit Status', 'Successfully updated profile');
                // Move on to image
                UploadImage(user, imageSource);
            })
            .catch((error) => {
                console.log(error);
                Alert.alert('Submit Status', 'Failed to updated profile');
            });
        // dispatch({
        //     type: PROFILE_EDIT_COMPLETED
        // });
    } else {
        Alert.alert('Submit Status', 'Not all required is filled');
    }
};


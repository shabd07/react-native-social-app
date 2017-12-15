import React, { Component } from 'react';
// Import all the default components from react-native's library
import { View, Image, TextInput, Text, StyleSheet } from 'react-native';
class LoginForm extends Component {
    render() {
        return (
            <View style={styles.viewStyle}>
                <Image
                    // Image component require size to be set, else default 
                    // will h:0 w:0 i.e. you don't see your image appear
                    style = {styles.imageStyle}
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Facebook_icon_2013.svg/200px-Facebook_icon_2013.svg.png' }}
                />
                <Text>Username</Text>
                <TextInput
                    /* 
                       TextInput has a couple of other props which you
                       can set, but for now these are the relevant ones we
                       would like to use. In the future, we would need to
                       link the values typed to a variable for usage in other
                       parts of the App, which we will then require a new
                       prop to be used. 
                    */
                    autoCorrect={false}
                    autoCapitalize='none'
                />
                <Text>Password</Text>
                <TextInput
                    autoCorrect={false}
                    autoCapitalize='none'
                    secureTextEntry
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    /* 
        To find out more about the styles you can use, go to the react-native
        documentation, find the component you want to style. The page should
        contain not just the various styles you could use, but also the various
        props you can have access to as well as the options you have for each
        prop/style.
    */
    imageStyle: {
        height: 250,
        width: 250
    },    
    viewStyle: {
        height: 250,
        width: 250,
        alignSelf: 'center',
        marginTop: 70,
        marginBottom: 50
    }
});

export default LoginForm;
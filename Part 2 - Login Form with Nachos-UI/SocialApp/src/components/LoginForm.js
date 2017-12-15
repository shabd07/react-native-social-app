import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
// Switching some components from react-native library to nachos-ui library.
import { Input, Button } from 'nachos-ui';

class LoginForm extends Component {
    // React Native utilises props and states to pass information from
    // one component to another. While we will be using react-redux later
    // on, for us to type something in the input, we will thus define and
    // use states temporarily.
    state = { username: null, password: null }
    render() {
        return (
            <View 
                style={styles.containerStyle}
                // containerStyle is basically a view with a size equal
                // to the device screen. This is useful for background
                // designing.
            >
                <View style={{flex: 1}}/>
                <View style={styles.viewStyle}>
                    <Image
                        style = {styles.imageStyle}
                        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Facebook_icon_2013.svg/200px-Facebook_icon_2013.svg.png' }}
                    />
                    <Input
                        style={inputStyle}
                        autoCorrect={false}
                        placeholder='Username'
                        autoCapitalize='none'
                        value={this.state.username} 
                        // Basically any value keyed into this input will be passed
                        // into the username state. Without this, value = null and
                        // regardless of what is typed, value will not change, so 
                        // anything keyed in is voided. You can test it out by
                        // removing this prop.
                    />
                    <Input
                        style={inputStyle}
                        autoCorrect={false}
                        placeholder='Password'
                        autoCapitalize='none'
                        secureTextEntry
                        value={this.state.password}
                    />
                    <Button kind='squared' type='danger' style={buttonStyle}>
                        Click to Log In
                    </Button>
                </View>
                <View style={{flex: 1}}/>
            </View>
        );
    }
}

// Styling values
const styles = StyleSheet.create({
    imageStyle: {
        height: 250,
        width: 250, 
        marginBottom: 15
    },    
    viewStyle: {
        flex: 5, 
        // This basically sets the ratio 1:5:1 for the screen, allowing
        // uniform margins throughout devices of varying sizes
        alignSelf: 'center',
        alignItems: 'center',
    },
    containerStyle: {
        flex: 1, // So as to fit whichever device it is on
        backgroundColor: 'powderblue'
    }
});

// Take note that nachos-ui styling does not use a StyleSheet unlike
// react-native default components
const inputStyle = { margin: 5 }
const buttonStyle = { margin: 15, width: 250 }

export default LoginForm;
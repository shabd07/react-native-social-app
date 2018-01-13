import React, { Component } from 'react';
import firebase from 'firebase';
import { View, StyleSheet } from 'react-native';
import { Button } from 'nachos-ui';

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'powderblue',
        flexDirection: 'row',
        alignItems: 'center', // horizontal
        justifyContent: 'center', // vertical
        flex: 1,
    },
});

export default class SplashScreen extends Component {
    render() {
        return (
            <View style={styles.containerStyle}>
                <Button onPress={() => firebase.auth().signOut()}>
                    MAIN
                </Button>
            </View>
        );
    }
}

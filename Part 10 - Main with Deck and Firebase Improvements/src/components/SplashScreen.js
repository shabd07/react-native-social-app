import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'powderblue',
        alignItems: 'center', // horizontal
        justifyContent: 'center', // vertical
        flex: 1,
    },
    textStyle: {
        color: 'white',
        fontSize: 50,
        fontFamily: 'ChalkboardSE-Bold',
    },
});

export default class SplashScreen extends Component {
    render() {
        return (
            <View style={styles.containerStyle}>
                <Text style={styles.textStyle}>
                    Welcome
                </Text>
            </View>
        );
    }
}

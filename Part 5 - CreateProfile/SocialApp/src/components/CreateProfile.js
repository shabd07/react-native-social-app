import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { View, Dimensions } from 'react-native';
import { Bubble } from 'nachos-ui';
import { Button, Text } from 'native-base';
import * as Animatable from 'react-native-animatable';

const { height, width } = Dimensions.get('screen');

const styles = {
    wrapperStyle: {
        // justifyContent: 'center',
        flex: 1,
        backgroundColor: 'powderblue',
    },
    mainBtnStyle: {
        zIndex: 1,
        justifyContent: 'center',
        flex: 1,
    },
    buttonStyle: {
        margin: 20,
        backgroundColor: '#ff964c',
    },
    bubbleStyle: {
        margin: 20,
    },
    textStyle: {
        fontFamily: 'Kelson Sans',
    },
    popUpStyle: {
        opacity: 0.0,
        zIndex: 0,
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        top: height / 2 - 150,
        left: width / 2 - 150,
        width: 300,
        height: 300,
        backgroundColor: '#1dc6c6',
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 3 },
        shadowColor: '#216272',
        shadowOpacity: 1.0,
    },
};

const popUp = (ref, btnNo) => {
    // Event listener for button onPress events.

    // Animation section
    ref.bubble.bounceOutLeft();
    ref.name.bounceOutRight();
    ref.age.bounceOutRight();
    ref.gender.bounceOutRight();
    ref.dp.bounceOutRight();
    ref.info.bounceOutRight();

    // Pop-up appears
    ref.popUp.zoomIn();
    // As mentioned in changelog, we can leave this transitionTo()
    // method hanging.
    ref.popUp.transitionTo({ opacity: 1.0 });

    // Switch to toggle individual popUp Components
    switch (btnNo) {
        case (0):
            break;
        case (1):
            break;
        case (2):
            break;
        case (3):
            break;
        case (4):
            break;
        default:
    }
};

class CreateProfile extends Component {
    render() {
        return (
            // Wrapper for entire CreateProfile container
            <View style={styles.wrapperStyle}>
                {
                    // This view for the main buttons
                }
                <View style={styles.mainBtnStyle}>
                    <Animatable.View
                        ref="bubble"
                        animation="bounceInLeft"
                    /*
                        1. View is one of the prebuilt animated component in the module, so
                        you can replace View with Animatable.View.
                        2. The ref tag is where you will give an id to the animated view.
                        This is very important when you need to refer to this view to perform
                        event driven animations.
                        3. The animation tag is where you will place the initial animation.
                    */
                    >
                        <Bubble style={styles.bubbleStyle} color="royalblue" arrowPosition="bottom" >
                            FILL UP YOUR PROFILE TO GET STARTED
                        </Bubble>
                    </Animatable.View>
                    <Animatable.View ref="name" animation="bounceInRight" >
                        <Button
                            style={styles.buttonStyle}
                            block
                            onPress={() => {
                                // Remember that this refers to the props of the component CreateProfile
                                // As such, we can use this to get access to the various ref that are defined.
                                popUp(this.refs, 0);
                                // The number 0 is passed as an argument into popUp to be used in the switch.
                                // Now, 0 is linked to the 'name' Button. Likewise for the other buttons.
                            }}
                        >
                            <Text style={styles.textStyle}>NAME</Text>
                        </Button>
                    </Animatable.View>
                    <Animatable.View ref="age" animation="bounceInRight" >
                        <Button style={styles.buttonStyle} block onPress={() => { popUp(this.refs, 1); }} >
                            <Text style={styles.textStyle}>AGE</Text>
                        </Button>
                    </Animatable.View>
                    <Animatable.View ref="gender" animation="bounceInRight" >
                        <Button style={styles.buttonStyle} block onPress={() => { popUp(this.refs, 2); }} >
                            <Text style={styles.textStyle}>GENDER</Text>
                        </Button>
                    </Animatable.View>
                    <Animatable.View ref="dp" animation="bounceInRight" >
                        <Button style={styles.buttonStyle} block onPress={() => { popUp(this.refs, 3); }} >
                            <Text style={styles.textStyle}>PROFILE PICTURE</Text>
                        </Button>
                    </Animatable.View>
                    <Animatable.View ref="info" animation="bounceInRight" >
                        <Button style={styles.buttonStyle} block onPress={() => { popUp(this.refs, 4); }} >
                            <Text style={styles.textStyle}>PERSONAL INFO</Text>
                        </Button>
                    </Animatable.View>
                </View>
                {
                    // The following views are for the various pop-ups
                    // that will appear only when you click the corresponding
                    // button above.
                }
                <Animatable.View ref="popUp" style={styles.popUpStyle}>
                    <Text>
                        Place your pop-up here.
                    </Text>
                </Animatable.View>
            </View>
        );
    }
}


export default CreateProfile;

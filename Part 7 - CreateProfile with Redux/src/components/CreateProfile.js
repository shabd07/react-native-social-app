import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Bubble } from 'nachos-ui';
import { Button, Text, Item, Label, Input } from 'native-base';
import * as Animatable from 'react-native-animatable';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { WhichPopUp, OnNameChange, OnInfoChange, OnGenderChange, OnAgeChange, OnImagePressed } from '../actions/profile';

const { height, width } = Dimensions.get('screen');

// STYLES SECTION
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
        textAlign: 'center',
    },
    popUpStyle: {
        opacity: 0.0,
        zIndex: 0,
        alignItems: 'center',
        justifyContent: 'space-around',
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
    nameStyle: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
    },
    imageStyle: {
        height: 250,
        width: 250,
        resizeMode: 'stretch',
    },
};

// OPEN POPUP SECTION
const popUp = (ref, whichBtn, whichPopUp) => {
    // Event listener for button onPress events.

    // Animation section
    ref.bubble.bounceOutLeft();
    ref.name.bounceOutRight();
    ref.age.bounceOutRight();
    ref.gender.bounceOutRight();
    ref.dp.bounceOutRight();
    ref.info.bounceOutRight();

    // Pop-up appears
    whichPopUp(whichBtn);
    ref.popUp.zoomIn();

    // Switch to toggle individual popUp Components
    switch (whichBtn) {
        case (1):
            ref.popUp.transitionTo({ zIndex: 2, width: 300, left: width / 2 - 150, height: 180, top: height / 2 - 90 });
            break;
        case (2):
            ref.popUp.transitionTo({ zIndex: 2, width: 300, left: width / 2 - 150, height: 200, top: height / 2 - 100 });
            break;
        case (3):
            ref.popUp.transitionTo({ zIndex: 2, width: 150, height: 180, left: width / 2 - 75, top: height / 2 - 90 });
            break;
        case (4):
            ref.popUp.transitionTo({ zIndex: 2, width: 300, left: width / 2 - 150, height: 400, top: height / 2 - 200 });
            break;
        case (5):
            ref.popUp.transitionTo({ zIndex: 2, width: 300, left: width / 2 - 150, height: 300, top: height / 2 - 150 });
            break;
        default:
    }
};

// CLOSE POPUP ANIMATION SECTION
const removePopUp = (ref, whichPopUp) => {
    whichPopUp(0);
    ref.popUp.zoomOut();
    ref.bubble.bounceInLeft();
    ref.name.bounceInRight();
    ref.age.bounceInRight();
    ref.gender.bounceInRight();
    ref.dp.bounceInRight();
    ref.info.bounceInRight();
};

// VARIOUS POPUP FOLLOW-UP ACTIONS
const nameBtn = (ref, whichPopUp) => {
    removePopUp(ref, whichPopUp);
};

const ageBtn = (ref, whichPopUp) => {
    removePopUp(ref, whichPopUp);
};

const genderBtn = (ref, whichPopUp) => {
    removePopUp(ref, whichPopUp);
};

const dpBtn = (ref, whichPopUp) => {
    removePopUp(ref, whichPopUp);
};

const infoBtn = (ref, whichPopUp) => {
    removePopUp(ref, whichPopUp);
};

// MAPSTATETOPROPS
const mapStateToProps = ({ profileState }) => {
    const { btnNo, name, gender, info, age, imageSource, imageError } = profileState;
    return { btnNo, name, gender, info, age, imageSource, imageError };
};

class CreateProfile extends Component {
    // AGE TEXT
    ageRange() {
        return (`AGE RANGE: ${this.props.age[0]} - ${this.props.age[1]}`);
    }

    // VARIOUS POP-UP COMPONENTS
    currentPopUp() {
        // Name Button Pop-Up
        if (this.props.btnNo === 1) {
            return (
                <View style={{ height: 180, width: 300 }}>
                    <Item style={styles.nameStyle} floatingLabel>
                        <Label>I Am</Label>
                        <Input
                            onChangeText={name => this.props.OnNameChange(name)}
                            value={this.props.name}
                        />
                    </Item>
                    <Button style={styles.buttonStyle} block onPress={() => { nameBtn(this.refs, this.props.WhichPopUp); }} >
                        <Text style={styles.textStyle}>CONFIRM</Text>
                    </Button>
                </View>
            );
        } else if (this.props.btnNo === 2) {
            // Age Button Pop-Up
            return (
                <View>
                    <View style={{ marginTop: 30, marginBottom: 30 }}>
                        <Text style={{ ...styles.textStyle, fontSize: 18 }}>{this.ageRange()}</Text>
                    </View>
                    <MultiSlider
                        values={this.props.age}
                        // Note that since there are 2 sliders, this will return an array
                        // and that your initial state shd be an array as well.
                        onValuesChange={(age) => { this.props.OnAgeChange(age); }}
                        min={15}
                        max={50}
                        step={1}
                        sliderLength={200}
                        containerStyle={{
                            height: 20,
                        }}
                        // onValuesChangeStart={this.sliderOneValuesChangeStart}
                        // onValuesChange={this.sliderOneValuesChange}
                        // onValuesChangeFinish={this.sliderOneValuesChangeFinish}
                    />
                    <Button style={styles.buttonStyle} block onPress={() => { ageBtn(this.refs, this.props.WhichPopUp); }} >
                        <Text style={styles.textStyle}>CONFIRM</Text>
                    </Button>
                </View>
            );
        } else if (this.props.btnNo === 3) {
            // Gender Button Pop-Up
            return (
                <View>
                    <Button
                        style={styles.buttonStyle}
                        block
                        onPress={() => {
                            this.props.OnGenderChange(0); // We shall use ints to represent gender
                            genderBtn(this.refs, this.props.WhichPopUp, 0);
                        }}
                    >
                        <Text style={styles.textStyle}>MALE</Text>
                    </Button>
                    <Button
                        style={styles.buttonStyle}
                        block
                        onPress={() => {
                            this.props.OnGenderChange(1);
                            genderBtn(this.refs, this.props.WhichPopUp, 1);
                        }}
                    >
                        <Text style={styles.textStyle}>FEMALE</Text>
                    </Button>
                </View>
            );
        } else if (this.props.btnNo === 4) {
            // Profile Picture Button Pop-Up
            return (
                <View>
                    <TouchableOpacity
                        style={{ marginTop: 20 }}
                        onPress={() => { this.props.OnImagePressed(); }}
                    >
                        <Image
                            style={styles.imageStyle}
                            source={this.props.imageSource}
                        />
                    </TouchableOpacity>
                    <Text style={{ ...styles.textStyle, marginTop: 20 }}>{this.props.imageError}</Text>
                    <Button style={styles.buttonStyle} block onPress={() => { dpBtn(this.refs, this.props.WhichPopUp); }} >
                        <Text style={styles.textStyle}>CONFIRM</Text>
                    </Button>
                </View>
            );
        } else if (this.props.btnNo === 5) {
            // Personal Info Button Pop-Up
            return (
                <View>
                    <View style={{ marginTop: 20, marginBottom: 10 }}>
                        <Text style={{ ...styles.textStyle, fontSize: 18 }}>MY BIO</Text>
                    </View>
                    <Item rounded style={{ width: 270, height: 180 }}>
                        <Input
                            style={{ width: 270, height: 180 }}
                            multiline
                            placeholder=" Type here"
                            onChangeText={info => this.props.OnInfoChange(info)}
                            value={this.props.info}
                        />
                    </Item>
                    <Button style={styles.buttonStyle} block onPress={() => { infoBtn(this.refs, this.props.WhichPopUp); }} >
                        <Text style={styles.textStyle}>CONFIRM</Text>
                    </Button>
                </View>
            );
        }
        return <View />;
    }

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
                                popUp(this.refs, 1, this.props.WhichPopUp);
                                // The number 0 is passed as an argument into popUp to be used in the switch.
                                // Now, 0 is linked to the 'name' Button. Likewise for the other buttons.
                            }}
                        >
                            <Text style={styles.textStyle}>NAME</Text>
                        </Button>
                    </Animatable.View>
                    <Animatable.View ref="age" animation="bounceInRight" >
                        <Button style={styles.buttonStyle} block onPress={() => { popUp(this.refs, 2, this.props.WhichPopUp); }} >
                            <Text style={styles.textStyle}>AGE</Text>
                        </Button>
                    </Animatable.View>
                    <Animatable.View ref="gender" animation="bounceInRight" >
                        <Button style={styles.buttonStyle} block onPress={() => { popUp(this.refs, 3, this.props.WhichPopUp); }} >
                            <Text style={styles.textStyle}>GENDER</Text>
                        </Button>
                    </Animatable.View>
                    <Animatable.View ref="dp" animation="bounceInRight" >
                        <Button style={styles.buttonStyle} block onPress={() => { popUp(this.refs, 4, this.props.WhichPopUp); }} >
                            <Text style={styles.textStyle}>PROFILE PICTURE</Text>
                        </Button>
                    </Animatable.View>
                    <Animatable.View ref="info" animation="bounceInRight" >
                        <Button style={styles.buttonStyle} block onPress={() => { popUp(this.refs, 5, this.props.WhichPopUp); }} >
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
                    {this.currentPopUp()}
                </Animatable.View>
            </View>
        );
    }
}


export default connect(mapStateToProps, { WhichPopUp, OnNameChange, OnInfoChange, OnGenderChange, OnAgeChange, OnImagePressed })(CreateProfile);

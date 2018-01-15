import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { View, StatusBar, Platform } from 'react-native';
import { Container, Tab, Tabs, Icon, TabHeading, Text } from 'native-base';
import { SetUser, SetData } from '../actions/main';
import OptionsTab from './OptionsTab';
import Deck from './Deck';

const mapStateToProps = ({ authState, profileState }) => {
    const { user } = authState;
    const { age, myage, name, info, gender } = profileState;
    return { user, age, myage, name, info, gender }; // access with this.props.user
};

const statusBarStyle = {
    height: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: '#e0ffff',
};

class Main extends Component {
    componentDidMount() {
        const User = firebase.auth().currentUser; // access with this.User
        this.props.SetUser(User);
        this.props.SetData(User);
    }

    render() {
        return (
            <Container>
                <MyStatusBar barStyle="default" />
                <Tabs initialPage={1} locked>
                    <Tab heading={<TabHeading ><Icon name="options" /></TabHeading>}>
                        <OptionsTab />
                    </Tab>
                    <Tab heading={<TabHeading><Icon name="card" /></TabHeading>}>
                        <Deck />
                    </Tab>
                    <Tab heading={<TabHeading><Icon name="chatboxes" /></TabHeading>}>
                        <Text>CHATBOX</Text>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

const MyStatusBar = ({ ...props }) => (
    <View style={statusBarStyle}>
        <StatusBar backgroundColor={statusBarStyle.backgroundColor} {...props} />
    </View>
);

export default connect(mapStateToProps, { SetUser, SetData })(Main);

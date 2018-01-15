import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { View, StatusBar, Platform, Dimensions } from 'react-native';
import { Spinner } from 'nachos-ui';
import { Container, Tab, Tabs, Icon, TabHeading, Text } from 'native-base';
import { SetUser, SetData } from '../actions/main';
import OptionsTab from './OptionsTab';
import Deck from './Deck';

const mapStateToProps = ({ mainState }) => {
    const { main_loaded } = mainState;
    return { main_loaded };
};

const { width, height } = Dimensions.get('window');

const styles = {
    statusBarStyle: {
        height: Platform.OS === 'ios' ? 20 : 0,
        backgroundColor: '#e0ffff',
    },
    spinnerStyle: {
        height: height - 60,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
	},
};

class Main extends Component {
    componentDidMount() {
        const User = firebase.auth().currentUser;
        this.props.SetUser(User);
        this.props.SetData(User);
    }
    mainLoaded() {
        if (this.props.main_loaded) {
            return <Deck />;
        }
        else {
            return (
                <View style={styles.spinnerStyle}>
					<Spinner size={40}/>
				</View>
            );
        };
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
                        {this.mainLoaded()}
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
    <View style={styles.statusBarStyle}>
        <StatusBar backgroundColor={styles.statusBarStyle.backgroundColor} {...props} />
    </View>
);

export default connect(mapStateToProps, { SetUser, SetData })(Main);

import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { Container, Content, ListItem, Body, Icon, Title, Subtitle } from 'native-base';

const styles = {
    buttonStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    bodyStyle: {
        marginLeft: 15,
        alignItems: 'flex-start',
    },
    titleStyle: {
        fontSize: 25,
    },
    listStyle: {
        backgroundColor: 'powderblue',
    },
};

const mapStateToProps = ({ profileState }) => {
    const { name } = profileState;
    return { name }; // access with this.props.user
};

class OptionsTab extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <ListItem style={styles.listStyle}>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => Actions.profile()}
                        >
                            <Icon name="menu" />
                            <Body style={styles.bodyStyle}>
                                <Title style={styles.titleStyle}>{this.props.name}</Title>
                                <Subtitle>Update Your Profile</Subtitle>
                            </Body>
                        </TouchableOpacity>
                    </ListItem>
                    <ListItem style={styles.listStyle}>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => firebase.auth().signOut()}
                        >
                            <Icon name="log-out" />
                            <Body style={styles.bodyStyle}>
                                <Title style={styles.titleStyle}>Log Out</Title>
                                <Subtitle>From Social App</Subtitle>
                            </Body>
                        </TouchableOpacity>
                    </ListItem>
                </Content>
            </Container>
        );
    }
}

export default connect(mapStateToProps)(OptionsTab);

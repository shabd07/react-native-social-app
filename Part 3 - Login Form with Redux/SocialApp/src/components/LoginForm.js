import React, { Component } from 'react';
// Added connect
import { connect } from 'react-redux';
import { View, Image, StyleSheet } from 'react-native';
import { Input, Button, Spinner } from 'nachos-ui';
import { OnEmailChange, OnPasswordChange, OnLoginPressed } from '../actions';

// Styling values
const styles = StyleSheet.create({
	imageStyle: {
		height: 250,
		width: 250,
		marginBottom: 15,
	},
	viewStyle: {
		flex: 5,
		alignSelf: 'center',
		alignItems: 'center',
	},
	containerStyle: {
		flex: 1,
		backgroundColor: 'powderblue',
	},
	spinnerStyle: {
		margin: 15,
		width: 250,
		alignItems: 'center',
	},
});

const inputStyle = { margin: 5 };
const buttonStyle = { margin: 15, width: 250 };

const mapStateToProps = ({ authState }) => {
	const { email, password, loggingIn } = authState;
	return { email, password, loggingIn };
};

class LoginForm extends Component {
	loggingIn() {
		if (this.props.loggingIn) {
			return (
				<View style={styles.spinnerStyle}>
					<Spinner />
				</View>
			);
		}
		return (
			<Button
				kind="squared"
				type="danger"
				style={buttonStyle}
				onPress={this.props.OnLoginPressed}
			>
				Click to Log In
			</Button>
		);
	}

	render() {
		return (
			<View style={styles.containerStyle}>
				<View style={{ flex: 1 }} />
				<View style={styles.viewStyle}>
					<Image
						style={styles.imageStyle}
						source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Facebook_icon_2013.svg/200px-Facebook_icon_2013.svg.png' }}
					/>
					<Input
						style={inputStyle}
						autoCorrect={false}
						placeholder="Username"
						autoCapitalize="none"
						disabled={this.props.loggingIn} // if loggingIn, disable input
						/*
						A simple explanation on the logic at the back end:
						- Upon typing something, onChangeText event is fired, and leads to
						a callback function, which is our pre-binded action creator. Our
						action then gets dispatched to update the email and password states.
						- Ultimately, what is displayed in the input is defined under value
						and we cannot leave it empty as it would cause the user to not see
						what he or she types. Hence we link the states back to the values.
						*/
						onChangeText={this.props.OnEmailChange.bind(this.text)}
						value={this.props.email}
					/>
					<Input
						style={inputStyle}
						autoCorrect={false}
						placeholder="Password"
						autoCapitalize="none"
						secureTextEntry
						disabled={this.props.loggingIn}
						onChangeText={this.props.OnPasswordChange.bind(this.text)}
						value={this.props.password}
					/>
					{
						// Placed the Login Button and Spinner inside a method of
						// this component. This allows for components to change with
						// state.
						this.loggingIn()
					}

				</View>
				<View style={{ flex: 1 }} />
			</View>
		);
	}
}

// IMPORTANT NOTE: in this project, the last method mentioned in changelog.md Part 3
// is used.
export default connect(
	mapStateToProps,
	{ OnEmailChange, OnPasswordChange, OnLoginPressed },
)(LoginForm);

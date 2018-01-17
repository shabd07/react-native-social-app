import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Input, Button, Spinner, Switcher, SegmentedControlButton } from 'nachos-ui';
import { OnEmailChange, OnPasswordChange, OnLoginPressed, OnSwitch } from '../actions';

const windowSize = Dimensions.get('screen');

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
		paddingLeft: 15,
		paddingRight: 15,
	},
	containerStyle: {
		flex: 1,
		backgroundColor: 'powderblue',
		alignItems: 'center',
		justifyContent: 'center'
	},
	spinnerStyle: {
		margin: 15,
		width: 250,
		alignItems: 'center',
	},
	errorMsgStyle: {
		marginTop: 80,
		textAlign: 'center',
		width: windowSize.width - 30,
	},
});

const inputStyle = {
	marginLeft: 15, marginRight: 15, marginTop: 5, width: windowSize.width - 50,
};
const buttonStyle = { margin: 15, width: windowSize.width - 30 };
const switcherStyle = { marginBottom: 10, margin: 5 };

const mapStateToProps = ({ authState }) => {
	const { email, password, loggingIn, switchStatus, errorMessage, inputEmpty } = authState;
	return { email, password, loggingIn, switchStatus, errorMessage, inputEmpty };
};

class LoginForm extends Component {
	loggingIn() {
		if (this.props.loggingIn) {
			return (
				<View style={styles.spinnerStyle}>
					<Spinner />
				</View>
			);
		} else if (this.props.switchStatus === 'log-in') {
			return (
				<Button
					kind="rounded"
					type="primary"
					disabled={this.props.inputEmpty}
					iconName="md-log-in"
					style={buttonStyle}
					onPress={() => this.props.OnLoginPressed(this.props.email, this.props.password, this.props.switchStatus)}
				>
					Click to Log In
				</Button>
			);
		}
		return (
			<Button
				kind="rounded"
				type="primary"
				disabled={this.props.inputEmpty}
				iconName="md-create"
				style={buttonStyle}
				onPress={() => this.props.OnLoginPressed(this.props.email, this.props.password, this.props.switchStatus)}
			>
				Click to Sign Up
				</Button>
		);
	}

	render() {
		return (
			<KeyboardAwareScrollView contentContainerStyle={styles.containerStyle}>
				<View style={{ flex: 1 }} />
				<View style={styles.viewStyle}>
					<Image
						style={styles.imageStyle}
						source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Facebook_icon_2013.svg/200px-Facebook_icon_2013.svg.png' }}
					/>
					<Switcher
						// Either do this or you bind this.value to OnSwitch()
						onChange={value => this.props.OnSwitch(value)}
						direction="row"
						defaultSelected="log-in"
						style={switcherStyle}
					>
						<SegmentedControlButton value="log-in" text="Log In" />
						<SegmentedControlButton value="sign-up" text="Sign Up" />
					</Switcher>
					<Input
						icon="md-at"
						style={inputStyle}
						autoCorrect={false}
						placeholder="Username"
						autoCapitalize="none"
						disabled={this.props.loggingIn}
						onChangeText={this.props.OnEmailChange.bind(this.text)}
						value={this.props.email}
					/>
					<Input
						icon="md-barcode"
						style={inputStyle}
						autoCorrect={false}
						placeholder="Password"
						autoCapitalize="none"
						secureTextEntry
						disabled={this.props.loggingIn}
						onChangeText={this.props.OnPasswordChange.bind(this.text)}
						value={this.props.password}
					/>
					{this.loggingIn()}
					<Text style={styles.errorMsgStyle}>{this.props.errorMessage}</Text>
				</View>
				<View style={{ flex: 1 }} />
			</KeyboardAwareScrollView>
		);
	}
}

export default connect(
	mapStateToProps,
	{
		OnEmailChange, OnPasswordChange, OnLoginPressed, OnSwitch,
	},
)(LoginForm);

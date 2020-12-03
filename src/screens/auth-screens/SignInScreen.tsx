import React from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { CButton as Button } from "../../components/atoms";
import { CForm, SocialLogin } from "../../components/organisms";
// import { FormBuilder } from "../../components/organisms"
import { StackNavigationProp } from "@react-navigation/stack";
import { Container, Content, Thumbnail, Footer, Toast } from "native-base";
import { Grid, Row, Col } from "react-native-easy-grid";
const phi = require("../../../assets/placeholderIcon.png");
import { Formik } from "formik";
// import { AuthContext } from "../../navigations/AuthContext";
import * as yup from "yup";
import Reactotron from 'reactotron-react-native'
import { filterPassword } from "../../utils";
import { RootStackParamList } from "../../navigations/RootNavigator";
import { connect } from "react-redux";
import { guestUser, login, signUp } from "../../redux/actions/auth-action";
import { bindActionCreators } from "redux";
import { Screens } from "../../definitions/screen-definitions";
import * as Google from "expo-google-app-auth";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Headline, Title } from "react-native-paper";

type AuthNavigation = StackNavigationProp<RootStackParamList>;

interface SignInValues {
	email: string;
	password: string;
}

function SignInScreen({ navigation, guestLogin, userLogin, error, userSignUp }: any) {
	// const { signIn, anonymous } = useContext(AuthContext);

	const signInValSchema = yup.object({
		email: yup.string().email("Invalid Email!").required("Required"),
		password: yup.string().required("Required"),
	});

	const navToAppScreen = () => {
		Reactotron.log!("*Navigating to App Screens*");
		guestLogin();
	};
	const signInRoutine = (values: any, actions: any) => {
		actions.resetForm();
		userLogin(values);
		if (error) {
			Reactotron.error!(error, null);
			actions.setFieldError("server", error);
		}
		// showToast(values);
	};
	const nav = () => {
		Reactotron.log!("navigating to SignUp screen");
		navigation.navigate(Screens.SIGN_UP);
	};

	const showToast = (value: any) => {
		Toast.show({
			text: JSON.stringify(value, filterPassword),
			position: "bottom",
			duration: 3000,
		});
	};

	const initialValues = {
		email: "karthik.munipalle21@cabbuddies.com",
		password: "edokati",
	};

	const googleUserMapper = (googleUser) => {
		let email = googleUser.email;
		let firstname = googleUser.givenName;
		let lastname = googleUser.familyName;
		let password = googleUser.id;
		let displayPicture = googleUser.photoUrl;
		return { email, firstname, lastname, password, displayPicture };
	}

	const signInWithGoogle = async () => {
		console.log(`constants: `, Constants.manifest.extra);
		try {
			const result = await Google.logInAsync({
				iosClientId: Constants.manifest.extra.IOS_CLIENT_ID,
				androidClientId: Constants.manifest.extra.ANDROID_CLIENT_ID,
				scopes: ["profile", "email"]
			});

			if (result.type === "success") {
				console.log("LoginScreen.js.js 21 | ", result.user, result.user.givenName);
				const newgoogleUser = googleUserMapper(result.user);
				console.log(`new google user: `, newgoogleUser);
				userSignUp(newgoogleUser);
				if (error) {
					Reactotron.error!(error, null);
				}
				// this.props.navigation.navigate("Profile", {
				//   username: result.user.givenName
				// }); //after Google login redirect to Profile
				return result.accessToken;
			} else {
				return { cancelled: true };
			}
		} catch (e) {
			console.log('LoginScreen.js.js 30 | Error with login', e);
			return { error: true };
		}
	};





	//FIXME
	userLogin(initialValues);






	return (
		<Container>
			<KeyboardAwareScrollView>
				<Grid >
					<Row style={{ justifyContent: "center" }}>
						{/* <Thumbnail source={phi} style={{ marginTop: 20 }} /> */}
						<Headline style={{paddingTop:60, paddingBottom:35, color: 'rgb(20,95,255)', fontSize:70, fontFamily: "Signatra" }}>Travel Buff</Headline>
					</Row>
					<Row>
						<SocialLogin google={signInWithGoogle} />
					</Row>

					<Row>
						<Formik
							initialValues={initialValues}
							validationSchema={signInValSchema}
							onSubmit={signInRoutine}
						>
							{(props) => <CForm type="login" formik={props} />}
						</Formik>
					</Row>

					<Row>
						<Button
							hasText
							transparent
							onPress={nav}
							title=" New to TravelBuff? SignUp "
							container={{ flex: 1, justifyContent: "center" }}
						/>
					</Row>
				</Grid>
			</KeyboardAwareScrollView>
			<Footer style={{ backgroundColor: "#fff" }}>
				<Button
					transparent
					onPress={navToAppScreen}
					icon="ios-arrow-forward"
					iconStyle={{ color: "#6975a6" }}
					hasIcon
					icRight
					iconRight
					title=" Continue Without Signup "
					container={{ flex: 1, justifyContent: "center" }}
					textStyle={{ fontWeight: "bold", color: "#6975a6" }}
				/>
			</Footer>
		</Container>
	);
}

function mapStateToProps(state) {
	const { authState } = state;
	return {
		isSignedIn: authState.isSignedIn,
		error: authState.error,
	}
}

function matchDispatchToProps(dispatch) {
	return {
		guestLogin: bindActionCreators(guestUser, dispatch),
		userLogin: bindActionCreators(login, dispatch),
		userSignUp: bindActionCreators(signUp, dispatch),
	}
}

export default connect(mapStateToProps, matchDispatchToProps)(SignInScreen);

const styles = StyleSheet.create({
	btnContainer: {
		marginTop: 20,
	},
	formContainer: {
		flex: 1,
		padding: 24,
		// backgroundColor: '#fffa',
		justifyContent: "center",
		alignItems: "stretch",
		alignContent: "space-between",
	},
	row: {
		borderWidth: 2,
		borderTopColor: "#99f",
	},
	col: {
		borderLeftWidth: 2,
		borderLeftColor: "#99f",
	},
});

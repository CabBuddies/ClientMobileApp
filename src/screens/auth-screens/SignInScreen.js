import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { CButton as Button } from "../../components/atoms";
import { CForm, FieldTypes, SocialLogin } from "../../components/organisms";
// import { FormBuilder } from "../../components/organisms"
import { Container, Content, Thumbnail, Footer, Toast } from "native-base";
import { Grid, Row, Col } from "react-native-easy-grid";
import phi from "../../../assets/placeholderIcon.png";
import { Formik } from "formik";
import { AuthContext } from "../../navigations/RootNavigator"
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import * as authActions from '../../redux/actions/authAction';
import { bindActionCreators } from 'redux';

const signInSchema = [
  {
    name: "email",
    label: "E-mail",
    type: FieldTypes.ICON_INPUT,
    itemProps:{
      floatingLabel: true,
    },
    icon: "ios-mail",
  },
  {
    name:"password",
    label: "Password",
    type: FieldTypes.ICON_INPUT,
    itemProps:{
      floatingLabel: true
    },
    inputProps:{
      secureTextEntry: true,
    },
    icon: "ios-lock",
  },
  {
    type:FieldTypes.BUTTON,
    buttonProps:{
      rounded: true,
      style: {marginTop:20},
      title: "Sign In"
    }
  }
]

export default function SignInScreen({ navigation }) {
  
  const { signIn, anonymous } = useContext(AuthContext); 


  const navToAppScreen = () => {
    console.log("Navigating to App Screens\n");
    anonymous();
  }
  const signInRoutine = (values,actions) => {
          actions.resetForm();
          signIn(values);
          showToast(values);
  }
  const nav = () => {
    console.log("[Info] navigating to SignUp screen\n");
    navigation.navigate("SignUp");
  };

  const showToast = (value) => {
    Toast.show({
      text: JSON.stringify(value),
      position: "bottom",
      duration: 3000
    })
  }

  const initialValues = {
    email: '',
    password: ''
  }

  return (
    <Container>
      <Content>
        <Grid style={styles.container}>
          <Row style={{ justifyContent: "center" }}>
            <Thumbnail source={phi} style={{ marginTop: 20 }} />
          </Row>
          <Row>
            <SocialLogin />
          </Row>

          <Row>
          <Formik 
          initialValues = {initialValues}
          onSubmit = {signInRoutine}
          >
          {(props) => (
            <CForm type="login" formik={props}/>
          )
          }
          </Formik>
          </Row>

          <Row>
            <Button
              hasText
              transparent
              onPress={nav}
              title=" New to CabBuddies? SignUp "
              container={{ flex: 1, justifyContent: "center" }}
            />
          </Row>
        </Grid>
      </Content>
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

// function mapStateToProps(state) {
//     return {
//         isSignedIn: state.isSignedIn
//     };
// }

// function matchDispatchToProps(dispatch) {
//   return {
//     actions: {
//       guestLogin: bindActionCreators(authActions.guestUser, dispatch),
//       userLogin: bindActionCreators(authActions.login, dispatch)
//     }
//   }
// }

// export default connect(mapStateToProps, matchDispatchToProps)(SignInScreen);


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

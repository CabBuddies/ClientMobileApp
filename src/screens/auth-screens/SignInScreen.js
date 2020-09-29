import React from "react";
import { View, StyleSheet } from "react-native";
import { CButton as Button } from "../../components/atoms";
import { CForm, FieldTypes, SocialLogin } from "../../components/organisms";
import { FormBuilder } from "../../components/organisms"
import { Container, Content, Thumbnail, Footer } from "native-base";
import { Grid, Row, Col } from "react-native-easy-grid";
import phi from "../../../assets/placeholderIcon.png";

const signInSchema = [
  {
    label: "E-mail",
    type: FieldTypes.ICON_INPUT,
    itemProps:{
      floatingLabel: true
    },
    icon: "ios-mail",
  },
  {
    label: "Password",
    type: FieldTypes.ICON_INPUT,
    itemProps:{
      floatingLabel: true
    },
    inputProps:{
      secureTextEntry: true
    },
    icon: "ios-lock",
  },
  {
    type:FieldTypes.BUTTON,
    buttonProps:{
      onPress: () =>alert('Sign in Pressed'),
      style: {marginTop:20},
      title: "Sign In"
    }
  }

]

export default function SignInScreen({ navigation }) {
  const nav = (nav) => {
    console.log("[Info] navigating to SignUp screen\n");
    navigation.navigate("SignUp");
  };
  console.log(`Form Schema:\n ${JSON.stringify(signInSchema)}`);
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
            <FormBuilder schema = {signInSchema} style={{flex:1}}/>
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
          onPress={nav}
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

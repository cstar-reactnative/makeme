import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Constants } from "expo";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { CheckBox } from "react-native-elements";
import * as userSignUp from "../src/Reducers/Session/Actions";
import Translation from '../assets/translation';

import Heading from "../components/Heading";
import InputField from "../components/InputField";
import RoundButton from "../components/RoundButton";

const PAGE = Dimensions.get('window');
class SignUpScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
    invalidFields: false,
    invalidFirstName: false,
    invalidLastName: false,
    invalidEmail: false,
    invalidPassword: false,
    invalidMobile: false,
    invalidMobileTest: false,
    loading: false,
    gender: 'female'
  };

  SignUpPressHandler = async route => {
    const { firstName, lastName, email, password, mobile, invalidFields, gender,invalidMobileTest } = this.state;
    const reg =/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/
    if (!mobile) this.setState({ invalidMobile: true, invalidFields: true });
    if(reg.test(mobile)===false){
      // console.warn("InValid Mobile")
    await this.setState({ invalidMobileTest: true, invalidFields: true });
    }else{
      await this.setState({invalidFields:false})
    }
    if (!firstName)
      this.setState({ invalidFirstName: true, invalidFields: true });
    if (!lastName)
      this.setState({ invalidLastName: true, invalidFields: true });
    if (!email) this.setState({ invalidEmail: true, invalidFields: true });
    if (!password)
      this.setState({ invalidPassword: true, invalidFields: true });
    if (email && password && mobile && firstName && lastName && !invalidMobileTest && !invalidFields ) {
      const data = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        mobile: this.state.mobile,
        userType: this.props.userType,
        gender: gender,
        createdAt: new Date(),
      };
      this.setState({ loading: true })
      this.props.actions.signUp(data, (error, success, userType) => {
        if(error){
          this.setState({ loading: false })
        }else if (success) {
          this.setState({ loading: false })
          if (userType === "user") {
            this.props.navigation.navigate("GenderAndLocation");
          
          } else if (userType === "businessOwner") {
            this.props.navigation.navigate("businessRegistrationNavigation");
          }
        }
      });
    }
  };

  onChangeText = async (text) => {
    await this.setState({invalidMobileTest:false})
    const re = /^[0-9\b]+$/;
    if (text == '' || re.test(text)) {
      this.setState({
        invalidMobile: false,
        mobile: text
      });
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
      <View style={{ paddingTop: 22, backgroundColor: 'white' }} />
      <KeyboardAvoidingView 
        behavior="padding"
      >
      <ScrollView contentContainerStyle={styles.container}>
      {
        this.state.loading &&
        <View style={{ zIndex: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute', height: PAGE.height, width: PAGE.width }}>
          <ActivityIndicator size="large" color="lightblue" />
        </View>
      }
        <Heading
          imageSource={require("../assets/logo2.png")}
          headingText={Translation.signUp.signUp[this.props.lang]}
          subheadingText={null}
        />
        <InputField
          lang={this.props.lang}
          label={Translation.signUp.firstName[this.props.lang]}
          onChangeText={text => {
            this.setState({
              invalidFields: false,
              invalidFirstName: false,
              firstName: text
            });
          }}
          inputValue={this.state.firstName}
          labelStyle={this.state.invalidFirstName ? { color: "red" } : null}
        />
        <InputField
          lang={this.props.lang}
          label={Translation.signUp.lastName[this.props.lang]}
          onChangeText={text => {
            this.setState({
              invalidFields: false,
              invalidLastName: false,
              lastName: text
            });
          }}
          inputValue={this.state.lastName}
          labelStyle={this.state.invalidLastName ? { color: "red" } : null}
        />
        <InputField
          lang={this.props.lang}
          label={Translation.signUp.email[this.props.lang]}
          onChangeText={text => {
            this.setState({
              invalidFields: false,
              invalidEmail: false,
              email: text
            });
          }}
          inputValue={this.state.email}
          keyboardType="email-address"
          labelStyle={this.state.invalidEmail ? { color: "red" } : null}
        />
        <InputField
          lang={this.props.lang}
          label={Translation.signUp.password[this.props.lang]}
          onChangeText={text => {
            this.setState({
              invalidFields: false,
              invalidPassword: false,
              password: text
            });
          }}
          inputValue={this.state.password}
          secure={true}
          labelStyle={this.state.invalidPassword ? { color: "red" } : null}
        />
        <InputField
          lang={this.props.lang}
          label={Translation.signUp.mobile[this.props.lang]}
          onChangeText={this.onChangeText.bind(this)}
          inputValue={this.state.mobile}
          labelStyle={this.state.invalidMobile ? { color: "red" } : null}
        />
        <View style={[{ flexDirection: "row", justifyContent: "center",alignItems:"center"},this.props.lang==="ar"?{flexDirection: "row-reverse"}:null]}>
            <CheckBox
              right
              iconRight
              title={Translation.profile.female[this.props.lang]}
              checked={this.state.gender === "female"}
              onPress={() => this.setState({ gender: "female",invalidFields:false })}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor="lightblue"
              containerStyle={{ backgroundColor: "white", borderWidth: 0 }}
              textStyle={{ fontSize: 17 }}
            />
            <CheckBox
              right
              iconRight
              title={Translation.profile.male[this.props.lang]}
              checked={this.state.gender === "male"}
              onPress={() => this.setState({ gender: "male",invalidFields:false })}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor="lightblue"
              containerStyle={{ backgroundColor: "white", borderWidth: 0 }}
              textStyle={{ fontSize: 17 }}
            />
        </View>
        <Text
          style={{
            textAlign: "center",
            color: "red",
            fontSize: 16,
          }}
        >
          {this.state.invalidFields && !this.state.invalidMobileTest ? "All fields are required" : this.state.invalidFields && this.state.invalidMobile ? Translation.newTranslation.mobileNumberShould[this.props.lang] : null}
        </Text>      
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <RoundButton
          text={Translation.signUp.cancel[this.props.lang]}
          style={[styles.buttonStyle, { borderColor: "#000" }]}
          textColor="#000"
          fontSize={20}
          onPress={() => {
            this.props.navigation.goBack();
            // this.props.actions.setUserDetails(this.state);
          }}
        />
        <RoundButton
          text={Translation.signUp.signUp[this.props.lang]}
          style={[
            styles.buttonStyle,
            { backgroundColor: "#3f8ca1", borderColor: "transparent" }
          ]}
          textColor="#fff"
          fontSize={20}
          onPress={() => {
            // this.props.actions.setUserDetails(this.state);
            this.SignUpPressHandler("RegStep3");
          }}
        />
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    padding: 15,
    margin: 10,
    borderWidth: 2,
    borderRadius: 40
  }
});

function mapStateToProps(state) {
  return {
    lang: state.Session.language,
    userType: state.Session.userSignupForm.userType
  };
}

function mapActionToProps(dispatch) {
  return {
    actions: bindActionCreators(userSignUp, dispatch)
  };
}
export default connect(mapStateToProps, mapActionToProps)(SignUpScreen);

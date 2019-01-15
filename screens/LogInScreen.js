import React, { Component } from "react";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Dimensions,
  Modal
} from "react-native";
import { Constants } from "expo";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Translation from "../assets/translation";
import * as login from "../src/Reducers/Session/Actions";

import Heading from "../components/Heading";
import InputField from "../components/InputField";
import RoundButton from "../components/RoundButton";
const PAGE = Dimensions.get("window");
class LogInScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    email: "",
    password: "",
    invalidLogin: false,
    invalidEmail: false,
    invalidPassword: false,
    loading: false,
    modalVisible: false
  };

  LogInPressHandler = () => {
    const { email, password } = this.state;
    if (!email) this.setState({ invalidEmail: true, invalidLogin: true });
    if (!password) this.setState({ invalidPassword: true, invalidLogin: true });
    if (email && password) {
      this.setState({
        invalidLogin: false,
        invalidEmail: false,
        invalidPassword: false
      });
      this.setState({ loading: true });
      this.props.actions.login(
        email,
        password,
        (error, success, userType, data) => {
          if (success) {
            this.setState({ loading: false });
            if (userType === "user") {
              // this.props.navigation.navigate("Home");
              this.props.navigation.navigate("GenderAndLocation");
            } else if (userType === "businessOwner") {
              this.props.navigation.navigate("VenueHome");
            }
          } else if (error === 'error') {
            this.setState({ loading: false });
          } else if (error === 'disabled') {
            this.setState({ loading: false }, () => {
              const info = Translation.Login.information[this.props.lang]
              const message = Translation.Login.disabledMsg[this.props.lang]
              Alert.alert(info, message)
            });
          }
        }
      );
    }
  };

  render() {
    return (
      // <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          {this.state.loading && (
            <View
              style={{
                zIndex: 1,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                height: PAGE.height,
                width: PAGE.width
              }}
            >
              <ActivityIndicator size="large" color="lightblue" />
            </View>
          )}
          <View style={{ marginTop: 30 }}>
            <Heading
              imageSource={require("../assets/logo2.png")}
              headingText={Translation.Login.login[this.props.lang]}
              subheadingText={Translation.Login.subheading[this.props.lang]}
            />
            <InputField
              lang={this.props.lang}
              label={Translation.Login.email[this.props.lang]}
              onChangeText={text => {
                this.setState({
                  invalidLogin: false,
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
              label={Translation.Login.password[this.props.lang]}
              onChangeText={text =>
                this.setState({
                  invalidLogin: false,
                  invalidPassword: false,
                  password: text
                })
              }
              inputValue={this.state.password}
              secure={true}
              labelStyle={this.state.invalidPassword ? { color: "red" } : null}
            />
            <TouchableOpacity
              onPress={() => this.setState({ modalVisible: true })}
            >
              <Text style={styles.forgot}>
                {Translation.Login.forgotPassword[this.props.lang]}
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                color: "red",
                fontSize: 16,
                marginTop: 10
              }}
            >
              {this.state.invalidLogin
                ? "Please type in your Email and Password"
                : null}
            </Text>
          </View>
          <View style={{ alignItems: "center", flex: 1 }}>
            <RoundButton
              text={Translation.Login.login[this.props.lang]}
              style={[styles.buttonStyle, { borderColor: "#000" }]}
              textColor="#000"
              fontSize={25}
              onPress={this.LogInPressHandler}
            />
          </View>

          <View
            style={{
              alignItems: "center",
              flex: 1,
              justifyContent: "flex-end",
              paddingBottom: 30
            }}
          >
            <TouchableOpacity
              onPress={() => {
                const email = "guest@app.com";
                const password = "guest@makeme";
                this.props.actions.login(
                  email,
                  password,
                  (error, success, userType, data) => {
                    if (success) {
                      if (userType === "user") {
                        this.props.navigation.navigate("GenderAndLocation");
                      } else if (userType === "businessOwner") {
                        this.props.navigation.navigate("VenueHome");
                      }
                    }
                  }
                );
              }}
            >
              <Text style={styles.signup}>
                {Translation.Login.loginGuest[this.props.lang]}
              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 18 }}>
              {Translation.Login.notRegistered[this.props.lang]}
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("UserType")}
            >
              <Text style={styles.signup}>
                {Translation.Login.signUp[this.props.lang]}
              </Text>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="fade"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              // alert("Modal has been closed.");
            }}
          >
            <View>
              <View
                style={{
                  backgroundColor: "#fff",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 2,
                  shadowRadius: 10,
                  height: "100%",
                  width: "100%",
                  marginBottom: "50%"
                }}
              >
                <Text style={{ marginTop: "10%", paddingBottom: 10 }}>
                  {Translation.Login.forgotPassword[this.props.lang]}
                </Text>
                <InputField
                  lang={this.props.lang}
                  label={Translation.Login.email[this.props.lang]}
                  onChangeText={text => {
                    this.setState({
                      invalidLogin: false,
                      invalidEmail: false,
                      email: text
                    });
                  }}
                  inputValue={this.state.email}
                  keyboardType="email-address"
                  labelStyle={this.state.invalidEmail ? { color: "red" } : null}
                />
                <View style={{ flexDirection: "row", marginTop: "10%" }}>
                  <RoundButton
                    text="Reset"
                    style={[
                      styles.buttonStyle,
                      {
                        backgroundColor: "#3f8ca1",
                        borderColor: "transparent",
                        height: 50,
                        width: "25%"
                      }
                    ]}
                    textColor="#fff"
                    fontSize={20}
                    onPress={() => {
                      if (this.state.email === "") {
                        this.setState({
                          invalidLogin: true,
                          invalidEmail: true
                        });
                      } else {
                        this.props.actions.resetPassword(this.state.email),
                          Alert.alert(
                            "Reset Password",
                            "Please Check Your Email To Reset Your Password",
                            [
                              {
                                text: "OK",
                                onPress: () =>
                                  this.setState({ modalVisible: false })
                              }
                            ],
                            { cancelable: false }
                          );
                      }
                    }}
                  />
                  <RoundButton
                    text={Translation.signUp.cancel[this.props.lang]}
                    style={[
                      styles.buttonStyle,
                      {
                        backgroundColor: "#3f8ca1",
                        borderColor: "transparent",
                        height: 50,
                        width: "25%"
                      }
                    ]}
                    textColor="#fff"
                    fontSize={20}
                    onPress={() => this.setState({ modalVisible: false })}
                  />
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%"
                }}
              />
            </View>
          </Modal>
        </ScrollView>
      // </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
    paddingHorizontal: 15
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: 55,
    width: "70%",
    margin: 10,
    borderWidth: 2,
    borderRadius: 40
  },
  forgot: {
    fontSize: 17,
    color: "#3f8ca1",
    textAlign: "center",
    paddingTop: 10
  },
  signup: {
    fontSize: 18,
    color: "#3f8ca1",
    fontWeight: "bold",
    paddingTop: 5
  }
});

function mapStateToProps(state) {
  return {
    lang: state.Session.language
  };
}
function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators(login, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LogInScreen);

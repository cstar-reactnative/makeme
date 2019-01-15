import React, { Component } from "react";
import {
  View,
  Alert,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";
import { Constants } from "expo";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as updateProfile from "../src/Reducers/Session/Actions";

import Heading from "../components/Heading";
import InputField from "../components/InputField";
import RoundButton from "../components/RoundButton";
import MenuHeader from "../components/MenuHeader";

import VenueFooter from "../components/VenueFooter";
import Translation from "../assets/translation";
import TouchableList from "../components/TouchableList";
import VerificationButton from "../components/VerificationButton";

class OwnerSettings extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    selected: 2,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
    lang: "en"
  };

  render() {
    return (
      <View style={styles.Maincontainer}>
        <View>
          <MenuHeader
            lang={this.props.lang}
            headerText={Translation.profile.profile[this.props.lang]}
            notif={true}
            onPress={() => this.props.navigation.navigate("VenueNotifications")}
          />
        </View>
        <ScrollView contentContainerStyle={styles.container}>
        
        <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection:"column"
            }}
          >
            <View>
              <Text style={{ fontSize: 16, alignSelf: "center" }}>
                You are loggedIn as
              </Text>
              <Text
                style={{ fontSize: 16, fontWeight: "500", alignSelf: "center" }}
              >
                {this.props.profile.email}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#3f8ca1",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                height: 40,
                alignSelf: "center",
                flexDirection: "row",
                padding: 10,
                marginTop: 10,
                marginLeft: this.props.lang === "en" ? 10 : 0,
                marginRight: this.props.lang === "en" ? 0 : 10
              }}
              onPress={() => {
                this.props.actions.resetPassword(this.props.profile.email),
                  Alert.alert(
                    "Change Password",
                    "Please Check Your Email To Change Your Password",
                    [{ text: "OK", onPress: () => { } }],
                    { cancelable: false }
                  );
              }}
            >
              <Text
                style={{ color: "white", fontWeight: "600", paddingRight: 0 }}
              >
                {Translation.newTranslation.changePassword[this.props.lang]}
              </Text>
              {/* {props.loading && <ActivityIndicator size="small" color="#2d3436" />} */}
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center" ,flexDirection:this.props.lang==="en"?"row":"row-reverse",justifyContent:"center"}}>
          <View style={{width:"50%"}}>
          
            <InputField
              lang={this.props.lang}
              editable={this.props.profile.email === 'guest@app.com' ? false : true}
              label={Translation.signUp.mobile[this.props.lang]}
              onChangeText={text => this.setState({ mobile: text })}
              inputValue={this.props.profile.mobile}
              keyboardType="numeric"
              // inputStyle={{width:50}}
            />
            </View>
            <View style={{}}>
            <RoundButton
              text={Translation.HomeScreen.update[this.props.lang]}
              style={[
                styles.buttonStyle,
                { backgroundColor: "#3f8ca1", borderColor: "transparent", height: 40,width:90 }
              ]}
              disabled={this.props.profile.email === 'guest@app.com'}
              textColor="#fff"
              fontSize={16}
              onPress={() => {
                const {mobile} = this.props.profile;
                const data = {
                  mobile: this.state.mobile || mobile,
                }
                this.props.actions.updateUser(data);
                this.props.actions.updateUserProfile(data);
              }}
            />
          </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text>Language : </Text>
            <RoundButton
              text={this.props.lang === "en" ? "عربي" : "English"}
              style={[
                styles.buttonStyle,
                {
                  backgroundColor: "#3f8ca1",
                  borderColor: "transparent",
                  height: 30
                }
              ]}
              textColor="#fff"
              fontSize={20}
              onPress={() => {
                var selectedLang;
                if (this.props.lang === "ar") {
                  selectedLang = "en";
                } else if (this.props.lang === "en") {
                  selectedLang = "ar";
                }
                this.props.actions.chooseLanguage(selectedLang, () => { });
              }}
            />
            <View />
          </View>
         
          <View style={{ alignItems: "center",marginTop:"15%"}}>
          {
            !this.props.profile.emailVerified &&
            <VerificationButton
              lang={this.props.lang}
              onPress={() => {
                this.setState({ verificationLoading: true }, () => {
                  this.props.actions.resendVerification((err, res) => {
                    if (err) {
                      this.setState({ verificationLoading: false }, () => {
                        Alert.alert('Error', err.message);
                      })
                    } else {
                      this.setState({ verificationLoading: false }, () => {
                        Alert.alert('Information', res.message);
                      })
                    }
                  });
                })
              }}
              loading={this.state.verificationLoading}
            />
          }
            <RoundButton
              text={Translation.profile.profile[this.props.lang]}
              style={[
                styles.buttonStyle,
                {
                  backgroundColor: "#3f8ca1",
                  borderColor: "transparent",
                  height: 50,
                  width: "70%"
                }
              ]}
              textColor="#fff"
              fontSize={20}
              onPress={() => {
                this.props.navigation.navigate("RegStep3");
              }}
            />
            <RoundButton
              text={Translation.profile.teamMember[this.props.lang]}
              style={[
                styles.buttonStyle,
                {
                  backgroundColor: "#3f8ca1",
                  borderColor: "transparent",
                  height: 50,
                  width: "70%"
                }
              ]}
              textColor="#fff"
              fontSize={20}
              onPress={() => {
                this.props.navigation.navigate("RegStep2");
              }}
            />
            <RoundButton
              text={Translation.HomeScreen.title[this.props.lang]}
              style={[
                styles.buttonStyle,
                {
                  backgroundColor: "#3f8ca1",
                  borderColor: "transparent",
                  height: 50,
                  width: "70%"
                }
              ]}
              textColor="#fff"
              fontSize={20}
              onPress={() => {
                this.props.navigation.navigate("RegStep1");
              }}
            />
            <RoundButton
              text={Translation.HomeScreen.logout[this.props.lang]}
              style={[
                styles.buttonStyle,
                {
                  backgroundColor: "#E13438",
                  borderColor: "transparent",
                  height: 50,
                }
              ]}
              textColor="#fff"
              fontSize={20}
              onPress={() => {
                Alert.alert(
                  Translation.HomeScreen.logout[this.props.lang],
                  Translation.forTranslations.forLogout[this.props.lang],
                  [
                    {
                      text: Translation.userType.cancel[this.props.lang],
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    {
                      text: Translation.forTranslations.yes[this.props.lang],
                      onPress: () => {
                        this.props.actions.userLogout((err, res) => {
                          console.log("Owner Logged Out")
                        });
                        this.props.navigation.navigate("Language");
                      }
                    }
                  ],
                  { cancelable: false }
                );
              }}
            />
          </View>
        </ScrollView>
        <View style={{ alignItems: "center" }}>
          <VenueFooter
            onTabPress={(tabId, route) => {
              this.setState({
                selected: tabId,
                route: route
              });
            }}
            selected={2}
            route={this.state.route}
            navigation={this.props.navigation}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  Maincontainer: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
    justifyContent: "space-between"
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    width: "35%",
    margin: 10,
    borderWidth: 2,
    borderRadius: 40
  }
});

function mapStateToProps(state) {
  return {
    profile: state.Session.currentUser,
    lang: state.Session.language
  };
}
function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators(updateProfile, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(OwnerSettings);

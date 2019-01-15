import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { Constants } from "expo";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as updateProfile from '../src/Reducers/Session/Actions'
import Translation from '../assets/translation';
import Heading from "../components/Heading";
import InputField from "../components/InputField";
import RoundButton from "../components/RoundButton";
import MenuHeader from "../components/MenuHeader";
import VerificationButton from "../components/VerificationButton";

import FooterTab from "../components/FooterTab";
import { Button } from "react-native-elements";
class ProfileScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    selected: 5,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
    lang:"en",
    verificationLoading: false,
  };

  render() {
    return (
      <View style={styles.Maincontainer}>
          <MenuHeader
            lang={this.props.lang}
            headerText={Translation.profile.profile[this.props.lang]}
            notif={true}
            onPress={() => this.props.navigation.navigate("Notifications")}
          />
        
        {
          this.props.profile.email === 'guest@app.com' ? 
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "whitesmoke" }}>
            <Heading
              headingText={Translation.forTranslations.createAccountorLogin[this.props.lang]}
              subheadingText={Translation.forTranslations.createAccLogMessage[this.props.lang]}
            />
            <RoundButton
            text={Translation.Login.login[this.props.lang]}
            style={[
              styles.buttonStyle,
              { backgroundColor: "#E13438", borderColor: "transparent",height:50 }
            ]}
            textColor="#fff"
            fontSize={20}
            onPress={() => {
              this.props.actions.userLogout((err, res) => {
                if (!err) {
                  this.props.navigation.navigate("Language")
                }
              })
            }}
            />
          </View>
          :

          <ScrollView>
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
            <View 
              style={{ 
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 10
              }}
            >
            <Text>Language : </Text>
            <RoundButton
                text={this.props.lang==="en"?"عربي":"English"}
                style={[
                  styles.buttonStyle,
                  { backgroundColor: "#3f8ca1", borderColor: "transparent",height:30 }
                ]}
                textColor="#fff"
                fontSize={20}
                onPress={() => {
                  var selectedLang
                  if(this.props.lang==="ar"){
                    selectedLang="en"
                  }else if(this.props.lang==="en")
                  {
                    selectedLang="ar"
                  }
                  this.props.actions.chooseLanguage(selectedLang,()=>{})
               
                }}
              />
            <View>
            </View>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center' }}>

            <Text style={{ fontSize: 16 }}>You are loggedIn as</Text>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>{this.props.profile.email}</Text>
            <TouchableOpacity
            style={{ 
              backgroundColor: '#3f8ca1',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 30,
              height: 50,
              width: 180,
              alignSelf: 'center',
              flexDirection: 'row',
            }}
            onPress={()=>{
                
              this.props.actions.resetPassword(this.props.profile.email),
              Alert.alert(
                'Change Password',
                'Please Check Your Email To Change Your Password',
                [

                  {text: 'OK', onPress: () =>  {}},
                ],
                { cancelable: false }
              )
              
            }}
          >
            <Text style={{ color: 'white', fontWeight: '600', paddingRight: 0 ,fontSize:17}}>
              {Translation.newTranslation.changePassword[this.props.lang]}
            </Text>
            {/* {props.loading && <ActivityIndicator size="small" color="#2d3436" />} */}
            </TouchableOpacity>
            </View>
            

          <KeyboardAvoidingView behavior="position">
            <InputField
              lang={this.props.lang}
              editable={this.props.profile.email === 'guest@app.com' ? false : true}
              label={Translation.signUp.firstName[this.props.lang]}
              onChangeText={text => this.setState({ firstName: text })}
              inputValue={this.props.profile.firstName}
            />
            <InputField
              lang={this.props.lang}
              editable={this.props.profile.email === 'guest@app.com' ? false : true}
              label={Translation.signUp.lastName[this.props.lang]}
              onChangeText={text => this.setState({ lastName: text })}
              inputValue={this.props.profile.lastName}
            />
            <InputField
              lang={this.props.lang}
              editable={this.props.profile.email === 'guest@app.com' ? false : true}
              label={Translation.signUp.mobile[this.props.lang]}
              onChangeText={text => this.setState({ mobile: text })}
              inputValue={this.props.profile.mobile}
              keyboardType="numeric"
            />

            <View
              style={{
                // flexDirection: "row",
                marginTop: 50,
                justifyContent: "center",
                alignItems:"center"
              }}
            > 
              <RoundButton
                text={Translation.HomeScreen.update[this.props.lang]}
                style={[
                  styles.buttonStyle,
                  { backgroundColor: "#3f8ca1", borderColor: "transparent",height:50 }
                ]}
                disabled={this.props.profile.email === 'guest@app.com'}
                textColor="#fff"
                fontSize={20}
                onPress={() => {
                  const { firstName, mobile, lastName } = this.props.profile;
                  const data = {
                    firstName: this.state.firstName || firstName,
                    mobile: this.state.mobile || mobile,
                    lastName: this.state.lastName || lastName,
                  }
                  this.props.actions.updateUser(data);
                  this.props.actions.updateUserProfile(data);
                  // this.props.navigation.navigate('Home')
                }}
              />
            </View>
          </KeyboardAvoidingView>
          {
            this.props.profile.email !== 'guest@app.com' && 
            <RoundButton
            text={Translation.HomeScreen.logout[this.props.lang]}
            style={[
              styles.buttonStyle,
              { 
                backgroundColor: "#E13438",
                borderColor: "transparent",
                height:50,
                alignSelf: 'center'
              }
            ]}
            textColor="#fff"
            fontSize={20}
            onPress={() => {
              this.props.actions.userLogout((err, res) => {
                if (!err) {
                  console.log("User Logged Out")
                }
              })
              this.props.navigation.navigate("Language")
            }}
          />
          }
        </ScrollView>
        }
        
          <FooterTab
            onTabPress={(route) =>
              this.setState({
                route: route
              })
            }
            selected={this.state.selected}
            route={this.state.route}
            navigation={this.props.navigation}
          />
        
      </View>
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
  console.log(state.Session.userHasNotification, 'state.Session.userHasNotification');
  return {
    profile: state.Session.currentUser,
    lang: state.Session.language,
    guestAccount: state.Session.guestAccount,
  };
}
function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators(updateProfile, dispatch)
  };
}

export default connect(mapStateToProps, mapActionsToProps)(ProfileScreen);

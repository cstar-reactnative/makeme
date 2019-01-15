import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button,
  Dimensions
} from "react-native";
import { Location, Permissions, Constants, MapView } from "expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as setLocation from "../src/Reducers/Session/Actions";
import axios from "axios";
import Translation from "../assets/translation";
import Heading from "../components/Heading";
import RoundButton from "../components/RoundButton";
import LocationInput from "../components/LocationInput";
import SelectLocation from "../components/SelectLocation";
import Switch from '../components/Switch'

const PAGE = Dimensions.get('window')
class LocationSelection extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    gender: 'male',
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Heading
            imageSource={require("../assets/logo2.png")}
            headingText={Translation.GenderScreen.selectGender[this.props.lang]}
            subheadingText={Translation.GenderScreen.selectGenderInfo[this.props.lang]}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Switch
            lang = {this.props.lang}
            switchGender={flag => {
              this.setState({ gender: flag });
              this.props.actions.setUserGender(flag)
            }}
            gender = {this.state.gender}
          />
          <View style={{ flex: 1, }}/>
          <View style={{ flexDirection: "row", marginBottom: 50, justifyContent: 'center' }}>
          <RoundButton
             text={Translation.profile.back[this.props.lang]}
            style={[styles.buttonStyle, { borderColor: "#000" }]}
            textColor="#000"
            fontSize={20}
            onPress={() => {
              this.props.navigation.goBack()
            }}
          />
          <RoundButton
            text={Translation.Location.next[this.props.lang]}
            style={[
              styles.buttonStyle,
              { backgroundColor: "#3f8ca1", borderColor: "transparent" }
            ]}
            textColor="#fff"
            fontSize={20}
            onPress={() => {
              if (this.props.currentUser.userId) {
                this.props.navigation.navigate("Home")
              } else {
                this.props.navigation.navigate("LogIn")
              }
            }}
          />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: PAGE.height,
    justifyContent: "center",
    
    backgroundColor: "#fff",
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    width: "35%",
    margin: 10,
    borderWidth: 2,
    borderRadius: 40
  },
});

function mapStateToProps(state) {
  return {
    userDetails: state.Session.userSignupForm,
    lang: state.Session.language,
    currentUser: state.Session.currentUser
  };
}
function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators(setLocation, dispatch)
  };
}
export default connect(
  mapStateToProps,
  mapActionsToProps
)(LocationSelection);

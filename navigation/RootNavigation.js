import { Notifications, Location, Permissions  } from "expo";
import React, { Component } from "react";
import { View, ActivityIndicator, Dimensions } from 'react-native';
import firebase from "../src/config/firestoreConfig";
import { StackNavigator } from "react-navigation";
import { AsyncStorage } from 'react-native';
import MainTabNavigator from "./MainTabNavigator";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import registerForPushNotificationsAsync from "../api/registerForPushNotificationsAsync";
import * as Session from '../src/Reducers/Session/Actions'
import { MenuProvider } from "react-native-popup-menu";
const PAGE = Dimensions.get('window');
const db = firebase.firestore();
class RootNavigator extends Component {
  state = {
    loading: true,
    currentUser: null,
  }
  componentWillMount() {
    this._getLocationAsync();
    this.props.actions.getUserFromLocalStorage((err, res) => {
      if (res) {
        const user = JSON.parse(res);
        this.setState({ currentUser: user, loading: false });
      } else {
        this.setState({ loading: false });
      }
    });
  }
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
          if (!currentUser.emailVerified) {
            console.log('not yet verified');
            // currentUser.sendEmailVerification().then(function() {
            //   console.log('hello email verification is sent');
            // }).catch(function(error) {
            //   console.log('err sending verification', error);
            // });
          } else {
            console.log('user is already verified')
          }
        } else {
          console.log('no user is found');
        }
      } else {
        console.log('No user currently logged in')
      }
    });
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    } else {
      let location = await Location.getCurrentPositionAsync({});
      this.props.actions.setCurrentLocationOfUser(location)
      this.props.actions.setLocation(location);
    }
  };
  render() {
    if (this.state.loading && !this.state.currentUser) {
      return (
        <View style={{ zIndex: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute', height: PAGE.height, width: PAGE.width }}>
          <ActivityIndicator size="large" color="lightblue" />
        </View>
      )
    }
    const Layout = MainTabNavigator(this.state.currentUser, this.state.currentUser && this.state.currentUser.userType !== undefined ? this.state.currentUser.userType : false)
    return (
      <MenuProvider>
        <Layout />
      </MenuProvider>
    )
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();
    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = ({ origin, data }) => {
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`
    );
  };
}


function mapActionProps(dispatch) {
  return {
    actions: bindActionCreators(Session, dispatch)
  };
}

export default connect(null, mapActionProps)(RootNavigator);

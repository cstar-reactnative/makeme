import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  Alert,
  StyleSheet,
  FlatList,
  Modal,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import { NavigationActions } from 'react-navigation'
import { Constants } from "expo";
import { MaterialIcons } from "@expo/vector-icons";
import ModalSelector from "react-native-modal-selector";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as cartAction from "../src/Reducers/Session/Actions";
import FooterTab from "../components/FooterTab";
import CheckoutCard from "../components/CheckoutCard";
import CategoryBox from "../components/CategoryBox";
import RoundButton from "../components/RoundButton";
import Translation from '../assets/translation';
import moment from "moment/min/moment-with-locales";


class CheckoutScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    userType: "user",
    selected: 3,
    route: "",
    notif: true,
    dropCalendar: false
  };

  grandTotal() {
    let grandTotal = 0;
    this.props.cartList.forEach(i => (grandTotal += parseInt(i.price)));
    return grandTotal;
  }

  componentDidUpdate() {
    if (this.props.cartList.length === 0) {
      this.props.navigation.goBack();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.total}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{Translation.booking.checkout[this.props.lang]}</Text>
        </View>
        <ScrollView contentContainerStyle={{ backgroundColor: "whitesmoke" }}>
          <View>
            {this.props.cartList.map((item, key) => {
              return (
                <View key={key} style={{ marginVertical: 5 }}>
                  <CheckoutCard
                    lang={this.props.lang}
                    name={item.name}
                    service={item.service}
                    date={this.props.lang === 'en' ? moment(item.date).format('LL') : moment(item.date).locale('ar-sa').format('LL')}
                    servicePrice={item.price}
                    schedule={this.props.lang === 'en' ? moment(item.schedule,"hh:mm a").format('hh mm a') : moment(item.schedule,"hh:mm a").locale('ar-sa').format('hh mm a')}
                    serviceOffered={item.serviceOffered}
                    teamMember={item.teamMember}
                    location={item.location}
                    serviceProvider={item.name}
                    onSelect={option => alert(`${option} selected`)}
                    status={item.status}
                    removeOnPress={() => {
                      this.props.actions.removeBookings(item.serviceOffered);
                    }}
                  />
                </View>
              );
            })}
            {/* <FlatList
              data={this.props.cart}
              extraData={this.props.cart}
              renderItem={({ item, index }) => (
                <View style={{ marginVertical: 5 }}>
                  <CheckoutCard
                    name={item.name}
                    service={item.service}
                    date={item.date}
                    servicePrice={item.price}
                    schedule={item.schedule}
                    serviceOffered={item.serviceOffered}
                    teamMember={item.teamMember}
                    location={item.location}
                    serviceProvider={item.name}
                    onSelect={option => alert(`${option} selected`)}
                    status={item.status}
                    removeOnPress={() => {
                      this.props.actions.removeItemFromCart(item.id)
                    }}
                  />
                </View>
              )}
              keyExtractor={(item, i) => i.toString()}
            /> */}
          </View>
          <View style={styles.total}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{this.grandTotal()} {Translation.profile.sar[this.props.lang]}</Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{Translation.booking.total[this.props.lang]}</Text>
          </View>
          <View style={{ alignItems: "center", backgroundColor: "#fff" }}>
            <RoundButton
              text={Translation.booking.addMore[this.props.lang]}
              style={[
                styles.buttonStyle,
                { backgroundColor: "#3f8ca1", borderColor: "transparent" }
              ]}
              textColor="#fff"
              fontSize={20}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
            <RoundButton
              text={Translation.booking.checkout[this.props.lang]}
              style={[
                styles.buttonStyle,
                { backgroundColor: "#3f8ca1", borderColor: "transparent" }
              ]}
              textColor="#fff"
              fontSize={20}
              onPress={() => {
                this.props.actions.checkoutSaveToDb(this.props.lang, this.props.cartList, (err, res) => {
                  if (err) {
                    const msg = Translation.booking.cannotProcessRightNow[this.props.lang]
                    Alert.alert('Oops !', msg);
                  } else {
                    this.props.navigation.dispatch(NavigationActions.reset(
                      {
                         index: 0,
                         key: null,
                         actions: [
                           NavigationActions.navigate({ routeName: 'Venues'})
                         ]
                      })
                    )
                  }
                })
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
    justifyContent: "space-between"
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 40
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: "50%",
    margin: 10,
    borderWidth: 2,
    borderRadius: 40,
    borderColor: "#3f8ca1"
  }
});

function mapStateToProps(state) {
  const { selectedVenue } = state.Session;
  const { venuesFromDB } = state.Venues;
  const currentVenue = venuesFromDB.find( i => i.id === selectedVenue);
  return {
    cartList: state.Session.userCurrentServicesCart,
    venue: state.Session.selectedVenueName,
    email: state.Session.userSignupForm,
    lang: state.Session.language,
    currentVenue
  };
}
function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators(cartAction, dispatch)
  };
}
export default connect(mapStateToProps, mapActionsToProps)(CheckoutScreen);

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button
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
class LocationSelection extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    cities: [
      "First City",
      "Second City",
      "Third City",
      "Fourth City",
      "Fifth City"
    ],
    selectedCity: "Select City",
    streets: [
      "1st Street, Unit 5",
      "2nd Street, Unit 9",
      "3rd Street, Unit 10",
      "4th Street, Unit 17",
      "5th Street, Unit 11",
      "6th Street, Unit 4",
      "7th Street, Unit 2"
    ],
    selectedStreet: "Select Street",
    mapLocation: "",
    location: {
      coords: {
        latitude: 24.7231717,
        longitude: 46.7775935
      }
    },
    marker: {
      latitude: 24.7231717,
      longitude: 46.7775935
    },
    address: "",
    modalVisible: false,
    selectLocationModal: false
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      const msg = this.props.lang==="en"?"Permission to access location was denied":"تم رفض الإذن للوصول إلى الموقع"
      alert(msg);
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    });
    this.setState({ location });
    this.props.actions.setLocation(location.coords);
    this.getAddress();
  };

  setAddress(latitude, longitude) {
    var _ = {};
    _ = this;
    var newCords = {}
    newCords.latitude = latitude;
    newCords.longitude = longitude;
    console.log(newCords)
    _.props.actions.setLocation(newCords);
    var address = "";
    var scheme = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
    var url =
      scheme +
      latitude +
      "," +
      longitude +
      "&key=AIzaSyDoTmk1jktr-iDOEXk_0RxopsF-5e4MuvY&result_type=sublocality";
    axios
      .get(url)
      .then(function(response) {
        if (response.data.results)
          var value = response.data.results[0].formatted_address;
        _.props.actions.setAddress(value);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getAddress() {
    const { latitude, longitude } = this.state.location.coords;
    var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAcHgSIDeupIsGsuYBB74KWP_WinNOb7fY`;
    axios
      .get(url)
      .then(response => {
        const { data } = response;
        if (data.results.length > 0) {
          const { results } = data;
          this.setState({ loading: false }, () => {
            const data = {
              address: results[0].formatted_address,
              geoLocation: results[0].geometry.location
            };
            this.props.actions.setLocation({
              coords: {
                latitude: data.geoLocation.lat,
                longitude: data.geoLocation.lng
              }
            });
            this.setState({ address: data.address });
          });
        } else {
          this.setState({ loading: false });
        }
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  }

  openModal() {
    this.setState({ modalVisible: true });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  openModalLocationMap() {
    this.setState({ selectLocationModal: true });
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Heading
            imageSource={require("../assets/logo2.png")}
            headingText={Translation.Location.title[this.props.lang]}
            subheadingText={Translation.Location.subheading[this.props.lang]}
          />
        </View>
        <View style={{ width: "100%", marginTop: 20 }}>
          <LocationInput
            lang={this.props.lang}
            text={this.state.address}
            mapLocation={() => this.openModalLocationMap()}
          />
          <SelectLocation
          currentLocation={this.state.location.coords}
            visible={this.state.selectLocationModal}
            closeModal={() => {
              this.setState({ selectLocationModal: false });
            }}
            onGetValue={result => {
              this.props.actions.setLocation({
                coords: {
                  latitude: result.geoLocation.lat,
                  longitude: result.geoLocation.lng
                }
              });
              this.setState({
                address: result.address,
                selectLocationModal: false,
                geoLocation: result.geoLocation
              });
            }}
          />
        </View>
        <View style={{ flexDirection: "row", marginTop: 50 }}>
          <RoundButton
            text={Translation.Location.skip[this.props.lang]}
            style={[styles.buttonStyle, { borderColor: "#000" }]}
            textColor="#000"
            fontSize={20}
            onPress={() => this.props.navigation.navigate("GenderScreen")}
          />
          <RoundButton
            text={Translation.Location.next[this.props.lang]}
            style={[
              styles.buttonStyle,
              { backgroundColor: "#3f8ca1", borderColor: "transparent" }
            ]}
            textColor="#fff"
            fontSize={20}
            onPress={() => this.props.navigation.navigate("GenderScreen")}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15
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
  cancel: {
    height: 50,
    width: "40%",
    backgroundColor: "#ECEFF1",
    borderRadius: 40,
    alignItems: "center",
    borderColor: "#CFD8DC",
    borderWidth: 2,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center"
  },
  signup: {
    height: 50,
    width: "40%",
    backgroundColor: "#26ADA3",
    borderColor: "#1E8E92",
    borderRadius: 40,
    alignItems: "center",
    borderWidth: 2,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center"
  },
  map: {
    height: "100%",
    width: "100%",
    borderColor: "#fff",

    shadowOffset: { height: 3 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 2
    // marginBottom: 10
    // justifyContent:'center',
    // alignItems:'center',
    //  marginTop:'10%',
    //  marginLeft:'5%',
  },
  mapOverlay: {
    // width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 30,
    position: "absolute",
    bottom: 20,
    right: "20%",
    zIndex: 10,
    justifyContent: "center",
    shadowOffset: { height: 3 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 2
  },
  mapLocOverlay: {
    // width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 30,
    position: "absolute",
    bottom: 20,
    left: "20%",
    zIndex: 10,
    justifyContent: "center",
    shadowOffset: { height: 3 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 2
  }
});

function mapStateToProps(state) {
  return {
    userDetails: state.Session.userSignupForm,
    lang: state.Session.language
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

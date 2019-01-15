import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity
} from "react-native";
import { Location, Permissions, Constants } from "expo";
import { CheckBox } from "react-native-elements";
import axios from "axios";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import firebase from "../src/config/firestoreConfig";
import * as venueSignUp from "../src/Reducers/Session/Actions";
import MenuHeader from "../components/MenuHeader";
import ProgressDots from "../components/ProgressDots";
import InputField from "../components/InputField";
import LocationInput from "../components/LocationInput";
import CategorySelection from "../components/CategorySelection";
import HeaderImagePicker from "../components/HeaderImagePicker";
import WorkingHours from "../components/WorkingHours";
import RoundButton from "../components/RoundButton";
import ProfileImagePicker from "../components/ProfileImagePicker";
import SelectLocation from "../components/SelectLocation";
import Translation from '../assets/translation';

var GeoPoint = firebase.firestore.GeoPoint;

class RegStepThree extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super();
    this.state = {
      headerImage: props.venueDetails.headerImage && props.venueDetails.headerImage !== undefined ? props.venueDetails.headerImage : null,
      name: props.venueDetails.name && props.venueDetails.name !== undefined ? props.venueDetails.name : "",
      description: props.venueDetails.description && props.venueDetails.description !== undefined ? props.venueDetails.description : "",
      selected: 1,
      categories: props.venueDetails.categories !== undefined && props.venueDetails.categories.length > 0 ? props.venueDetails.categories : [],
      route: "",
      notif: true,
      currentStep: 3,
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      times: [
        "12:00 am",
        "01:00 am",
        "02:00 am",
        "03:00 am",
        "04:00 am",
        "05:00 am",
        "06:00 am",
        "07:00 am",
        "08:00 am",
        "09:00 am",
        "10:00 am",
        "11:00 am",
        "12:00 pm",
        "01:00 pm",
        "02:00 pm",
        "03:00 pm",
        "04:00 pm",
        "05:00 pm",
        "06:00 pm",
        "07:00 pm",
        "08:00 pm",
        "09:00 pm",
        "10:00 pm",
        "11:00 pm"
      ],
      selectedDay: Translation.profile.dayOfWeek[props.lang],
      selectedTime: ["00:00", "00:00"],
      schedules: props.venueDetails.schedules !== undefined && props.venueDetails.schedules.length > 0 ? props.venueDetails.schedules : [],
      thumbnailImages: props.venueDetails.profileImages && props.venueDetails.profileImages !== undefined ? props.venueDetails.profileImages : [],
      location: {
        coords: {
          latitude: 24.7231717,
          longitude: 46.7775935
        }
      },
      marker: null,
      modalVisible: false,
      serviceFor: 'both',
      venueAddress: props.venueDetails.venueAddress !== undefined ? props.venueDetails.venueAddress : "",
      geoLocation: {},
      selectLocationModal: false,
    };
  }

  componentDidMount() {
    if (this.props.venueDetails && this.props.venueDetails.location) {
      const { _lat, _long } = this.props.venueDetails.location
      if (_lat && _long) {
        this.setState({ 
          location: {
            coords: {
              latitude: _lat,
              longitude: _long
            }
          } 
        }, () => {
          this.setAddress(_lat, _long, (res) => {
            if (res !== 'error') {
              this.setState({ venueAddress: res })
            }
          })
        })
      } else {
        this._getLocationAsync();
      }
    } else {
      this._getLocationAsync();
    }
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      alert("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    });
    this.setState({ location });
    this.setAddress(location.coords.latitude,location.coords.longitude, (res) => {
      if (res !== 'error') {
        this.setState({ venueAddress: res })
      }
    })
  };

  setAddress(latitude, longitude, callback) {
    var _ = {};
    _ = this;
    var address = "";
    var url =`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDoTmk1jktr-iDOEXk_0RxopsF-5e4MuvY&result_type=sublocality`;
    axios.get(url).then((response) => {
      if (response.data.results.length > 0) {
        var value = response.data.results[0].formatted_address;
        _.setState({ venueAddress: value });
        callback(value)
      } else {
        callback('error')
      }
    }).catch((error) => {
      callback('error', error)
    });
  }

  onChangeText = (name, value) => {
    this.setState({ [name]: value });
  };

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
      <View style={styles.container}>
        <View>
          <MenuHeader
            lang={this.props.lang}
            headerText={Translation.profile.profile[this.props.lang]}
            cancelButton={() => {
              this.props.navigation.navigate("VenueHome")
            }}
          />
        </View>
          <ProgressDots
            lang={this.props.lang}
            currentStep = {this.state.currentStep}
            onDotPress ={(step)=>{
              this.props.navigation.navigate(`RegStep${step}`)
            }}
          />
        <ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}>
          <View style={{ flex: 1, paddingVertical: 5 }}>
            <TouchableOpacity
              onPress={() => {
                console.log('state', this.state)
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  alignSelf: this.props.lang === "ar" ? "flex-end" : "flex-start",
                  paddingBottom: 5
                }}
              >
                {Translation.profile.venueHeader[this.props.lang]}
              </Text>
            </TouchableOpacity>
            <HeaderImagePicker
              loading={this.state.headerImageLoading}
              image={this.state.headerImage}
              onImagePick={image => {
                this.setState({ headerImageLoading: true }, () => {
                  this.props.actions.uploadImageToFirebase(image, (uri) => {
                    this.setState({ headerImage: uri, headerImageLoading: false })
                  })
                })
              }}
            />
          </View>
          <View style={{ flex: 1, paddingBottom: 10 }}>
            <InputField
              lang={this.props.lang}
              onChangeText={value => {
                this.onChangeText("name", value);
              }}
              inputValue={this.state.name}
              label={Translation.profile.name[this.props.lang]}
            />
            <InputField
              lang={this.props.lang}
              onChangeText={value => {
                this.onChangeText("description", value);
              }}
              inputValue={this.state.description}
              label={Translation.profile.description[this.props.lang]}
            />
            <LocationInput
              lang={this.props.lang}
              text={this.state.venueAddress}
              mapLocation={() => this.openModalLocationMap()}
            />
            <SelectLocation
            currentLocation={this.state.location.coords}
              visible={this.state.selectLocationModal}
              closeModal={() => {
                this.setState({ selectLocationModal: false })
              }}
              onGetValue={(result) => {
                console.log(result)
                this.setState({ venueAddress: result.address, selectLocationModal: false, geoLocation: result.geoLocation })
              }}
            />
          </View>
          <View>
            <Text style={styles.sectionLabel}>{Translation.profile.selectcategories[this.props.lang]}</Text>
            <CategorySelection
              lang={this.props.lang}
              dimension={{ height: 70, width: 70 }}
              currentCategories={this.state.categories}
              registration={true}
              onGetValue={value => {
                if (value) {
                  this.setState({ categories: value }, () => {
                  });
                }
              }}
            />
          </View>
          <View>
            <Text style={styles.sectionLabel}>{Translation.profile.serviceProvidedFor[this.props.lang]}</Text>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <CheckBox
                right
                iconRight
                title={Translation.profile.both[this.props.lang]}
                checked={this.state.serviceFor === "both"}
                onPress={() => this.setState({ serviceFor: "both" })}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checkedColor="lightblue"
                containerStyle={{ backgroundColor: "white", borderWidth: 0, padding: 0, justifyContent: 'center' }}
                textStyle={{ fontSize: 18 }}
              />

              <CheckBox
                right
                iconRight
                title={Translation.profile.female[this.props.lang]}
                checked={this.state.serviceFor === "female"}
                onPress={() => this.setState({ serviceFor: "female" })}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checkedColor="lightblue"
                containerStyle={{ backgroundColor: "white", borderWidth: 0, padding: 0, justifyContent: 'center' }}
                textStyle={{ fontSize: 18 }}
              />
              <CheckBox
                right
                iconRight
                title={Translation.profile.male[this.props.lang]}
                checked={this.state.serviceFor === "male"}
                onPress={() => this.setState({ serviceFor: "male" })}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checkedColor="lightblue"
                containerStyle={{ backgroundColor: "white", borderWidth: 0, padding: 0, justifyContent: 'center' }}
                textStyle={{ fontSize: 18 }}
              />
            </View>
          </View>
          <View style={{ marginVertical: 15 }}>
            <Text style={styles.sectionLabel}>{Translation.profile.featuredImages[this.props.lang]}</Text>
            <ProfileImagePicker
              onThumbPress={index =>
                console.log("thumbnail image tapped, id: ", index)
              }
              thumbnailItems={this.state.thumbnailImages}
              onImagePick={image => {
                this.props.actions.uploadImageToFirebase(image, (uri) => {
                  let arrayHolder = this.state.thumbnailImages.slice();
                  arrayHolder = [...arrayHolder, uri];
                  this.setState({ thumbnailImages: arrayHolder });
                })
              }}
              onDelete={index => {
                let arrayHolder = this.state.thumbnailImages.slice();
                arrayHolder.splice(index, 1);
                this.setState({ thumbnailImages: arrayHolder });
              }}
            />
          </View>
          <View>
            <Text style={styles.sectionLabel}>{Translation.profile.businessHours[this.props.lang]}</Text>
            <WorkingHours
              lang={this.props.lang}
              onTimeEdit={(update, index, openOrClose) => {
                let arrayHolder = this.state.schedules;
                if (openOrClose === "open") arrayHolder[index].open = update;
                if (openOrClose === "close") arrayHolder[index].close = update;
                this.setState({ schedules: arrayHolder });
              }}
              onDayEdit={(update, index) => {
                let arrayHolder = this.state.schedules;
                arrayHolder[index].day = update;
                this.setState({ schedules: arrayHolder });
              }}
              toggleEdit={(index, open, close, day, isEditing) => {
                let updated = this.state.schedules.slice();
                updated[index] = {
                  open: open,
                  close: close,
                  day: day,
                  isEditing: !isEditing
                };
                this.setState({ schedules: updated });
              }}
              onDelete={index => {
                let updated = this.state.schedules;
                updated.splice(index, 1);
                this.setState({ schedules: updated });
              }}
              onAdd={() => {
                if (
                  this.state.selectedTime[0] === "00:00" ||
                  this.state.selectedTime[1] === "00:00" ||
                  this.state.selectedDay === Translation.profile.dayOfWeek[this.props.lang]
                ) {
                  alert("Please fill-out properly");
                  return;
                }

                this.setState({
                  schedules: [
                    ...this.state.schedules,
                    {
                      open: this.state.selectedTime[0],
                      close: this.state.selectedTime[1],
                      day: this.state.selectedDay,
                      isEditing: false
                    }
                  ],
                  selectedDay: Translation.profile.dayOfWeek[this.props.lang],
                  selectedTime: ["00:00", "00:00"]
                });
              }}

              selectedTime={(index)=>this.state.selectedTime[index]}
              schedules={this.state.schedules}
              selectedDay={this.state.selectedDay}
              days={this.state.days}
              times={this.state.times}
              onDaySelect={day => this.setState({ selectedDay: day })}
              onTimeSelect={(index, time) => {
                let arrayHolder = this.state.selectedTime.slice();
                arrayHolder[index] = time;
                this.setState({ selectedTime: arrayHolder });
              }}
            />
          </View>
          <View style={{ flex: 1, paddingTop: 30, paddingBottom: 30 }}>
            <RoundButton
              textColor="black"
              text={Translation.profile.next[this.props.lang]}
              fontSize={20}
              style={{
                alignSelf: "center",
                borderRadius: 30,
                backgroundColor: "white",
                borderWidth: 1,
                height: 60,
                width: 120,
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => {
                let location = {};
                let lat = this.state.location.coords.latitude;
                let lng = this.state.location.coords.longitude;
                if (this.state.geoLocation.lat && this.state.geoLocation.lat) {
                  lat = this.state.geoLocation.lat;
                  lng = this.state.geoLocation.lng;
                }
                location = new GeoPoint(lat, lng);
                const { 
                  headerImage,
                  name,
                  description,
                  thumbnailImages,
                  categories,
                  schedules,
                  serviceFor,
                  venueAddress
                } = this.state;

                const data = {
                  headerImage,
                  name,
                  description,
                  profileImages: thumbnailImages,
                  categories,
                  schedules,
                  serviceFor,
                  location,
                  venueAddress
                };

                if (headerImage && name && description && thumbnailImages.length > 0 && categories.length > 0 && schedules.length > 0 && serviceFor && Object.keys(location).length > 0 ) {
                  this.props.actions.updateCurrentVenue(data, 'firstStep', (err, res) => {
                    if (err) {
                      Alert.alert('Oopsss !', 'Cannot process request right now');
                    } else {
                      this.props.navigation.navigate("RegStep2");
                    }
                  });
                } else {
                  Alert.alert('Oops!', 'All field are required');
                }
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
  sectionLabel: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    paddingTop: 20,
    paddingBottom: 5
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
});


function mapStateToProps(state) {
  return {
    lang: state.Session.language,
    venueDetails: state.Session.currentVenue,
  };
}

function mapActionProps(dispatch) {
  return {
    actions: bindActionCreators(venueSignUp, dispatch)
  };
}

export default connect(mapStateToProps, mapActionProps)(RegStepThree);

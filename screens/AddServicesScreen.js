import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from "react-native";
// import moment from "moment";
import moment from "moment/min/moment-with-locales";
// require('moment/locale/ar.js');
import sift from 'sift';
import { Constants } from "expo";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as bookService from "../src/Reducers/Session/Actions";
import Header from "../components/Header";
import FooterTab from "../components/FooterTab";
import AddServicesList from "../components/AddServicesList";
import AddServiceBtn from "../components/AddServiceBtn";
import CategoryBox from "../components/CategoryBox";
import TimeSlots from "../components/TimeSlots";
import ModalSelector from "react-native-modal-selector";
import { MaterialIcons } from "@expo/vector-icons";
import Translation from '../assets/translation';
import makemeUtil from '../src/lib/makemeutil';

var getInitDates = () => {

  var ddd = Array.from({ length: 20 }, (x, i) => i);
  ddd = ddd.map(d => {
    var da = {};
    da.category = moment()
    .add(d, "days")
    .format("ddd Do MMM");
    da.categoryAr = moment().locale('ar-sa')
    .add(d, "days")
    .format("ddd Do MMM");
    da.dateSelected = moment()
    .add(d, "days")
    .format("LL");
    da.label = moment()
    .add(d, "days")
    .format("ddd");
    da.labelAr = moment().locale('ar-sa')
    .add(d, "days")
    .format("ddd");
    da.date = moment();
    da.selected = false;
    return da;
  });
  return ddd
}

var dates = getInitDates()
class AddServiceScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    modalVisible: false,
    teamMember: "",
    selected: 1,
    route: "",
    notif: true,
    showOptions: false,
    menuSelection: 1,
    days: getInitDates(),
    data: this.props.selectedVenueDetails.servicesOffers,
    currentServiceData: {},
    availability: [],
    timeArray: [],
    error: "",
    teamMemberTime: [],
    indexSelected: null,
    teamAvailability: [],
    selectedDay: null, 
    teamMemberBookings: [],
    teamMembers: [],
    currentTeamMemberId: "",
  };
  

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  checkIfHourIsAlreadyCheck = (item, cart) => {
    res = cart.filter( i => i.schedule === item);
    if (res.length > 0) {
      return true;
    }
    return false;
  }

  getTeamMember(arrayTeam) {
    const teamMembers = [];
    arrayTeam.map(i => {
      const data = {
        label: i.name,
        key: i._id,
        availability: i.availability,
        gender: i.gender,
        name: i.name,
        venueId: i.venueId
      }
      teamMembers.push(data);
    });
    teamMembers.unshift({ label: Translation.forTranslations.bookanyTeamMember[this.props.lang], key: 'GFKV31DL4' })
    this.setState({ teamMembers })
  }

  getTimeArray(timeArray, dateSelected) {
    const booking = this.state.teamMemberBookings.filter(i => i.date === dateSelected);

    timeArray.map((i, index) => {
      if(booking.length > 0) {
        booking.forEach(v => {
          if (i.hourStr === v.schedule) {
            timeArray[index].available = false;
          }
        })
      }
    })
    return timeArray;
  }

  filterAvailableDays(availability) {
    const teamMemberAvailability = [];
    availability.forEach(i => {
      teamMemberAvailability.push(i.dayStr);
    });
    const daysFiltered = sift({ label: { $in: teamMemberAvailability } }, this.state.days);
    this.setState({ days: daysFiltered });

  }

  render() {
    let index = 0;
    const data = this.state.teamMemberTime;
    const servicesList = this.state.data.filter(
      i => i.category === this.props.selectedService
    );
    return (
      <View style={styles.container}>
        <View>
          <Header
            lang={this.props.lang}
            navigation={this.props.navigation}
            backButton={() => {
              this.props.navigation.goBack();
            }}
            filterShow={false}
          />
        </View>
        <AddServicesList
          lang={this.props.lang}
          data={servicesList}
          currentCart={this.props.cart}
          onPress={value => {
            if (this.props.profile.email === 'guest@app.com') {
              Alert.alert(
                Translation.forTranslations.information[this.props.lang],
                Translation.forTranslations.createAccLogMessage[this.props.lang],
                [
                  {text: Translation.forTranslations.askmelater[this.props.lang], onPress: () => console.log('Ask me later pressed')},
                  {
                    text: Translation.forTranslations.createAccountorLogin[this.props.lang],
                    onPress: () => {
                      this.props.navigation.navigate("LogIn");
                      this.props.actions.userLogout((err, res) => {
                        if (res==="success") {
                          // console.warn("Successssss")
                        }
                      });
                    }, 
                    style: 'cancel'
                  },
                ],
                { cancelable: false }
              );
            } else if (!this.props.profile.emailVerified) {
              makemeUtil.emailverification((err, res) => {
                if(res === false) {
                  const title = Translation.newTranslation.oops[this.props.lang];
                  const msg = Translation.newTranslation.needVerificationAlert[this.props.lang]
                  Alert.alert(
                    title,
                    msg
                  )
                } else {
                  this.props.actions.setCurrentUserVerified();
                  const teamMember = sift({ _id: { $in: value.members }}, this.props.currentTeam);
                  this.getTeamMember(teamMember);
                  if (value) {
                    this.setState({
                      currentSelectedService: value,
                      modalVisible: true,
                      currentServiceData: {
                        ...this.state.currentServiceData,
                        serviceOffered: value.serviceName,
                        price: value.price,
                        name: this.props.selectedVenueDetails.name,
                        venueId: this.props.selectedVenueDetails.id,
                        date: new Date(),
                        status: "pending",
                        homeService: value.homeService,
                      }
                    });
                  }
                }
              });
            } else {
              const teamMember = sift({ _id: { $in: value.members }}, this.props.currentTeam);
              this.getTeamMember(teamMember);
              if (value) {
                this.setState({
                  currentSelectedService: value,
                  modalVisible: true,
                  currentServiceData: {
                    ...this.state.currentServiceData,
                    serviceOffered: value.serviceName,
                    price: value.price,
                    name: this.props.selectedVenueDetails.name,
                    venueId: this.props.selectedVenueDetails.id,
                    date: new Date(),
                    status: "pending",
                    homeService: value.homeService,
                  }
                });
              }
            }
          }}
        />
        <View style={styles.columnTwo}>
          <View style={styles.columnTwoFirstRow}>
            <AddServiceBtn
              lang={this.props.lang}
              disabled={this.props.cart.length ? false : true}
              navigation={this.props.navigation}
              total={this.props.cart.length}
            />
          </View>
        </View>
        <View>
          <FooterTab
            needToReset={true}
            onTabPress={(tabId, route) =>
              this.setState({
                selected: tabId,
                route: route
              })
            }
            selected={this.state.selected}
            route={this.state.route}
            navigation={this.props.navigation}
          />
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            // alert("Modal has been closed.");
          }}
        >
          <View style={{ flex: 1, backgroundColor: "rgba(52, 52, 52, 0.4)" }}>
            <View
              style={{
                backgroundColor: "#fff",
                justifyContent: "flex-start",
                alignItems: "center",
                borderRadius: 2,
                shadowRadius: 10,
                height: "100%",
                width: "100%",
                paddingTop: "8%"
              }}
            >
            
              <TouchableOpacity
                style={{ marginTop: "0%", marginLeft: "88%" }}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                  this.setState({
                    currentServiceData: {},
                    timeArray: [],
                    indexSelected: null,
                    days: getInitDates(),
                    error: ""
                  });
                }}
              >
                <MaterialIcons name="close" size={40} color="red" />
              </TouchableOpacity>

              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold"
                }}
              >
                {
                  this.state.currentSelectedService &&
                    this.state.currentSelectedService.name
                }
              </Text>
              <Text style={{ marginTop: "10%", paddingBottom: 10 }}>
                {Translation.booking.selectTeamMember[this.props.lang]}
              </Text>
              <ModalSelector
                data={this.state.teamMembers}
                initValue={Translation.booking.selectTeamMember[this.props.lang]}
                onChange={option => {
                  if (option.label === 'Book any team member' || option.label === 'احجز أي عضو بالفريق') {
                    this.setState({
                      teamMember: 'Any team member',
                      days: getInitDates(),
                      availability: this.props.venueBookingSchedule[0].availability,
                      timeArray: [],
                      teamMemberBookings: [], 
                      currentServiceData: {
                        ...this.state.currentServiceData,
                        teamMember: option.label,
                        teamMemberId: option.key
                      }
                    }, () => {
                      this.filterAvailableDays(this.props.venueBookingSchedule[0].availability);
                    });
                  } else {
                    const result = this.props.currentTeam.find(i => i.id === option.key);
                    this.props.actions.getTeamMemberBookings(option.key, (res) => {
                      this.setState({ teamMemberBookings: res });
                    });
                    this.setState({
                      teamMember: `${option.label}`,
                      currentTeamMemberId: `${option.key}`,
                      availability: option.availability,
                      days: getInitDates(),
                      timeArray: [],
                      currentServiceData: {
                        ...this.state.currentServiceData,
                        teamMember: option.label,
                        teamMemberId: option.key
                      }
                    }, () => {
                      this.filterAvailableDays(option.availability);
                    });
                  }
                }}
              />
              <Text style={{ marginTop: "5%" }}>{Translation.booking.selectDate[this.props.lang]}</Text>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scroll}
                horizontal={true}
              >
                {this.state.days.map((item, index) => {
                  return (
                    <TouchableOpacity
                      disabled={
                        this.state.currentServiceData.teamMember ? false : true
                      }
                      key={index}
                      onPress={() => {
                        const timeBookedForTheDay = [];
                        timeCheckForCart = this.props.cart.forEach( i => {
                          if (i.teamMemberId === this.state.currentTeamMemberId && i.date.toString() === item.dateSelected.toString()) {
                            timeBookedForTheDay.push(i.schedule.toString());
                          }
                        });
                        
                        getTimeBooked = this.state.teamMemberBookings.forEach( i => { 
                          if (i.date.toString() === item.dateSelected.toString()) {
                            timeBookedForTheDay.push(i.schedule);
                          };
                        })

                        const result = this.state.availability.find(
                          i => i.dayStr === item.label
                        );

                        let { hours } = result;
                        
                        hoursParse = JSON.parse(JSON.stringify(hours))
                        
                        if (timeBookedForTheDay.length > 0) {
                          timeBookedForTheDay.forEach( i => {
                            hoursParse.map( (hour, index) => {
                              if (hour.hourStr.toString() === i.toString()) {
                                hoursParse[index].available = false;
                              }
                            })
                          });
                          this.setState({ timeArray: hoursParse });
                        } else {
                          hours.map( (item, index) => {
                            hours[index].available = true;
                          })
                          this.setState({ timeArray: hours });
                        }
                        let arrayHolder = this.state.days.slice();
                        arrayHolder.map(day => (day.selected = false));
                        arrayHolder[index].selected = !item.selected;
                        if (arrayHolder[index].selected) {
                          this.setState({
                            indexSelected: null,
                            currentServiceData: {
                              ...this.state.currentServiceData,
                              date: item.dateSelected,
                            }
                          });
                        }
                      }}
                    >
                      <CategoryBox
                        boxLabel={this.props.lang === 'en' ? item.category : item.categoryAr}
                        disabled={
                          this.state.currentServiceData.teamMember
                            ? false
                            : true
                        }
                        dimension={{ height: 70, width: 70 }}
                        selected={this.state.days[index].selected}
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
              <Text style={{ marginTop: 0 }}>{Translation.booking.selectTime[this.props.lang]}</Text>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scroll}
                horizontal={true}
              >
                {this.state.timeArray.length > 0 ? (
                  this.state.timeArray.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        disabled={this.state.teamMember === 'Any team member' ? false : item.available ? false : true}
                        onPress={() => {
                          let arrayHolder = this.state.timeArray.slice();
                          arrayHolder.map(time => (time.selected = false));
                          arrayHolder[index].selected = !item.selected;
                          if (arrayHolder[index].selected) {
                            this.setState({
                              currentServiceData: {
                                ...this.state.currentServiceData,
                                schedule: item.hourStr
                              }
                            });
                          }
                          this.setState({ indexSelected: index });
                        }}
                      >
                        <TimeSlots
                          available={item.available}
                          boxLabel={this.props.lang === 'en' ? item.hourStr : item.hourStrAr}
                          selected={this.state.indexSelected === index}
                          dimension={{ height: 70, width: 70 }}
                          status={item.status}
                        />
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <Text style={{ fontSize: 13, color: 'red', marginTop: 10, fontWeight: '500', padding: 10 }}>
                    {Translation.newTranslation.alertForBooking[this.props.lang]}
                  </Text>
                )}
              </ScrollView>
              {this.state.error === "" ? null : (
                <Text style={{ color: "red" }}>{this.state.error}</Text>
              )}
              <View style={styles.modalBtnContainer}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#517fa4",
                    borderRadius: 20,
                    marginTop: 14,
                    padding: 10
                  }}
                  onPress={() => {
                    if (
                      this.state.currentServiceData.date &&
                      this.state.currentServiceData.teamMember &&
                      this.state.currentServiceData.schedule
                    ) {
                      let result = this.state.data;
                      this.state.data.map((item, index) => {
                        if (item.id === this.state.currentServiceData.id) {
                          result[index].selected = true;
                        }
                      });
                      const venue = this.props.selectedVenueDetails
                      let booking = this.state.currentServiceData;
                      booking.venueAddress = venue.venueAddress;
                      booking.location = venue.location;
                      this.props.actions.saveToBookings(
                        booking
                      );
                      this.setModalVisible(!this.state.modalVisible);
                      this.setState({
                        currentServiceData: {},
                        timeArray: [],
                        availability: [],
                        indexSelected: null,
                        data: this.props.selectedVenueDetails.servicesOffers,
                        teamMemberTime: this.props.teamMemberTime,
                        error: "",
                        days: getInitDates()
                      });
                    } else {
                      this.setState({
                        error: Translation.booking.pleseSelectAll[this.props.lang]
                      });
                    }
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      paddingRight: 12,
                      paddingLeft: 12
                    }}
                  >
                    {Translation.booking.addService[this.props.lang]}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  columnTwo: {
    flex: 1
  },
  columnTwoFirstRow: {
    flex: 1,
    // backgroundColor:"red",

    flexDirection: "row",
    alignItems: "flex-end"
  }
});

function mapStateToProps(state) {
  var venues = state.Venues.venues;
  var venuesFromDB = state.Venues.venuesFromDB;
  var venue = venuesFromDB.find(f => {
    return f.id == state.Session.selectedVenue;
  });
  return {
    lang: state.Session.language,
    selectedService: state.Session.selectedService,
    selectedVenueDetails: venue,
    cart: state.Session.userCurrentServicesCart,
    venuesFromDB,
    profile: state.Session.currentUser,
    currentTeam: state.Session.currentTeamMembers,
    venueBookingSchedule: state.Session.venueBookingSchedule
  };
}
function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators(bookService, dispatch)
  };
}

export default connect(mapStateToProps, mapActionsToProps)(AddServiceScreen);

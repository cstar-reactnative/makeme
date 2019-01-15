import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions
} from "react-native";
import { Constants } from "expo";
import {
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import ModalSelector from "react-native-modal-selector";
// import moment from "moment";
import moment from "moment/min/moment-with-locales";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as setLocation from "../src/Reducers/Session/Actions";

import DateSelection from "../components/DateSelection";
import VenueFooter from "../components/VenueFooter";
import BookDetails from "../components/BookDetails";
import CategoryBox from "../components/CategoryBox";
import Translation from "../assets/translation";
import Heading from "../components/Heading";
import CheckoutLibrary from "../src/lib/checkOutLibrary";
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
};

var dates = getInitDates();

const PAGE = Dimensions.get("window");
class VenueBooking extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    userType: "owner",
    selected: 3,
    route: "",
    notif: true,
    dropCalendar: false,
    days: getInitDates(),
    dropSearchBar: false,
    searchValue: "",
    modalVisible: false,
    modalVisible2: false,
    bookings: [],
    time: [],
    teamMembers: [],
    teamMemberBookings: [],
    currentServiceData: {
      status: "pending",
      price: "cash",
      serviceOffered: "Walk in client",
      venueId: this.props.venueDetails.id,
      name: this.props.venueDetails.name
    },
    currentDateFilter: null,
    selectedDate: moment(Date.now()).format("ll"),
    language: this.props.lang
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  componentDidMount() {
    this.props.actions.getTeamMembers(res => {});
    this.props.actions.getVenueBookings((err, res) => {
      if (err) {
        console.log("err", err);
      } else {
        this.setState({ bookings: res });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lang !== nextProps.lang) {
      console.log("NEW PROPS", nextProps.lang);
      this.setState({ language: nextProps.lang });
    }
  }

  mapTeamMember(arrayTeam) {
    const teamMembers = [];
    arrayTeam.map(i => {
      const data = {
        label: i.name,
        key: i._id,
        availability: i.availability,
        gender: i.gender,
        name: i.name,
        venueId: i.venueId
      };
      teamMembers.push(data);
    });
    this.setState({ teamMembers });
  }

  getTimeArray(timeArray, dateSelected) {
    const booking = this.state.teamMemberBookings.filter(
      i => i.date === dateSelected
    );

    timeArray.map((i, index) => {
      if (booking.length > 0) {
        booking.forEach(v => {
          if (i.hourStr === v.schedule) {
            timeArray[index].available = false;
          }
        });
      }
    });
    return timeArray;
  }

  setModalVisible2(visible) {
    this.setState({ modalVisible2: visible });
  }

  getMarkedDates() {
    let a = {};
    this.state.bookings.forEach(
      i =>
        (a = {
          ...a,
          [moment(i.date).format("YYYY-MM-DD")]: {
            selected: true,
            selectedColor: "#2196F3"
          }
        })
    );
    return a;
  }

  modal() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible2}
        onRequestClose={() => {
          alert("Modal has been closed.");
        }}
      >
        <View
          style={{
            marginTop: 30,
            padding:10,
            flex: 1,
            justifyContent: "center",
            backgroundColor: "white"
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible2(!this.state.modalVisible2);
            }}>
          <View>
            <Entypo name="cross" size={40} color="red"/>
          </View>
          </TouchableOpacity>
          {this.state.currentBooking && (
            <View
              style={{
                backgroundColor: "white",
                width: PAGE.width,
                alignSelf: "center",
                flex: 1,
                paddingLeft: 10,
                justifyContent: "center",
                paddingRight: 10
              }}
            >
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: "600",
                  alignSelf: "center",
                  paddingBottom: 10
                }}
              >
                {
                  Translation.forTranslations.bookingDetails[
                    this.state.language
                  ]
                }
              </Text>
              <View
                style={{
                  flexDirection:
                    this.props.lang === "ar" ? "row-reverse" : "row"
                }}
              >
                <MaterialIcons name="store" size={30} />
                <Text
                  style={{ fontSize: 20, alignSelf: "center", marginLeft: 10 }}
                >
                  {this.state.currentBooking.name}
                </Text>
              </View>
              <View
                style={{
                  flexDirection:
                    this.props.lang === "ar" ? "row-reverse" : "row"
                }}
              >
                <Entypo name="price-tag" size={30} />
                <Text
                  style={{ fontSize: 20, alignSelf: "center", marginLeft: 10 }}
                >
                  {this.state.currentBooking.price} SAR
                </Text>
              </View>
              <View
                style={{
                  flexDirection:
                    this.props.lang === "ar" ? "row-reverse" : "row"
                }}
              >
                <MaterialIcons name="date-range" size={30} />
                <Text
                  style={{ fontSize: 20, alignSelf: "center", marginLeft: 10 }}
                >
                {/* {`${this.state.currentBooking.date} - ${
                  this.state.currentBooking.schedule
                }`} */}
                 {this.state.language === 'en' ? moment(this.state.currentBooking.date).format('LL') : moment(this.state.currentBooking.date).locale('ar-sa').format('LL')} {" - "} 
                 {this.state.language === 'en' ? moment(this.state.currentBooking.schedule,"hh:mm a").format('hh mm a') : moment(this.state.currentBooking.schedule,"hh:mm a").locale('ar-sa').format('hh mm a')}
                </Text>
               
              </View>
              <View
                style={{
                  flexDirection:
                    this.props.lang === "ar" ? "row-reverse" : "row"
                }}
              >
                <Entypo name="user" size={30} />
                <Text
                  style={{ fontSize: 20, alignSelf: "center", marginLeft: 10 }}
                >{`${this.state.currentBooking.teamMember}`==="Book any team member"?this.props.lang === "ar" ? "أي عضو في الفريق" : "AnyTeamMember":`${this.state.currentBooking.teamMember}`}</Text>
              </View>
              <View
                style={{
                  flexDirection:
                    this.props.lang === "ar" ? "row-reverse" : "row"
                }}
              >
                <MaterialCommunityIcons name="human-greeting" size={30} />
                <Text
                  style={{ fontSize: 20, alignSelf: "center", marginLeft: 10 }}
                >{`${this.state.currentBooking.serviceOffered}`}</Text>
              </View>
              {this.state.currentBooking.status === "pending" && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "limegreen",
                      padding: 8,
                      justifyContent: "center",
                      alignItems: "center",
                      width: 120,
                      borderRadius: 20,
                      alignSelf: "center"
                    }}
                    onPress={() => {
                      Alert.alert(
                        "Information",
                        `Are you sure you want to accept booking ?`,
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          {
                            text: "OK",
                            onPress: () => {
                              CheckoutLibrary.updateBooking(
                                this.props.lang,
                                this.state.currentBooking,
                                "accepted",
                                "businessOwner"
                              );
                              this.setModalVisible2(!this.state.modalVisible2);
                            }
                          }
                        ],
                        { cancelable: false }
                      );
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "600" }}>
                      {Translation.newTranslation.accept[this.state.language]}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "tomato",
                      padding: 8,
                      justifyContent: "center",
                      alignItems: "center",
                      width: 120,
                      borderRadius: 20,
                      alignSelf: "center"
                    }}
                    onPress={() => {
                      Alert.alert(
                        "Information",
                        `Are you sure you want to reject booking ?`,
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          {
                            text: "OK",
                            onPress: () => {
                              CheckoutLibrary.updateBooking(
                                this.props.lang,
                                this.state.currentBooking,
                                "rejected",
                                "businessOwner"
                              );
                              this.setModalVisible2(!this.state.modalVisible2);
                            }
                          }
                        ],
                        { cancelable: false }
                      );
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "600" }}>
                      {Translation.newTranslation.reject[this.state.language]}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </View>
      </Modal>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.modal()}
        <View style={{ zIndex: 100 }}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert("Modal has been closed.");
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
                    this.setState(
                      {
                        currentServiceData: {
                          status: "pending",
                          serviceOffered: "Walk in client",
                          venueId: this.props.venueDetails.id,
                          name: this.props.venueDetails.name
                        },
                        teamMemberBookings: [],
                        time: [],
                        days: getInitDates()
                      },
                      () => {
                        this.setModalVisible(!this.state.modalVisible);
                      }
                    );
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
                    Translation.forTranslations.walkinClient[
                      this.state.language
                    ]
                  }
                </Text>
                <Text style={{ marginTop: "10%", paddingBottom: 10 }}>
                  {Translation.ownerHome.selectTeamMember[this.state.language]}
                </Text>
                <ModalSelector
                  data={this.state.teamMembers}
                  initValue={
                    Translation.ownerHome.selectTeamMember[this.state.language]
                  }
                  onChange={option => {
                    this.setState({
                      teamMember: `${option.label}`,
                      availability: option.availability,
                      days: getInitDates(),
                      timeArray: [],
                      currentServiceData: {
                        ...this.state.currentServiceData,
                        teamMember: option.label,
                        teamMemberId: option.key
                      }
                    });
                    this.props.actions.getTeamMemberBookings(
                      option.key,
                      res => {
                        this.setState({ teamMemberBookings: res });
                      }
                    );
                    this.setState({ teamMember: `${option.label}` });
                  }}
                />
                <Text style={{ marginTop: "5%" }}>
                  {Translation.ownerHome.selectDate[this.state.language]}
                </Text>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.scroll}
                  horizontal={true}
                >
                  {this.state.days.map((item, index) => {
                    return (
                      <TouchableOpacity
                        disabled={!this.state.teamMember}
                        key={index}
                        onPress={() => {
                          const result = this.state.availability.filter(
                            i => i.dayStr === item.label
                          );
                          if (result.length > 0) {
                            this.setState({
                              time: this.getTimeArray(
                                result[0].hours,
                                item.dateSelected
                              )
                            });
                          } else {
                            this.setState({ time: [] });
                          }
                          let arrayHolder = this.state.days.slice();
                          arrayHolder.map(day => (day.selected = false));
                          arrayHolder[index].selected = !item.selected;
                          if (arrayHolder[index].selected) {
                            this.setState({
                              currentServiceData: {
                                ...this.state.currentServiceData,
                                date: item.dateSelected
                              }
                            });
                          }
                          this.setState({ days: arrayHolder });
                        }}
                      >
                        <CategoryBox
                          boxLabel={this.props.lang === 'en' ? item.category : item.categoryAr}
                          disabled={!this.state.teamMember}
                          dimension={{ height: 70, width: 70 }}
                          selected={this.state.days[index].selected}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
                <Text style={{ marginTop: 0 }}>
                  {Translation.ownerHome.selectTime[this.state.language]}
                </Text>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.scroll}
                  horizontal={true}
                >
                  {this.state.time.length > 0 ? (
                    this.state.time.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          disabled={!item.available}
                          onPress={() => {
                            this.setState({
                              itemSelected: index,
                              currentServiceData: {
                                ...this.state.currentServiceData,
                                schedule: item.hourStr
                              }
                            });
                          }}
                        >
                          <CategoryBox
                            userType={"businessOwner"}
                            available={item.available}
                            boxLabel={this.props.lang === 'en' ? item.hourStr : item.hourStrAr}
                            selected={this.state.itemSelected === index}
                            dimension={{ height: 70, width: 70 }}
                          />
                        </TouchableOpacity>
                      );
                    })
                  ) : (
                    <Text style={{ fontSize: 15, color: "red" }}>
                      {
                        Translation.booking.memberNotAvailable[
                          this.state.language
                        ]
                      }
                    </Text>
                  )}
                </ScrollView>
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
                        this.state.currentServiceData.schedule &&
                        this.state.currentServiceData.teamMember
                      ) {
                        this.props.actions.checkoutSaveToDb(this.props.lang,
                          [this.state.currentServiceData],
                          (err, res) => {
                            this.setState(
                              {
                                currentServiceData: {
                                  status: "pending",
                                  serviceOffered: "Walk in client",
                                  venueId: this.props.venueDetails.id,
                                  name: this.props.venueDetails.name
                                },
                                teamMemberBookings: [],
                                time: [],
                                days: getInitDates()
                              },
                              () => {
                                this.setModalVisible(!this.state.modalVisible);
                              }
                            );
                          }
                        );
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
                      {
                        Translation.forTranslations.bookTeamMember[
                          this.state.language
                        ]
                      }
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <DateSelection
            lang={this.state.language}
            userType={this.state.userType}
            onAddPress={() => {
              this.setState(
                {
                  itemSelected: null
                },
                () => {
                  this.mapTeamMember(this.props.teamMembers);
                  this.setModalVisible(true);
                }
              );
            }}
            searchValue={this.state.searchValue}
            onChangeText={text => {
              this.setState({ searchValue: text });
            }}
            dropSearchBar={this.state.dropSearchBar}
            onFilter={() =>
              this.setState({ dropSearchBar: !this.state.dropSearchBar })
            }
            notif={this.state.notif}
            showRefreshIcon={
              this.state.currentDateFilter === null ? false : true
            }
            onResetPress={() => {
              this.setState({ currentDateFilter: null });
            }}
            onCalendarPress={() =>
              this.setState({ dropCalendar: !this.state.dropCalendar })
            }
            markedDates={this.getMarkedDates()}
            dropCalendar={this.state.dropCalendar}
            currentSelectedMarked={{
              [this.state.selectedDate.toString()]: {
                selected: true,
                marked: true,
                selectedColor: "lightblue"
              }
            }}
            dateOnGetValue={(date, dateString) => {
              this.setState({
                currentDateFilter: date,
                selectedDate: dateString,
                dropCalendar: !this.state.dropCalendar
              });
            }}
          />
        </View>
        {this.state.bookings.length > 0 ? (
          <ScrollView contentContainerStyle={{ backgroundColor: "whitesmoke" }}>
            <View>
              <FlatList
                keyExtractor={item => {
                  return item.id;
                }}
                extraData={this.state.language}
                data={(() => {
                  if (this.state.currentDateFilter) {
                    const bookings = this.state.bookings.filter(i => {
                      return (
                        moment(i.date)
                          .format("ll")
                          .toString() ===
                        moment(this.state.currentDateFilter)
                          .format("ll")
                          .toString()
                      );
                    });
                    const sorted = bookings.sort(function compare(a, b) {
                      var dateA = new Date(a.date);
                      var dateB = new Date(b.date);
                      return dateA - dateB;
                    });
                    return sorted;
                  } else {
                    const sorted = this.state.bookings.sort(function compare(
                      a,
                      b
                    ) {
                      var dateA = new Date(a.date);
                      var dateB = new Date(b.date);
                      return dateA - dateB;
                    });

                    if(this.state.searchValue!="")
                    {
                      sorted = sorted.filter((f)=>{return f.teamMember.toLowerCase()
                        .indexOf(this.state.searchValue.toLowerCase()) > -1})
                    }
                    return sorted;
                  }
                })()}
                renderItem={({ item, index }) => (
                  <View style={{ marginVertical: 5 }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ currentBooking: item });
                        this.setModalVisible2(true);
                      }}
                    >
                      <BookDetails
                        venueOwner={true}
                        lang={this.state.language}
                        name={item.name}
                        service={item.service}
                        date={this.state.language === 'en' ? moment(item.date).format('LL') : moment(item.date).locale('ar-sa').format('LL')}
                        userType={"businessOwner"}
                        servicePrice={item.price}
                        schedule={this.state.language === 'en' ? moment(item.schedule,"hh:mm a").format('hh mm a') : moment(item.schedule,"hh:mm a").locale('ar-sa').format('hh mm a')}
                        serviceOffered={item.serviceOffered}
                        teamMember={item.teamMember}
                        location={item.location}
                        firstName={item.firstName}
                        mobile={item.mobile}
                        serviceProvider={item.name}
                        onSelect={option => {
                          if (option === "accepted") {
                            CheckoutLibrary.updateBooking(
                              this.props.lang,
                              item,
                              "accepted",
                              "businessOwner"
                            );
                          } else if (option === "reject") {
                            CheckoutLibrary.updateBooking(
                              this.props.lang,
                              item,
                              "rejected",
                              "businessOwner"
                            );
                          }
                        }}
                        status={item.status}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "whitesmoke"
            }}
          >
            <Heading
              headingText={
                Translation.emptyContainersMessages.reservation[
                  this.state.language
                ]
              }
              subheadingText={
                Translation.emptyContainersMessages.reservationSub[
                  this.state.language
                ]
              }
            />
          </View>
        )}
        <View>
          <VenueFooter
            onTabPress={(tabId, route) => {
              this.setState({
                selected: tabId,
                route: route
              });
            }}
            selected={3}
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
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
    justifyContent: "space-between"
  }
});

function mapStateToProps(state) {
  console.log("state.session", state.Session);
  return {
    lang: state.Session.language,
    bookedServices: state.Reservations.bookedServices,
    teamMembers: state.Session.currentTeamMembers,
    venueDetails: state.Session.currentVenue
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
)(VenueBooking);

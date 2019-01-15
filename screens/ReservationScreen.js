import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Dimensions,
  Linking
} from "react-native";
import { Constants } from "expo";
import {
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import ModalSelector from "react-native-modal-selector";
import BookingEditModal from "../components/BookingEditModal";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Reservations from "../src/Reducers/Session/Actions";
// import moment from "moment";
import moment from "moment/min/moment-with-locales";

import CheckoutLibrary from "../src/lib/checkOutLibrary";
import DateSelection from "../components/DateSelection";
import FooterTab from "../components/FooterTab";
import BookDetails from "../components/BookDetails";
import Heading from "../components/Heading";
import Translation from "../assets/translation";
const PAGE = Dimensions.get("window");
class ReservationScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    userType: "user",
    selected: 3,
    route: "",
    notif: true,
    dropCalendar: false,
    bookings:
      this.props.bookedServices.length > 0 ? this.props.bookedServices : [],
    loading: false,
    currentDateFilter: null,
    selectedDate: moment(Date.now()).format("ll"),
    language: this.props.lang,
    modalVisible: false,
    currentBooking: null,
    bookingModalVisible: false,
    currentBookingSelected: null
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.props.actions.getUserBookings(() => {
      this.setState({ loading: false });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.bookedServices !== nextProps.bookedServices) {
      this.setState({ bookings: nextProps.bookedServices });
    }
    if (this.props.lang !== nextProps.lang) {
      this.setState({ language: nextProps.lang });
    }
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  setBookingModalVisible(visible) {
    this.setState({ bookingModalVisible: visible });
  }

  getMarkedDates() {
    let a = {};
    this.state.bookings.forEach(
      i =>
        (a = {
          ...a,
          [moment(i.date).format("YYYY-MM-DD")]: {
            selected: true,
            selectedColor: "#64B5F6"
          }
        })
    );
    return a;
  }



  openExternalLink(data) {
    const url = `http://maps.google.com/maps?daddr=${data.latitude},${data.longitude}&dir`;
    Linking.canOpenURL(url)
      .then(res => {
        // this.props.navigation.navigate("GoogleWebView", { link: url });
        Linking.openURL(url);
      })
      .catch(err => {
        console.log("cannot");
      });
  }
  modal() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.modalVisible}
        onRequestClose={() => {
          alert("Modal has been closed.");
        }}
      >
        <View style={{ marginTop: 30,  padding:10,flex: 1, justifyContent: "center" }}>
          <TouchableOpacity
            style={{ marginTop: "0%", marginLeft: "88%" }}
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}
          >
            <MaterialIcons name="close" size={40} color="red" />
          </TouchableOpacity>
          {this.state.currentBooking && (
            <View
              style={{
                backgroundColor: "white",
                width: PAGE.width,
                alignSelf: "center",
                flex: 1,
                padding: 10,
                justifyContent: "center"
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
                {Translation.forTranslations.bookingDetails[this.props.lang]}
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
                <TouchableOpacity
                  style={{
                    backgroundColor: "tomato",
                    padding: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 150,
                    borderRadius: 20,
                    alignSelf: "center"
                  }}
                  onPress={() => {
                    Alert.alert(
                      "Cancel",
                      `Are you sure you want to cancel ${
                        this.state.currentBooking.serviceOffered
                      } ?`,
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
                              "cancelled",
                              "customer"
                            );
                            this.setModalVisible(!this.state.modalVisible);
                          }
                        }
                      ],
                      { cancelable: false }
                    );
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "600" }}>
                    Cancel Booking
                  </Text>
                </TouchableOpacity>
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
        {this.state.bookingModalVisible && (
          <BookingEditModal
            lang={this.props.lang}
            modalVisible={this.state.bookingModalVisible}
            closeBookingModal={() => {
              this.setBookingModalVisible(false);
            }}
            data={this.state.currentBookingSelected}
          />
        )}
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
        <View style={{ zIndex: 1 }}>
          <DateSelection
            lang={this.props.lang}
            userType={this.state.userType}
            onAddPress={() => {
              this.setModalVisible(true);
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
            markedDates={this.getMarkedDates()}
            onCalendarPress={() => {
              this.setState({ dropCalendar: !this.state.dropCalendar });
            }}
            dropCalendar={this.state.dropCalendar}
            currentSelectedMarked={{
              [this.state.selectedDate.toString()]: {
                selected: true,
                marked: true
              }
            }}
            dateOnGetValue={(date, dateString) => {
              this.setState({
                currentDateFilter: date,
                selectedDate: dateString
              });
            }}
          />
        </View>
        {this.state.bookings.length > 0 ? (
          <FlatList
            style={{ backgroundColor: "whitesmoke" }}
            extraData={this.props.lang}
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
                const sorted = this.state.bookings.sort(function compare(a, b) {
                  var dateA = new Date(a.date);
                  var dateB = new Date(b.date);
                  return dateA - dateB;
                });
                return sorted;
              }
            })()}
            renderItem={({ item, index }) => (
              <View style={{ marginVertical: 5 }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ currentBooking: item });
                    this.setModalVisible(true);
                  }}
                >
                  <BookDetails
                    lang={this.state.language}
                    name={item.name}
                    service={item.service}
                    date={this.state.language === 'en' ? moment(item.date).format('LL') : moment(item.date).locale('ar-sa').format('LL')}
                    servicePrice={item.price}
                    schedule={this.state.language === 'en' ? moment(item.schedule,"hh:mm a").format('hh mm a') : moment(item.schedule,"hh:mm a").locale('ar-sa').format('hh mm a')}
                    serviceOffered={item.serviceOffered}
                    teamMember={item.teamMember}
                    location={item.venueAddress}
                    serviceProvider={item.name}
                    userType={"user"}
                    externalLink={() => {
                      this.openExternalLink(item.location);
                    }}
                    venueId={item.venueId}
                    navigation={this.props.navigation}
                    setVenue={this.props.actions.setSelectedVenue}
                    onSelect={option => {
                      if (option === "cancel") {
                        Alert.alert(
                          "Cancel",
                          `Are you sure you want to cancel ${
                            item.serviceOffered
                          } ?`,
                          [
                            {
                              text: "Cancel",
                              onPress: () => console.log("Cancel Pressed"),
                              style: "cancel"
                            },
                            {
                              text: "OK",
                              onPress: () =>
                                CheckoutLibrary.updateBooking(
                                  this.props.lang,
                                  item,
                                  "cancelled",
                                  "customer"
                                )
                            }
                          ],
                          { cancelable: false }
                        );
                      } else if (option === "edit") {
                        this.setState({ currentBookingSelected: item }, () => {
                          this.setBookingModalVisible(true);
                        });
                      }
                    }}
                    status={item.status}
                  />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, i) => i.toString()}
          />
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
                Translation.emptyContainersMessages.reservation[this.props.lang]
              }
              subheadingText={
                Translation.emptyContainersMessages.reservationSub[
                  this.props.lang
                ]
              }
            />
          </View>
        )}
        <View>
          <FooterTab
            onTabPress={route =>
              this.setState({
                route: route
              })
            }
            selected={this.state.selected}
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
  return {
    bookedServices: state.Session.userBookings,
    lang: state.Session.language,
    cart: state.Session.userCurrentServicesCart
  };
}
function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators(Reservations, dispatch)
  };
}
export default connect(
  mapStateToProps,
  mapActionsToProps
)(ReservationScreen);

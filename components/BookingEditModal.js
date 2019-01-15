import React, { Component } from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity, Alert, Dimensions, ActivityIndicator } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import ModalSelector from "react-native-modal-selector";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import moment from "moment";
import moment from "moment/min/moment-with-locales";
import sift from 'sift';
import CategoryBox from "../components/CategoryBox";
import TimeSlots from "../components/TimeSlots";
import * as currentVenueToEdit from "../src/Reducers/Session/Actions";
import Translation from "../assets/translation";

const PAGE = Dimensions.get('window')
var getInitDates = ()=>{
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
const dates = getInitDates()
class BookingEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamMembers: [],
      booking: props.data !== null ? props.data : null,
      days: getInitDates(),
      TeamMemberSchedules: [],
      teamMemberBookings: [],
      TeamMemberSchedulesCopy: [],
      timeArray: [],
      modifiedData: {},
      loading: false,
    }
  }
  componentWillMount() {
    const { data } = this.props;
    this.setState({ booking: data });
    if (this.props.modalVisible) {
      if (this.props.modalVisible) {
        this.setState({ loading: true })
        this.props.actions.getVenueForEdit(this.state.booking.venueId, (err, result) => {
          if (err) {
            Alert.alert('Ooops', err.message);
            this.setState({ loading: false })
          } else {
            if (result.length > 0) {
              let teamMembers = [];
              result.forEach(element => {
                teamMembers.push({ key: element._id, label: element.name });
              });
              this.setState({ 
                teamMembers,
                TeamMemberSchedules: result,
                modifiedData: {
                  teamMember: this.state.booking.teamMember,
                  teamMemberId: this.state.booking.teamMemberId,
                },
                loading: false
              }, () => {
                this.currentData();
              })
            }
          }
        })
      }
    }
  }
  // componentWillReceiveProps(nextProps) {
  //   if (this.props.data !== nextProps.data) {
  //     this.setState({ booking: nextProps.data });
  //   } 

  //   if (this.props.modalVisible !== nextProps.modalVisible) {
  //     if (nextProps.modalVisible) {
  //       this.setState({ loading: true })
  //       this.props.actions.getVenueForEdit(this.state.booking.venueId, (err, result) => {
  //         if (err) {
  //           Alert.alert('Ooops', err.message);
  //           this.setState({ loading: false })
  //         } else {
  //           if (result.length > 0) {
  //             let teamMembers = [];
  //             result.forEach(element => {
  //               teamMembers.push({ key: element._id, label: element.name });
  //             });
  //             this.setState({ 
  //               teamMembers,
  //               TeamMemberSchedules: result,
  //               modifiedData: {
  //                 teamMember: this.state.booking.teamMember,
  //                 teamMemberId: this.state.booking.teamMemberId,
  //               },
  //               loading: false
  //             }, () => {
  //               this.currentData();
  //             })
  //           }
  //         }
  //       })
  //     }
  //   }
  // }

  filterAvailableDays(availability) {
    const teamMemberAvailability = [];
    availability.forEach(i => {
      teamMemberAvailability.push(i.dayStr);
    });
    
    const daysFiltered = sift({ label: { $in: teamMemberAvailability } }, dates);
    
    this.setState({ days: daysFiltered, availability: availability, loading: false }); 
  }

  filterTime(id) {
    this.props.actions.getTeamMemberBookings(id, (res) => {
      this.setState({ teamMemberBookings: res, loading: false });
    });
  }

  currentData() {
    const { booking, TeamMemberSchedules } = this.state;
    const result = TeamMemberSchedules.find( i => i._id === booking.teamMemberId);
    if (result) {
      this.filterAvailableDays(result.availability)
    }
    this.filterTime(booking.teamMemberId)
  }

  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => {
            // alert('Modal has been closed.');
          }}>
          <View style={{ flex: 1, backgroundColor: "rgba(52, 52, 52, 0.4)" }}>
            { this.state.loading &&
              <View
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  zIndex: 1,
                  position: 'absolute',
                  height: PAGE.height, 
                  width: PAGE.width,
                  justifyContent: 'center'
                }}
              >
                <ActivityIndicator style={{ alignSelf: 'center'}} size="large" color="lightblue" />
              </View>
            }
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
                  this.setState({
                    teamMembers: [],
                    TeamMemberSchedules: [],
                    teamMemberBookings: [],
                    timeArray: [],
                    selected: '',
                    error: '',
                    timeSelected: '',
                  }, () => {
                    this.props.closeBookingModal();
                  })
                }}
              >
                <MaterialIcons name="close" size={40} color="red" />
              </TouchableOpacity>
              <Text style={{ marginTop: "10%", paddingBottom: 10 }}>
                {Translation.booking.selectTeamMember[this.props.lang]}
              </Text>
              <ModalSelector
                data={this.state.teamMembers}
                initValue={this.state.booking ? this.state.booking.teamMember : 'Select Team Member' }
                onChange={option => {
                  const { TeamMemberSchedules, modifiedData } = this.state;
                  
                  const result = TeamMemberSchedules.find( i => i._id === option.key);
                  if (option.key === 'GFKV31DL4') {
                    this.setState({
                      timeSelected: '',
                      selected: '',
                      error: '',
                      timeArray: [],
                      teamMemberBookings: [],
                      modifiedData: {
                        ...modifiedData,
                        teamMember: option.label,
                        teamMemberId: option.key,
                      },
                      loading: true
                    }, () => {
                      this.filterAvailableDays(result.availability)
                    })
                  } else {
                    console.log('ELSE')
                    this.setState({
                      timeSelected: '',
                      selected: '',
                      error: '',
                      timeArray: [],
                      modifiedData: {
                        ...modifiedData,
                        teamMember: option.label,
                        teamMemberId: option.key,
                      },
                      loading: true
                    }, () => {
                      this.filterAvailableDays(result.availability)
                      this.filterTime(option.key)
                    })
                  }
                }}
              />
              <Text style={{ marginTop: "5%" }}>
                {Translation.booking.selectDate[this.props.lang]}
              </Text>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
              >
                {
                  this.state.days.map((item, key) => {
                    return (
                      <TouchableOpacity
                        key={key}
                        onPress={() => {
                        const { teamMemberBookings, availability } = this.state;
                          let timeBooked = [];
                          
                          teamMemberBookings.forEach( i => {
                            if (item.dateSelected === i.date) {
                              timeBooked.push(i.schedule)
                            }
                          });
                          const result = availability.find( i => i.dayStr === item.label);
                          const { hours } = result;
                          hoursParse = JSON.parse(JSON.stringify(hours))
                          if (timeBooked.length > 0) {
                            timeBooked.forEach( i => {
                              hoursParse.forEach( (hour, index) => {
                                if (hour.hourStr.toString() === i.toString()) {
                                  hoursParse[index].available = false;
                                }
                              })
                            });
                            this.setState({
                              timeArray: hoursParse,
                              selected: item.category,
                              error: '',
                              modifiedData: {
                                ...this.state.modifiedData,
                                date: item.dateSelected,
                              },
                              timeSelected: ''
                            });
                          } else {
                            hours.map( (item, index) => {
                              hours[index].available = true;
                            });
                            this.setState({
                              timeArray: hours,
                              selected: item.category,
                              error: '',
                              modifiedData: {
                                ...this.state.modifiedData,
                                date: item.dateSelected,
                              },
                              timeSelected: ''
                            });
                          }
                          
                        }}
                      >
                        <CategoryBox
                          boxLabel={this.props.lang === 'en' ? item.category : item.categoryAr}
                          disabled={false}
                          dimension={{ height: 70, width: 70 }}
                          selected={this.state.selected === item.category}
                        />
                      </TouchableOpacity>
                    );
                  })
                }
              </ScrollView>
              <Text style={{ marginTop: 0 }}>
                {Translation.booking.selectTime[this.props.lang]}
              </Text>
              {
                this.state.timeArray.length <= 0 &&
                  <Text style={{ fontSize: 13, color: 'red', marginTop: 10, fontWeight: '500', padding: 10 }}>
                    {Translation.newTranslation.alertForBooking[this.props.lang]}
                  </Text>
               }
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
              >
                {
                  this.state.timeArray.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        disabled={!item.available}
                        onPress={() => {
                          this.setState({
                            timeSelected: item.hourStr,
                            error: '',
                            modifiedData: {
                              ...this.state.modifiedData,
                              schedule: item.hourStr,
                            }
                          })
                        }}
                      >
                        <TimeSlots
                          available={item.available}
                          boxLabel={this.props.lang === 'en' ? item.hourStr : item.hourStrAr}
                          dimension={{ height: 70, width: 70 }}
                          status={item.status}
                          selected={this.state.timeSelected === item.hourStr}
                        />
                      </TouchableOpacity>
                    )
                  })
                }
              </ScrollView>
              {
                this.state.error !== "" &&
                  <Text style={{ color: "red", padding: 10 }}>{this.state.error}</Text>
              }
              <TouchableOpacity
                style={{ 
                  backgroundColor: '#3f8ca1',
                  height: 40,
                  justifyContent: 'center',
                  borderRadius: 20,
                  width: 180,
                  alignItems: 'center' 
                }}
                onPress={() => {
                  const { booking, modifiedData, timeSelected, selected, timeArray } = this.state;
                  if (timeSelected === '' || selected === '' || timeArray.length <= 0) {
                    this.setState({
                      error: 'Please select all the fields to add'
                    });
                  } else {
                    const { booking } = this.state;
                    
                    this.props.actions.saveModificationsForBooking(booking.id, booking, modifiedData, () => {
                      this.setState({
                        teamMembers: [],
                        TeamMemberSchedules: [],
                        teamMemberBookings: [],
                        timeArray: [],
                        selected: '',
                        timeSelected: '',
                        error: '',
                      }, () => {
                        this.props.closeBookingModal();
                      })
                    });
                  }

                }}
              >
                <Text 
                  style={{ 
                    color: 'white',
                    fontWeight: '600' 
                  }}>
                  {Translation.newTranslation.saveChanges[this.props.lang]}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators(currentVenueToEdit, dispatch)
  };
}

export default connect(null, mapActionsToProps)(BookingEditModal);
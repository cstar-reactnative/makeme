import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from "react-native";
import { Constants } from "expo";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import MenuHeader from "../components/MenuHeader";
import FooterTab from "../components/FooterTab";
import ProgressDots from "../components/ProgressDots";
import RoundButton from "../components/RoundButton";
import InputField from "../components/InputField";
import Switch from "../components/Switch";
import Translation from '../assets/translation';
import GroupAdd from "../components/GroupAdd";
import * as setVenueMembers from "../src/Reducers/Session/Actions";

class RegStepTwo extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super();
    this.state = {
      route: "",
      notif: true,
      currentStep: 2,
      edit: false,
      currentTeamMemberId: null,
      name: "",
      gender: "female",
      members: props.teamMember.length > 0 ? props.teamMember : [],
      schedules: [],
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
      selectedTime: ["00:00", "00:00"]
    };
  }

  componentDidMount() {
    var teamMemberText = Translation.profile.searchTeamMember[this.props.lang]
    this.props.actions.getTeamMembers((err, res) => {
    })
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.teamMember !== nextProps.teamMember) {
      this.setState({ members: nextProps.teamMember})
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <MenuHeader
            lang={this.props.lang}
            headerText={Translation.profile.addMembers[this.props.lang]}
            cancelButton={() => {
              this.props.navigation.navigate("VenueHome")
            }}
            // notif={this.state.notif}
            // onPress={() => this.props.navigation.navigate("Notifications")}
          />
        </View>
        <ProgressDots
          lang={this.props.lang}
          currentStep={this.state.currentStep}
          onDotPress={step => {
            this.props.navigation.navigate(`RegStep${step}`);
          }}
        />
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
        >
          <View style={{ paddingBottom: 20 }}>
            <Text style={styles.sectionLabel}>{Translation.profile.addMembers[this.props.lang]}</Text>
            <GroupAdd
              lang={this.props.lang}
              schedules={this.state.schedules}
              selectedTime={index => this.state.selectedTime[index]}
              selectedDay={this.state.selectedDay}
              days={this.state.days}
              times={this.state.times}
              onDaySelect={day => this.setState({ selectedDay: day })}
              onTimeSelect={(index, time) => {
                let arrayHolder = this.state.selectedTime.slice();
                arrayHolder[index] = time;
                this.setState({ selectedTime: arrayHolder });
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
              onAddSched={() => {
                if (
                  this.state.selectedTime[0] === "00:00" ||
                  this.state.selectedTime[1] === "00:00" ||
                  this.state.selectedDay === "Day of Week"
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
                  selectedDay: "Day of Week",
                  selectedTime: ["00:00", "00:00"]
                });
              }}
              onDeleteSched={index => {
                let updated = this.state.schedules;
                updated.splice(index, 1);
                this.setState({ schedules: updated });
              }}
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
              switchGender={flag => this.setState({ gender: flag })}
              onDelete={(index, id) => {
                
                this.props.actions.deleteTeamMember(id, (err, res) => {
                  if (!err) {
                    console.log('tes')
                  } else {
                    Alert.alert('Oops!', 'Cannot process request right now');
                  }
                })
              }}
              members={this.state.members}
              name={this.state.name}
              gender={this.state.gender}
              onChangeName={text => this.setState({ name: text })}
              onChangeEmail={text => this.setState({ email: text })}
              onEdit={(index, name, gender, availability, id) => {
                this.setState({
                  name: name,
                  gender: gender,
                  schedules: availability,
                  currentTeamMemberId: id,
                  edit: true
                });

                let updated = this.state.members;
                updated.splice(index, 1);
                this.setState({ members: updated });
              }}
              onAddPress={() => {
                if (this.state.name === "" || !this.state.schedules.length) {
                  alert("Please fill-out name and availability");
                  return;
                }
                let teamMember = {
                  name: this.state.name,
                  gender: this.state.gender,
                  availability: this.state.schedules
                }
                if (this.state.edit) {
                  this.props.actions.editCurrentTeamMember(this.state.currentTeamMemberId, teamMember, (err, res) => {
                    if (res) {
                      teamMember.id = this.state.currentTeamMemberId
                      this.setState({
                        edit: false,
                        currentTeamMemberId: null,
                        name: "",
                        selectedDay: "Day of Week",
                        selectedTime: ["00:00", "00:00"],
                        schedules: [],
                      })
                    } else {
                      teamMember.id = this.state.currentTeamMemberId
                      this.setState({
                        edit: false,
                        currentTeamMemberId: null,
                        name: "",
                        selectedDay: "Day of Week",
                        selectedTime: ["00:00", "00:00"],
                        schedules: [],
                      }, () => {
                        Alert.alert('Oops!', 'Cannot process request right now!')
                      })
                    }
                  });
                } else {
                  this.props.actions.addVenueTeamMembers(teamMember, (err, res) => {
                    if (res) {
                      this.setState({
                        name: "",
                        selectedDay: "Day of Week",
                        selectedTime: ["00:00", "00:00"],
                        schedules: [],
                        edit: false
                      });
                    }
                  });
                }
              }}
            />
          </View>

         
          <View
            style={{
              flex: 1,
              flexDirection: this.props.lang === "ar" ? "row" : "row-reverse",
              justifyContent: "center",
              paddingTop: 20,
              paddingBottom: 20
            }}
          >
            <RoundButton
              textColor="black"
              text={Translation.profile.next[this.props.lang]}
              fontSize={20}
              style={{
                alignSelf: "center",
                borderRadius: 33,
                backgroundColor: "white",
                borderWidth: 1,
                height: 60,
                width: 120,
                justifyContent: "center",
                alignItems: "center",
                margin: 10
              }}
              onPress={() => {
                this.props.navigation.navigate("RegStep1");
              }}
            />
            <RoundButton
              textColor="black"
              text={Translation.profile.back[this.props.lang]}
              fontSize={20}
              style={{
                alignSelf: "center",
                borderRadius: 30,
                backgroundColor: "white",
                borderWidth: 1,
                height: 60,
                width: 120,
                justifyContent: "center",
                alignItems: "center",
                margin: 10
              }}
              onPress={() => {
                this.props.navigation.navigate("RegStep3");
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
  }
});

function mapStateToProps(state) {
  return {
    lang: state.Session.language,
    teamMember: state.Session.venueTeamMember
  };
}

function mapActionToProps(dispatch) {
  return {
    actions: bindActionCreators(setVenueMembers, dispatch)
  };
}
export default connect(mapStateToProps, mapActionToProps)(RegStepTwo);

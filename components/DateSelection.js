import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import { CalendarList } from "react-native-calendars";
import ModalSelector from "react-native-modal-selector";
import moment from 'moment';
import Translation from '../assets/translation';

import SearchInput from "../components/SearchInput";

const DateSelection = props => {
  const marked = { ...props.markedDates, ...props.currentSelectedMarked}
  dropCalendar = () => {
    if (props.dropCalendar) {
      return (
        <CalendarList
          style={styles.calendar}
          // current={'2018-04-16'}
          // minDate={'2018-04-10'}
          // maxDate={'2018-04-29'}
          firstDay={0} //0 to 6 = sun to sat
          onDayPress={(day) => {
            props.dateOnGetValue(moment(day.dateString).format('ll'), day.dateString);
          }}
          horizontal={true}
          pagingEnabled={true}
          markedDates={marked}
          // markedDates={{
          //   '2018-06-16': {selected: true, selectedColor: 'blue'},
          //   '2018-06-17': {selected: true, selectedColor: 'blue'},
          //   '2018-06-18': {selected: true, selectedColor: 'blue' },
          //   '2018-06-19': {selected: true, selectedColor: 'blue' }
          // }}
          // disabledByDefault={true}
          hideArrows={false}
          theme={{
            backgroundColor: "lightblue",
            calendarBackground: "#2c3e50",
            textSectionTitleColor: "white",
            selectedDayBackgroundColor: "#64B5F6",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#64B5F6",
            dayTextColor: "white",
            monthTextColor: "white",
            textDayFontSize: 14,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 14
            // zIndex:1000
          }}
        />
      );
    }
  };

  dropSearchBar = () => {
    if (props.dropSearchBar) {
      return (
        <SearchInput
          onChangeText={text => props.onChangeText(text)}
          searchValue={props.searchValue}
          onSearchPress={() =>
            alert(`Now filtering results..${props.searchValue}`)
          }
        />
      );
    }
  };

  showPlusButton = () => {
    if (props.userType === "owner") {
      return (
        <View>
          <TouchableOpacity onPress={props.onAddPress}>
            <FontAwesome name="plus" size={30} />
          </TouchableOpacity>
        </View>
      );
    }
  };

  showSearchBar = () => {
    if(props.userType ==='owner'){
      return(
        <TouchableOpacity onPress={props.onFilter}>
          <View style={{ marginLeft: 10 }}>
            <Ionicons name="ios-search" size={30} />
          </View>
        </TouchableOpacity>
      )
    }
  }
  
  showRefreshIcon = () => {
    if(props.showRefreshIcon){
      return(
        <TouchableOpacity onPress={props.onResetPress}>
          <View style={{ marginLeft: 10 }}>
            {/* <FontAwesome name="close" size={30} /> */}
            <Text>All Bookings</Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  return (
    <View>
      <View style={props.lang === "ar" ? styles.topBar : styles.topBarEN}>
        <View style={{ flexDirection: props.lang === "ar" ? 'row-reverse' : 'row', alignItems: 'center' }}>
          {/* <TouchableOpacity>
            <MaterialIcons name="notifications-none" size={35}/>
            {props.notif?
            <View style={styles.notify}>
            </View>:null}
          </TouchableOpacity> */}
          {showRefreshIcon()}
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={props.onCalendarPress}
          >
            <FontAwesome name="calendar" size={25} />
            {props.dropCalendar ? <View style={styles.highlight} /> : null}
          </TouchableOpacity>
          {showSearchBar()}
        </View>
        <View style={{ flexDirection: props.lang === "ar" ? 'row-reverse' : 'row' }}>
          <Text
            style={{ textAlign: "right", fontSize: 20, paddingHorizontal: 10, fontSize: 20, fontWeight: 'bold' }}
          >
          {Translation.ownerHome.booking[props.lang]}
          </Text>
          {showPlusButton()}
        </View>
      </View>
      <View style={styles.dropToggle}>
        {dropCalendar()}
        {dropSearchBar()}
      </View>
    </View>
  );
};

export default DateSelection;

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1
  },
  topBarEN: {
    backgroundColor: "white",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1
  },
  calendar: {
    backgroundColor: "#2c3e50"
  },
  dropToggle: {
    width: "100%",
  },
  highlight: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: "lightblue",
    position: "absolute",
    top: 8,
    left: 8,
    zIndex: -1
  },
  notify: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: "lightblue",
    position: "absolute",
    top: 8,
    left: 8,
    zIndex: -1
  }
});

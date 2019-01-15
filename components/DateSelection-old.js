import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome} from '@expo/vector-icons'
import {Calendar} from 'react-native-calendars'

const DateSelection = props => {

  showCalendar = () => {
    if(props.dropCalendar){
      return(
        <Calendar
          style={styles.calendar}
          // current={'2018-04-16'}
          // minDate={'2018-04-10'}
          // maxDate={'2018-04-29'}
          firstDay={0} //0 to 6 = sun to sat
          markedDates={{
            '2018-04-04': {selected: true},
            '2018-04-17': {selected: true},
            '2018-04-18': {selected: true},
            '2018-04-27': {selected: true},
            '2018-04-30': {selected: true},
          }}
          // disabledByDefault={true}
          hideArrows={true}
          theme={{
            backgroundColor: 'lightblue',
            calendarBackground: 'lightblue',
            textSectionTitleColor: 'white',
            selectedDayBackgroundColor: 'lightseagreen',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: 'white',
            monthTextColor: 'white',
            textDayFontSize: 14,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 14,
            // zIndex:1000
          }}
        />
      )
    }
  }

  return (
    <View>
      <View style={styles.topBar}>
        <View style={{flexDirection: 'row', alignItems: 'center',}}>
          <TouchableOpacity>
            <MaterialIcons name="notifications-none" size={35}/>
            {props.notif?
            <View style={styles.notify}>
            </View>:null}
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft:10}} onPress={props.onCalendarPress}>
            <FontAwesome name="calendar" size={25}/>
            {props.dropCalendar?
            <View style={styles.highlight}>
            </View>:null}
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{textAlign: 'right', fontSize:20}}>Booking</Text>
        </View>
      </View>
      <View style={styles.calContainer}>
        {showCalendar()}
      </View>
    </View>
  )
};


export default DateSelection;

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  calendar:{
    backgroundColor: 'lightblue',
  },
  calContainer:{
    width: '100%',
    zIndex: 10,
    position: 'absolute',
    top: 55,
  },
  highlight: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: 'lightblue',
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: -10,
  },
  notify: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: 'lightblue',
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: -10,
  },
});

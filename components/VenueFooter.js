
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {MaterialIcons, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'


const VenueFooter = props => {
  
  return(
    <View style={styles.container}>
    
    <TouchableOpacity onPress={()=>{props.onTabPress(2,'ProfileTab'),props.navigation.navigate("OwnerProfile")}}>
        <View>
          <MaterialIcons name="person-outline" size={40}/>
        </View>
        {props.selected===2?
        <View style={styles.selected}>
        </View>:null}
      </TouchableOpacity>

  <TouchableOpacity onPress={()=>{props.onTabPress(1, 'HomeTab'),props.navigation.navigate("VenueHome")}}>
        <View>
          <MaterialCommunityIcons name="home-outline" size={40} />
        </View>
        {props.selected===1?
        <View style={styles.selected}>
        </View>:null}
      </TouchableOpacity>
      
      <TouchableOpacity onPress={()=>{props.onTabPress(3, 'CalendarTab'),props.navigation.navigate("VenueBooking")}}>
        <View>
          <MaterialCommunityIcons name="calendar-clock" size={40} />
        </View>
        {props.selected===3?
        <View style={styles.selected}>
        </View>:null}
      </TouchableOpacity>

   

    
    </View>
  )
};

export default VenueFooter;

const styles = StyleSheet.create({
  container: {
    marginBottom:10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 5
  },
  selected: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: 'lightblue',
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: -10,
  }
})

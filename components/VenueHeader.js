import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, Ionicons, Feather} from '@expo/vector-icons'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as notificationUpdate from '../src/Reducers/Session/Actions'

const VenueHeader = props => {

  return (
    <View style={props.lang === "ar" ? styles.container : styles.containerEN}>
      <View style={{flexDirection: props.lang === "ar" ? 'row' : 'row-reverse'}} elevation={1}>
      {/* <TouchableOpacity
        onPress={props.logout}
        style={{
          display: props.logout ? 'flex' : 'none'
        }}
      >
        <Feather name="log-out" size={35}/>
      </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            props.onPress();
            props.actions.markNotificationRead()
          }}
          style={{
            display: props.onPress ? 'flex' : 'none'
          }}
        >
        {props.notificationIndicator && <View style={styles.notificationIndicator} /> }          
          <MaterialIcons name="notifications-none" size={35}/>
          {
            props.notif &&
              <View style={[styles.notify, { backgroundColor: props.hasUnreadNotif ? 'tomato' : 'lightblue' }]} />
          }
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={props.settings}
          style={{
            display: props.settings ? 'flex' : 'none'
          }}
        >
          <MaterialIcons name="settings" size={35}/>
        </TouchableOpacity>
      </View>
      
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={props.backButton}
          style={{
            padding: 7,
            display: props.backButton?'flex':'none'
          }}>
          <Feather name="arrow-left" size ={25}/>
        </TouchableOpacity>
        <Text style={styles.headerText}>{props.headerText}</Text>
      </View>
    </View>
  )
};

function mapStateToProps(state) {
  return {
    hasUnreadNotif: state.Session.userHasNotification,
  };
}

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators(notificationUpdate, dispatch)
  };
}

export default connect(mapStateToProps, mapActionsToProps)(VenueHeader);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    backgroundColor: 'white',
  },
  containerEN: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    backgroundColor: 'white',
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
  notificationIndicator: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: 'red',
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: -10,
  },
  headerText: {
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingRight: 5,
  }
})
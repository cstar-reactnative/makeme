import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, Ionicons, Feather} from '@expo/vector-icons'
import Translation from '../assets/translation';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as notificationUpdate from '../src/Reducers/Session/Actions'

const MenuHeader = props => {

  return (
    <View style={props.lang === "ar" ? styles.container : styles.containerEN}>
      <View style={{flexDirection:'row'}} elevation={1}>
        { props.onPress &&
        <TouchableOpacity
          onPress={() => {
            props.onPress();
            props.actions.markNotificationRead()
          }}
        >
          <MaterialIcons name="notifications-none" size={35}/>
          {
            props.notif &&
              <View style={[styles.notify, { backgroundColor: props.hasUnreadNotif ? 'tomato' : 'lightblue' }]} />
          }
        </TouchableOpacity>
        }
        {
          props.cancelButton &&
            <TouchableOpacity
              onPress={props.cancelButton}
            >
              <Text style={styles.headerText}>{Translation.userType.cancel[props.lang]}</Text>
            </TouchableOpacity>
        }
      </View>
      
      <View style={{flexDirection: props.lang === "ar" ? 'row' : 'row-reverse', alignItems: 'center'}}>
        <Text style={styles.headerText}>{props.headerText}</Text>
        <TouchableOpacity
          onPress={()=> {
            props.onBackPress()
          }}
          style={{
            padding: 7,
            display: props.backButton?'flex':'none'
          }}>
          {props.lang === "ar" ? <Feather name="arrow-right" size ={25}/> : <Feather name="arrow-left" size ={25}/>}
        </TouchableOpacity>
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

export default connect(mapStateToProps, mapActionsToProps)(MenuHeader);

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
  headerText: {
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingRight: 5,
  }
})
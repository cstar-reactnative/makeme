import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation'
import {MaterialIcons, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'


const FooterTab = props => {
  
  return(
    <View style={styles.container}>
      <TouchableOpacity
        onPress={()=>{
          props.onTabPress('ProfileTab');
          if (props.needToReset) {
            props.navigation.dispatch(NavigationActions.reset(
              {
                  index: 0,
                  key: null,
                  actions: [
                    NavigationActions.navigate({ routeName: 'Venues' })
                  ]
              })
            )
          }
          setTimeout(() => {
            props.navigation.navigate("Profile")
          }, 0)
        }}
      >
        <View>
          <MaterialIcons name="person-outline" size={40}/>
        </View>
        {props.selected===5?
        <View style={styles.selected}>
        </View>:null}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          props.onTabPress('FavoritesTab');
          if (props.needToReset) {
            props.navigation.dispatch(NavigationActions.reset(
              {
                  index: 0,
                  key: null,
                  actions: [
                    NavigationActions.navigate({ routeName: 'Venues' })
                  ]
              })
            )
          }
          setTimeout(() => {
            props.navigation.navigate("Favourite")
          }, 0)
        }}
      >
        <View>
          <Ionicons name="md-heart-outline" size={40}/>
        </View>
        {props.selected===4?
        <View style={styles.selected}>
        </View>:null}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          props.onTabPress('HomeTab');
          if (props.needToReset) {
            props.navigation.dispatch(NavigationActions.reset(
              {
                  index: 0,
                  key: null,
                  actions: [
                    NavigationActions.navigate({ routeName: 'Venues' })
                  ]
              })
            )
          }
          setTimeout(() => {
            props.navigation.navigate("Home")
          }, 0)
        }}
      >
        <View>
          <MaterialCommunityIcons name="home-outline" size={40} />
        </View>
        {props.selected===1?
        <View style={styles.selected}>
        </View>:null}
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => {
          props.onTabPress('CalendarTab');
          if (props.needToReset) {
            props.navigation.dispatch(NavigationActions.reset(
              {
                  index: 0,
                  key: null,
                  actions: [
                    NavigationActions.navigate({ routeName: 'Venues' })
                  ]
              })
            )
          }
          setTimeout(() => {
            props.navigation.navigate("Reservation")
          }, 0)
        }}
      >
        <View>
          <MaterialCommunityIcons name="calendar-clock" size={40} />
        </View>
        {props.selected===3?
        <View style={styles.selected}>
        </View>:null}
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => {
          props.onTabPress('SearchTab');
          if (props.needToReset) {
            props.navigation.dispatch(NavigationActions.reset(
              {
                  index: 0,
                  key: null,
                  actions: [
                    NavigationActions.navigate({ routeName: 'Venues' })
                  ]
              })
            )
          }
          setTimeout(() => {
            props.navigation.navigate("Search")
          }, 0)
        }}
      >
        <View>
          <MaterialIcons name="search" size={40} />
        </View>
        {props.selected===2?
        <View style={styles.selected}>
        </View>:null}
      </TouchableOpacity>

    
    </View>
  )
};

export default FooterTab;

const styles = StyleSheet.create({
  container: {
    marginBottom:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
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

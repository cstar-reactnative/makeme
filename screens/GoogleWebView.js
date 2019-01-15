import React from 'react';
import { View, Text, StyleSheet, WebView, Dimensions } from 'react-native';
import MenuHeader from "../components/MenuHeader";
const PAGE = Dimensions.get('window');



const GoogleWebView = (props) => {
  return(
    <View style={{ flex: 1, marginTop: 20 }}>
      <MenuHeader
        lang={'en'}
        navigation={props.navigation}
        headerText={'Back'}
        onPress={() => props.navigation.navigate("Notifications")}
        backButton={true}
        onBackPress={() => {
          props.navigation.navigate('Reservation')
        }}
      />
      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: props.navigation.getParam('link') }}
          onLoadStart={() => {
            console.log('on load')
          }}
          geolocationEnabled={true}
          startInLoadingState={true}
          onLoadEnd={() => {
            console.log('hello')
          }}
        />
      </View>
    </View>
  )
}

export default GoogleWebView;
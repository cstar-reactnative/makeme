import React, { Component } from 'react';
import { View, ScrollView, Button, StyleSheet } from 'react-native';
import {Constants} from 'expo'

export default class NavigatorScreen extends Component {

  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <ScrollView style={styles.container}>

        <View style={{marginVertical: 10}}>
          <Button
            color='#3f8ca1'
            title="Registration Step 3"
            onPress={()=>this.props.navigation.navigate('RegStep3')}
          />
        </View>

        <View style={{marginVertical: 10}}>
          <Button
            color='#3f8ca1'
            title="Service List"
            onPress={()=>this.props.navigation.navigate('VenueList')}
          />
        </View>

        <View style={{marginVertical: 10}}>
          <Button
            color='#3f8ca1'
            title="Booking Screen"
            onPress={()=>this.props.navigation.navigate('Reservation')}
          />
        </View>

        <View style={{marginVertical: 10}}>
          <Button
            color='#3f8ca1'
            title="Search Screen"
            onPress={()=>this.props.navigation.navigate('Search')}
          />
        </View>

        <View style={{marginVertical: 10}}>
          <Button
            color='#3f8ca1'
            title="Service Screen"
            onPress={()=>this.props.navigation.navigate('Service')}
          />
        </View>

        <View style={{marginVertical: 10}}>
          <Button
            color='#3f8ca1'
            title="Home Screen"
            onPress={()=>this.props.navigation.navigate('HomeNavigation')}
          />
        </View>

        <View style={{marginVertical: 10}}>
          <Button
            color='#3f8ca1'
            title="Language Selection"
            onPress={()=>this.props.navigation.navigate('Language')}
          />
        </View>
        
        <View style={{marginVertical: 10}}>
          <Button
            color='#3f8ca1'
            title="Location Selection"
            onPress={()=>this.props.navigation.navigate('Location')}
          />
        </View>

        <View style={{marginVertical: 10}}>
          <Button
            color='#3f8ca1'
            title="User/Service Provider"
            onPress={()=>this.props.navigation.navigate('User/Service Provider')}
          />
        </View>

        <View style={{marginVertical: 10}}>
          <Button
            color='#3f8ca1'
            title="Sign Up"
            onPress={()=>this.props.navigation.navigate('SignUp')}
          />
        </View>

        <View style={{marginVertical: 10}}>
          <Button
            color='#3f8ca1'
            title="Log In"
            onPress={()=>this.props.navigation.navigate('LogIn')}
          />
        </View>

        <View style={{marginVertical: 10}}>
          <Button
            color='#3f8ca1'
            title="Generic Component Holder"
            onPress={()=>this.props.navigation.navigate('Generic')}
          />
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  }
});

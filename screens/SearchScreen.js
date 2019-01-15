import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, FlatList} from 'react-native';
import {Constants} from 'expo'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as setSearchString from '../src/Reducers/Session/Actions';

import MenuHeader from '../components/MenuHeader'
import FooterTab from '../components/FooterTab'
import SearchInput from '../components/SearchInput'
import ServiceInfo from '../components/ServiceInfo'
import Translation from '../assets/translation';
import VenueClass from "../src/lib/Venues";

var geo = require("geopoint");

class SearchScreen extends Component {

  static navigationOptions = {
    header: null
  }

  state = {
    selected: 2,
    route: '',
    notif: true,
    searchValue: '',
    servicesList: [
      {name: 'Expo Salon', address: '1st street, 2nd city', rating: 4.5, ratingCount: 199, distance: 2.2, image: 'https://picsum.photos/200/200?image=1035'},
      {name: 'React Body Spa', address: '3rd street, 4th city', rating: 3.5, ratingCount: 117, distance: 4, image: 'https://picsum.photos/200/200?image=1083'},
      {name: 'Javascript Center', address: '2nd street, 1st city', rating: 4, ratingCount: 243, distance: 3, image: 'https://picsum.photos/200/200?image=1027'},
      {name: 'Native Massage', address: '4th street, 17th city', rating: 5, ratingCount: 174, distance: 5.4, image: 'https://picsum.photos/200/200?image=996'},
      {name: 'Skin Scripts', address: '1st street, 5th city', rating: 5, ratingCount: 54, distance: 2.7, image: 'https://picsum.photos/200/200?image=312'},
      {name: 'Hair Prettier', address: '8th street, 3rd city', rating: 4.7, ratingCount: 54, distance: 1.9, image: 'https://picsum.photos/200/200?image=65'},
    ]
  }

  distance(){
    if (
      this.props.currentLocation &&
      this.props.currentLocation.coords &&
      this.props.currentLocation.coords.latitude &&
      this.props.currentLocation.coords.latitude > 0
    ) {
      var p1 = new geo(
        this.props.currentLocation.coords.latitude,
        this.props.currentLocation.coords.longitude
      );
      this.props.searchList.map(i => {
        var p2 = new geo(i.location.latitude, i.location.longitude);
        i.distance = `${p1.distanceTo(p2, true).toFixed(2)} `;
      });
    } else {
      this.props.searchList.map(i => {
        i.distance = `...`;
      });
    }

    return this.props.searchList
  }

  
  render() {
    return (
      <View style={styles.container}>

        <View>
          <MenuHeader
            lang={this.props.lang}
            headerText={Translation.HomeScreen.search[this.props.lang]}
            notif={this.state.notif}
            onPress={() => this.props.navigation.navigate("Notifications")}
          />
          <SearchInput
            lang={this.props.lang}
            placeholder = {Translation.OnBoarding.titleTwo[this.props.lang]}
            onChangeText = {(text)=>this.props.actions.setSearchString(text)}
            searchValue={this.state.searchValue}
            onSearchPress = {()=>alert(`Searching for ${this.state.searchValue} ..`)}
          />
        </View>

        <ScrollView contentContainerStyle={{backgroundColor: 'whitesmoke'}}>
          <FlatList
            // data={this.props.searchList}
            data={this.distance()}
            renderItem={({item, index}) => (
              <View style={{marginVertical:5}}>
                <ServiceInfo
                  lang={this.props.lang}
                  _id={item.id}
                  serviceName={item.name}
                  serviceAddress={item.venueAddress}
                  distance={item.distance}
                  rating={item.rating}
                  ratingCount={item.ratingCount}
                  imageUri={item.headerImage}
                  navigation={this.props.navigation}
                  setVenue={this.props.actions.setSelectedVenue}
                />
              </View>
            )}
            keyExtractor={(item, i)=>i.toString()}
          />
        </ScrollView>

        <View>
          <FooterTab
            onTabPress={(route)=> this.setState({
              route: route,
            })}
            selected={this.state.selected}
            route={this.state.route}
            navigation={this.props.navigation}
            navigation={this.props.navigation}
            
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
});

function mapStateToProps(state) {
  const reviewsArray = state.Venues.reviews;
  
  var venues = state.Venues.venues.map(v => {
    let venueFunctions = new VenueClass(v, reviewsArray);
    v = venueFunctions._getVenueWithReviews();
    if (state.Session.currentUser.favouriteVenues) {
      const result =
        state.Session.currentUser.favouriteVenues.indexOf(v.id) > -1
          ? true
          : false;
      v.favorite = result;
    } else {
      v.favorite = false;
    }
   
    return v;
  });
  return {
    searchList: venues.filter((f)=>{return f.name.toLowerCase()
      .indexOf(state.Session.searchValue.toLowerCase()) > -1}),
    searchValue: state.Session.searchValue,
    lang: state.Session.language,
    currentLocation: state.Session.userSignupForm.location
  }
}
function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators(setSearchString, dispatch),
  }
}

export default connect(mapStateToProps,mapActionsToProps)(SearchScreen)

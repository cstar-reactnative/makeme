import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Constants } from "expo";
import { connect } from "react-redux";
import * as toggleFavourite from "../src/Reducers/Session/Actions";
import { bindActionCreators } from "redux";

import MenuHeader from "../components/MenuHeader";
import FooterTab from "../components/FooterTab";
import Service from "../components/Service";
import Heading from "../components/Heading";
import VenueClass from "../src/lib/Venues";

var geo = require("geopoint");

import Translation from '../assets/translation';
class FavouriteScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    selected: 4,
    route: "",
    notif: true,
    showOptions: false,
    menuSelection: 1,
    venueList: this.props.favList,
    favouriteVenues: this.props.favouriteVenues ? this.props.favouriteVenues : [],
  };

  componentWillReceiveProps(nextProps) {
    if(this.props.favouriteVenues !== nextProps.favouriteVenues) {
      this.setState({ favouriteVenues: nextProps.favouriteVenues})
    }
  }
  

  myFavouriteList() {
    const { venueList, favouriteVenues } = this.state;
    const favVenue = [];
    if (this.props.favouriteVenues !== undefined && this.props.favouriteVenues.length > 0) {
      venueList.map( i => {
        const result = favouriteVenues.indexOf(i.id) > -1 ? true : false;
        if (result) {
          i.favorite = true;
          favVenue.push(i);
        }
      })
      
    }

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
      favVenue.map(i => {
        var p2 = new geo(i.location.latitude, i.location.longitude);
        i.distance = `${p1.distanceTo(p2, true).toFixed(2)} `;
      });
    } else {
      favVenue.map(i => {
        i.distance = `...`;
      });
    }
    return favVenue;
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <MenuHeader
            lang={this.props.lang}
            headerText={Translation.HomeScreen.fav[this.props.lang]}
            notif={this.state.notif}
            onPress={() => this.props.navigation.navigate("Notifications")}
          />
        </View>
        {
          this.myFavouriteList().length > 0 ? 
          <ScrollView contentContainerStyle={{ backgroundColor: "whitesmoke" }}>
              <FlatList
              data={this.myFavouriteList()}
              renderItem={({ item, index }) => (
                <View style={{ marginVertical: 5 }}>
                  <Service
                    lang={this.props.lang}
                    _id={item.id}
                    serviceName={item.name}
                    serviceAddress={item.venueAddress}
                    distance={item.distance}
                    offer={item.offer}
                    favorite={item.favorite}
                    onFavorite={fave => {
                      if (item.favorite) {
                        this.props.actions.favoriteVenue(item.id, 'remove');
                      } else {
                        this.props.actions.favoriteVenue(item.id, 'add');
                      }
                    }}
                    rating={item.rating}
                    ratingCount={item.ratingCount}
                    imageUri={item.headerImage}
                    description={item.description}
                    navigation={this.props.navigation}
                    setVenue={this.props.actions.setSelectedVenue}
                  />
                </View>
              )}
              keyExtractor={(item, i) => i.toString()}
            />
        </ScrollView>
          :
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "whitesmoke" }}>          
                  <Heading
                  headingText={Translation.emptyContainersMessages.favourites[this.props.lang]}
                  subheadingText={Translation.emptyContainersMessages.favouritesSub[this.props.lang]}
                />
              </View>
        }
        

        <View>
          <FooterTab
            onTabPress={(route) =>
              this.setState({
                route: route
              })
            }
            selected={this.state.selected}
            route={this.state.route}
            navigation={this.props.navigation}
          />
        </View>
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
  }
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
    favList: venues,
    lang: state.Session.language,
    favouriteVenues: state.Session.currentUser.favouriteVenues !== undefined ? state.Session.currentUser.favouriteVenues : [],
    currentLocation: state.Session.userSignupForm.location
  };
}
function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators(toggleFavourite, dispatch)
  };
}

export default connect(mapStateToProps,mapActionsToProps)(FavouriteScreen);

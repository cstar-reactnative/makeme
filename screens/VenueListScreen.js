import React, { Component } from "react";
import {
  Alert,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Linking
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as setFilter from "../src/Reducers/Session/Actions";
import { Constants } from "expo";
import Translations from "../assets/translation";
import sift from "sift";
import Header from "../components/Header";
import FooterTab from "../components/FooterTab";
import Heading from "../components/Heading";
import Service from "../components/Service";
import VenueClass from "../src/lib/Venues";

var geo = require("geopoint");

const PAGE = Dimensions.get("window");
class VenueListScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    selected: 1,
    route: "",
    notif: true,
    menuSelection: 1,
    venueList: this.props.venueList
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.venueList !== nextProps.venueList) {
      this.setState({ venueList: nextProps.venueList });
    }
  }

  calculateDistance() {
    let venues = this.props.venueList;
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
      venues.map(i => {
        var p2 = new geo(i.location.latitude, i.location.longitude);
        i.distance = `${p1.distanceTo(p2, true).toFixed(2)} `;
      });
    } else {
      venues.map(i => {
        i.distance = `...`;
      });
    }
    return venues;
  }

  openExternalLink(data) {
    const url = `http://maps.google.com/maps?daddr=${data.latitude},${data.longitude}&dir`;
    Linking.canOpenURL(url)
      .then(res => {
        // this.props.navigation.navigate("GoogleWebView", { link: url });
        Linking.openURL(url);
      })
      .catch(err => {
        console.log("cannot");
      });
  }


  render() {
    return (
      <View style={styles.container}>
        <View>
          <Header
            lang={this.props.lang}
            navigation={this.props.navigation}
            optionsPress={() => {
              this.setState({ showOptions: !this.state.showOptions });
            }}
            backButton={() => {
              this.props.navigation.navigate("Home");
            }}
            filterShow={true}
            showOptions={this.state.showOptions}
            menuSelection={this.props.selectedFilter}
            onSelect={selection => this.props.actions.setFilter(selection)}
          />
        </View>
        {this.props.loading &&
          this.props.venueFromDb.length <= 0 && (
            <View
              style={{
                zIndex: 1,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                height: PAGE.height,
                width: PAGE.width
              }}
            >
              <ActivityIndicator size="large" color="lightblue" />
            </View>
          )}
        <View style={{ backgroundColor: "whitesmoke", flex: 1 }}>
          {this.state.venueList.length > 0 ? (
            <FlatList
              data={(() => {
                return this.calculateDistance();
              })()}
              keyExtractor={(item, i) => i.toString()}
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
                      if (this.props.profile.email === "guest@app.com") {
                        Alert.alert(
                          "Information!",
                          "To favourite venues you need to create or log in an existing account",
                          [
                            {
                              text: "Ask me later",
                              onPress: () => console.log("Ask me later pressed")
                            },
                            {
                              text: "Create account or login",
                              onPress: () => {
                                this.props.actions.userLogout((err, res) => {
                                  if (!err) {
                                    this.props.navigation.navigate("LogIn");
                                  }
                                });
                              },
                              style: "cancel"
                            }
                          ],
                          { cancelable: false }
                        );
                      } else {
                        if (item.favorite) {
                          this.props.actions.favoriteVenue(item.id, "remove");
                        } else {
                          this.props.actions.favoriteVenue(item.id, "add");
                        }
                      }
                    }}
                    rating={item.rating}
                    ratingCount={item.ratingCount}
                    imageUri={
                      item.headerImage
                        ? item.headerImage
                        : "https://picsum.photos/200/300?image=998"
                    }
                    description={item.description}
                    navigation={this.props.navigation}
                    setVenue={this.props.actions.setSelectedVenue}
                    openLink={()=>{this.openExternalLink(item.location)}}
                  />
                </View>
              )}
            />
          ) : (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Heading
                headingText={
                  Translations.forTranslations.venues[this.props.lang]
                }
                subheadingText={
                  Translations.forTranslations.venuesMessage[this.props.lang]
                }
              />
            </View>
          )}
        </View>

        <View>
          <FooterTab
            needToReset={true}
            onTabPress={(tabId, route) =>
              this.setState({
                selected: tabId,
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

  if (state.Session.filterValue === "By Distance") {
    venues = venues.sort((a, b) => {
      return a.distance - b.distance;
    });
  } else if (state.Session.filterValue === "By Offer") {
    venues = venues.filter(f => {
      return f.offer;
    });
  } else if (state.Session.filterValue === "By Rating") {
    venues = venues.sort((a, b) => {
      return b.rating - a.rating;
    });
  }

  return {
    location: state.Session.userSignupForm.location,
    lang: state.Session.language,
    venueList: sift(
      { categories: { $in: [state.Session.selectedCategory] } },
      venues
    ),
    selectedFilter: state.Session.filterValue,
    loading: state.Venues.isFetchingVenues,
    currentLocation: state.Session.userSignupForm.location,
    profile: state.Session.currentUser
  };
}
function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators(setFilter, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(VenueListScreen);

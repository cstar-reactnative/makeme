import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,Linking
} from "react-native";
import { Constants } from "expo";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as setService from "../src/Reducers/Session/Actions";
import { Ionicons } from "@expo/vector-icons";

import _ from "underscore";
import MenuHeader from "../components/MenuHeader";
import FooterTab from "../components/FooterTab";
import ServiceDetails from "../components/ServiceDetails";
import TouchableList from "../components/TouchableList";
import Thumbnail from "../components/Thumbnail";
import ReviewCard from "../components/ReviewCard";
import Translation from "../assets/translation";
import VenueClass from "../src/lib/Venues";


class VenueScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedTab: 1,
      route: "",
      notif: true,
      phonenumber: "",
      data: [
        {
          name: "Kathy Perry",
          rating: 3,
          feedbackText: "The size was large for me.",
          thumbnailImages: [
            "https://picsum.photos/200/300?image=998",
            "https://picsum.photos/200/300?image=903",
            "https://picsum.photos/200/300?image=882",
            "https://picsum.photos/200/300?image=823",
            "https://picsum.photos/200/300?image=777",
            "https://picsum.photos/200/300?image=767",
            "https://picsum.photos/200/300?image=847"
          ]
        }
      ],
      venueDetails: props.venueDetails ? props.venueDetails : []
    };
  }
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.props.actions.getVenuePhoneNumber(
      this.props.venueDetails.ownerId,
      res => {
        this.setState({ phonenumber: res });
      }
    );
    this.props.actions.getTeamMembersOnSelectedVenue((err, res) => {});
    this.props.actions.setBookanyTeamMember([
      {
        availability: this.props.venueDetails.schedules,
        gender: "female",
        name: "Book any team member"
      }
    ]);
  }

  
  componentWillReceiveProps(nextProps) {
    if (this.props.venueDetails !== nextProps.venueDetails) {
      console.log("something was changed");
    }
    if (this.props.reviews !== nextProps.reviews) {
      const venueFunctions = new VenueClass(
        this.props.venueDetails,
        nextProps.reviews
      );
      this.setState({
        venueDetails: venueFunctions._getVenueWithReviews()
      });
    }
  }
  
  sortedReview(){
    if(this.state.venueDetails.reviews.length > -1){
      const sorted = this.state.venueDetails.reviews.sort(function compare(a, b) {
        var dateA = new Date(a.ratedAt);
        var dateB = new Date(b.ratedAt);
        return dateB - dateA;
      });
      return sorted;
    }
  }

  getCategories() {
    const categories = [];
    this.state.venueDetails.servicesOffers.forEach(i =>
      categories.push({
        label: Translation.VenueDetails[i.category],
        value: i.category.charAt(0).toUpperCase() + i.category.slice(1)
      })
    );
    return _.uniq(categories, i => i.value);
  }

  openExternalLink(data) {
    const url = `http://maps.google.com/maps?daddr=${data._lat},${data._long}&dir`;
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
          <MenuHeader
            lang={this.props.lang}
            navigation={this.props.navigation}
            headerText={Translation.profile.services[this.props.lang]}
            onPress={() => this.props.navigation.navigate("Notifications")}
            backButton={true}
            onBackPress={() => {
              if (this.props.navigation.state.routeName === "GoToVenue") {
                this.props.navigation.navigate("Reservation");
              } else {
                this.props.navigation.goBack();
              }
            }}
          />
        </View>
        <ScrollView>
          <TouchableOpacity
            style={{
              position: "absolute",
              zIndex: 1,
              alignSelf: "flex-end",
              paddingRight: 10
            }}
            onPress={() => {
              if (this.props.profile.email === "guest@app.com") {
                Alert.alert(
                  Translation.forTranslations.information[this.props.lang],
                  Translation.forTranslations.createAccLogMessage[
                    this.props.lang
                  ],
                  [
                    {
                      text:
                        Translation.forTranslations.askmelater[this.props.lang],
                      onPress: () => console.log("Ask me later pressed")
                    },
                    {
                      text:
                        Translation.forTranslations.createAccountorLogin[
                          this.props.lang
                        ],
                      onPress: () => {
                        this.props.navigation.navigate("LogIn");
                        this.props.actions.userLogout((err, res) => {
                          if (!err) {
                            console.log("Successssss")
                          }
                        });
                      },
                      style: "cancel"
                    }
                  ],
                  { cancelable: false }
                );
              } else {
                if (this.props.favourite) {
                  this.props.actions.favoriteVenue(
                    this.state.venueDetails.id,
                    "remove"
                  );
                } else {
                  this.props.actions.favoriteVenue(
                    this.state.venueDetails.id,
                    "add"
                  );
                }
              }
            }}
          >
            <Ionicons
              name={this.props.favourite ? "md-heart" : "md-heart-outline"}
              size={40}
              color={this.props.favourite ? "tomato" : "black"}
            />
          </TouchableOpacity>
          <Image
            style={{ width: "100%", height: 250 }}
            source={{
              uri:
                this.state.venueDetails && this.state.venueDetails.headerImage
                  ? this.state.venueDetails.headerImage
                  : "https://picsum.photos/200/300?image=998"
            }}
          />
          <ServiceDetails
            lang={this.props.lang}
            phonenumber={this.state.phonenumber}
            imageUri={
              this.state.venueDetails && this.state.venueDetails.headerImage
                ? this.state.venueDetails.headerImage
                : "https://picsum.photos/200/300?image=998"
            }
            serviceName={
              this.state.venueDetails && this.state.venueDetails.name
            }
            serviceAddress={
              this.state.venueDetails && this.state.venueDetails.venueAddress
            }
            rating={this.state.venueDetails && this.state.venueDetails.rating}
            ratingCount={
              this.state.venueDetails && this.state.venueDetails.ratingCount
            }
            description={
              this.state.venueDetails && this.state.venueDetails.description
            }
            openLink={()=>{this.openExternalLink(this.state.venueDetails.location)}}
          />

          <TouchableList
            lang={this.props.lang}
            onItemPress={c => {
              this.props.actions.selectedVenueOwnerId(
                this.state.venueDetails.ownerId
              );
              this.props.actions.setSelectedService(c.toLowerCase());
              this.props.navigation.navigate("AddService");
            }}
            servicesOffers={
              this.state.venueDetails &&
              this.state.venueDetails.servicesOffers !== undefined &&
              this.state.venueDetails.servicesOffers.length > 0
                ? this.state.venueDetails.servicesOffers
                : []
            }
            data={
              this.state.venueDetails &&
              this.state.venueDetails.servicesOffers !== undefined &&
              this.state.venueDetails.servicesOffers.length > 0
                ? this.getCategories()
                : []
            }
          />

          <View style={{ marginVertical: 10 }}>
            <Thumbnail
              onThumbPress={index =>
                console.log("thumbnail image tapped, id: ", index)
              }
              // onThumbPress={}
              thumbnailItems={
                this.state.venueDetails && this.state.venueDetails.profileImages
                  ? this.state.venueDetails.profileImages
                  : []
              }
            />
          </View>
          <View>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            >
              {Translation.ownerHome.reviews[this.props.lang]}
            </Text>
            {this.state.venueDetails &&
            this.state.venueDetails.reviews !== undefined &&
            this.state.venueDetails.reviews.length > 0 ? (
              <ReviewCard
                lang={this.props.lang}
                // usersdata={this.state.venueDetails.reviews}
                usersdata={(() => {
                  return this.sortedReview();
                })()}
              />
            ) : (
              <Text
                style={{
                  alignSelf: "center",
                  paddingBottom: 15,
                  paddingTop: 15
                }}
              >
                {Translation.ownerHome.noReviews[this.props.lang]}
              </Text>
            )}
          </View>
        </ScrollView>

        <View>
          <FooterTab
            needToReset={true}
            onTabPress={(tabId, route) =>
              this.setState({
                selectedTab: tabId,
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
  const { Session, Venues } = state;
  const favVenues = Session.currentUser.favouriteVenues
    ? Session.currentUser.favouriteVenues
    : [];
  const favourite = favVenues.find(i => i === Session.selectedVenue);
  const venues = Venues.venues;
  const reviews = Venues.reviews;
  var venue = venues.find(f => {
    return f.id == state.Session.selectedVenue;
  });

  const venueFunctions = new VenueClass(venue, reviews);
  return {
    lang: state.Session.language,
    venueDetails: venue,
    favourite: favourite,
    profile: state.Session.currentUser,
    venue: venueFunctions._getVenueWithReviews(),
    reviews: reviews
  };
}
function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators(setService, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(VenueScreen);

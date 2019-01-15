import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
  Alert
} from "react-native";
import { Constants } from "expo";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as venue from "../src/Reducers/Session/Actions";

import { uniq } from "underscore";
import VenueHeader from "../components/VenueHeader";
import VenueFooter from "../components/VenueFooter";
import ServiceDetails from "../components/ServiceDetails";
import TouchableList from "../components/TouchableList";
import Thumbnail from "../components/Thumbnail";
import ReviewCard from "../components/ReviewCard";
import Translation from "../assets/translation";
import VenueClass from "../src/lib/Venues";

const PAGE = Dimensions.get("window");
class VenueHome extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    selected: 1,
    route: "",
    notif: true,
    loading: false,
    venue: null,
    notifications: this.props.userNotifications,
    phonenumber: ""
  };

  componentDidMount() {
    this.props.actions.checkifhasnotification();
    this.setState({ loading: true }, () => {
      this.props.actions.getNotifications('businessOwner');
      this.props.actions.getUserVenue(() => {
        this.props.actions.getVenuePhoneNumber(this.props.venue.ownerId, res => {
          this.setState({ phonenumber: res });
        });
        this.props.actions.getBusinessOwnerReviews();
        this.props.actions.getTeamMembersOnSelectedVenue((err, members) => {
          this.setState({ loading: false });
          if (members.length > 0) {
            this.props.actions.selectedVenueOwnerId(this.props.venue.ownerId);
            this.props.actions.getTeamMembers(() => {});
          }
        });
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userNotifications !== nextProps.userNotifications) {
      this.setState({ notifications: nextProps.userNotifications });
    }
  }

  sortedReview(){
    if(this.props.reviews != undefined){
      const sorted = this.props.reviews.sort(function compare(a, b) {
        var dateA = new Date(a.ratedAt);
        var dateB = new Date(b.ratedAt);
        return dateB - dateA;
      });
      return sorted;
    }
  }

  getCategories() {
    const categories = [];
    this.props.venue.servicesOffers.forEach(i =>
      categories.push({
        label: Translation.VenueDetails[i.category],
        value: i.category.charAt(0).toUpperCase() + i.category.slice(1)
      })
    );
    return uniq(categories, i => i.value);
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <VenueHeader
            lang={this.props.lang}
            headerText={Translation.ownerHome.mainMenu[this.props.lang]}
            notif={true}
            onPress={() => this.props.navigation.navigate("VenueNotifications")}
            settings={() => this.props.navigation.navigate("RegStep3")}
            notificationIndicator={false}
            logout={() => {
              Alert.alert(
                "Information",
                "Are you sure you want to logout",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  {
                    text: "Yes",
                    onPress: () => {
                      this.props.actions.userLogout((err, res) => {
                        this.props.navigation.navigate("LogIn");
                      });
                    }
                  }
                ],
                { cancelable: false }
              );
            }}
          />
        </View>
        {this.state.loading && (
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
        <ScrollView>
          <Image
            style={{ width: "100%", height: 250 }}
            source={
              this.props.venue && this.props.venue.headerImage
                ? { uri: this.props.venue.headerImage }
                : {
                    uri:
                      "https://www.b1057.com/sites/all/modules/contrib/media_gallery/images/empty_gallery.png"
                  }
            }
          />

          <ServiceDetails
            lang={this.props.lang}
            imageUri={
              this.props.venue && this.props.venue.headerImage
                ? this.props.venue.headerImage
                : "https://www.b1057.com/sites/all/modules/contrib/media_gallery/images/empty_gallery.png"
            }
            phonenumber={this.state.phonenumber}
            serviceName={
              this.props.venue && this.props.venue.name !== undefined
                ? this.props.venue.name
                : ""
            }
            serviceAddress={this.props.venue.venueAddress}
            rating={parseFloat(this.props.venue.rating)}
            ratingCount={this.props.venue.ratingCount}
            description={
              this.props.venue && this.props.venue.description !== undefined
                ? this.props.venue.description
                : "no description"
            }
            openLink={()=>{}}
          />

          <TouchableList
            lang={this.props.lang}
            onItemPress={item => {
              console.log(this.props);
              this.props.actions.setSelectedService(item.toLowerCase());
              this.props.navigation.navigate({ routeName: "VenueServices" });
            }}
            servicesOffers={
              this.props.venue &&
              this.props.venue.servicesOffers !== undefined &&
              this.props.venue.servicesOffers.length > 0
                ? this.props.venue.servicesOffers
                : []
            }
            data={
              this.props.venue &&
              this.props.venue.servicesOffers !== undefined &&
              this.props.venue.servicesOffers.length > 0
                ? this.getCategories()
                : []
            }
          />

          <View style={{ marginVertical: 10 }}>
            <Thumbnail
              onThumbPress={index =>
                console.log(
                  "thumbnail image tapped, id: ",
                  this.props.venue.thumbnails
                )
              }
              // onThumbPress={}
              thumbnailItems={
                this.props.venue && this.props.venue.profileImages !== undefined
                  ? this.props.venue.profileImages
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
            {this.props.reviews !== undefined &&
            this.props.reviews.length === 0 ? (
              <Text style={{ textAlign: "center" }}>
                {Translation.ownerHome.noReviews[this.props.lang]}
              </Text>
            ) : (
              <ReviewCard
              lang={this.props.lang}
              usersdata={(() => {
                return this.sortedReview();
              })()} />
            )}
          </View>
        </ScrollView>

        <View>
          <VenueFooter
            onTabPress={(tabId, route) => {
              this.setState({
                selected: tabId,
                route: route
              });
            }}
            selected={1}
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
  const venue = state.Session.currentVenue;
  const reviews = state.Session.currentVenueReviews;

  const venueFunctions = new VenueClass(venue, reviews);
  return {
    lang: state.Session.language,
    venue: venueFunctions._getVenueWithReviews(),
    userNotifications: state.Session.userNotifications,
    reviews: state.Session.currentVenueReviews
  };
}

function mapActionProps(dispatch) {
  return {
    actions: bindActionCreators(venue, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapActionProps
)(VenueHome);

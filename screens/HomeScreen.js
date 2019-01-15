import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Dimensions
} from "react-native";
import { Map } from "immutable";
import { Constants } from "expo";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Translation from "../assets/translation";
import * as setCategory from "../src/Reducers/Session/Actions";
import * as venueActions from "../src/Reducers/Venues/Actions";
import firebase from "../src/config/firestoreConfig";
import StarRating from "react-native-star-rating";
import ProfileImagePicker from "../components/ProfileImagePicker";
import MakemeUtil from "../src/lib/makemeutil";
import MenuHeader from "../components/MenuHeader";
import FooterTab from "../components/FooterTab";
import MainMenu from "../components/MainMenu";
import Heading from "../components/Heading";

import moment from "moment";

const PAGE = Dimensions.get("window");

const actionsList = [setCategory, venueActions];
var db = firebase.firestore();

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    selected: 1,
    route: "",
    notif: true,
    modalVisible: false,
    rateMe: 0,
    newRateMe: null,
    feedbackText: "",
    thumbnailImages: [],
    invoice: [],
    venueName: "",
    venueId: ""
  };

  componentDidMount() {
    this.props.actions.checkifhasnotification();
    this.props.actions.getNotifications();
    this.props.actions.realtimeReviews();
    this.props.actions.realtimeVenues();
    var venuesRef = db.collection("venues").where("status", "==", "accepted");
    venuesRef.onSnapshot(querySnapshot => {
      const venues = [];
      querySnapshot.forEach(doc => {
        let data = doc.data();
        data.id = doc.id;
        venues.push(data);
      });

      venues.map(v => {
        let s = 0;
        if (v.reviews.length != 0) {
          v.reviews.forEach((item, index, array) => {
            s = s + parseFloat(item.rating);
          });
          return (v.rating = s / v.reviews.length);
        } else {
          return (v.rating = 0);
        }
      });
      this.props.actions.setVenueItemsToStore(venues);
    });

    db.collection("invoice")
      .where("userId", "==", this.props.profile.userId)
      .where("rated", "==", "no")
      .onSnapshot(doc => {
        var invoice = [];
        doc.forEach(item => {
          data = item.data();
          data.id = item.id;
          invoice.push(data);
        });
        if (invoice.length > 0) {
          var now = moment();
          var reminder = moment(invoice[0].reminder).add(2, 'hours');
          if (now.valueOf() > reminder.valueOf()) {
            this.setState({
              reviewId: invoice[0].id,
              venueName: invoice[0].services[0].name,
              venueId: invoice[0].venueId,
              modalVisible: true
            });
          }
        }
        invoice.map(i => {});
        this.setState({ invoice });
      });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  async updateRating() {
    const {
      newRateMe,
      feedbackText,
      thumbnailImages,
      venueId,
      reviewId
    } = this.state;
    const rateData = {
      userDetails: {
        userId: this.props.profile.userId,
        email: this.props.profile.email,
        firstName: `${this.props.profile.firstName}, ${
          this.props.profile.lastName
        }`
      },
      invoiceId: reviewId,
      venueId,
      rating: newRateMe,
      feedbackText,
      thumbnailImages,
      ratedAt: moment(Date.now()).format("LLL")
    };

    MakemeUtil.SaveReviewRatings(rateData, () => {
      this.setState({
        reviewId: "",
        venueName: "",
        venueId: "",
        modalVisible: false
      });
    });
    // let newRating = [];
    // await db
    //   .collection("venues")
    //   .doc("8y6mOcikxKXPnBwFqoZr")
    //   .get()
    //   .then(function(doc) {
    //     if (doc.exists) {
    //       console.log("Document data:", doc.data().reviews);
    //       newRating = doc.data().reviews;
    //     } else {
    //       console.log("No such document!");
    //     }
    //   });
    // var reviewId = this.state.reviewId;
    // // newRating = this.props.navigation.state.params.ratings;
    // if (this.state.rateMe == 0) {
    //   let initialRating = {};
    //   initialRating.name =
    //     this.props.profile.firstName + " " + this.props.profile.lastName;
    //   initialRating.userId = this.props.profile.userId;
    //   initialRating.rating = this.state.newRateMe;
    //   initialRating.feedbackText = this.state.feedbackText;
    //   initialRating.thumbnailImages = this.state.thumbnailImages;
    //   initialRating.ratedAt = moment(Date.now()).format("LLL");
    //   initialRating.id = uuid();
    //   newRating.push(initialRating);
    // } else {
    //   objIndex = newRating.findIndex(
    //     obj => obj.userId == this.props.profile.userId
    //   );
    //   console.log("Before update: ", newRating[objIndex]);
    //   newRating[objIndex].rating = this.state.newRateMe;
    //   newRating[objIndex].feedbackText = this.state.feedbackText;
    //   newRating[objIndex].thumbnailImages = this.state.thumbnailImages;
    //   console.log("After update: ", newRating);
    // }
    // db.collection("venues")
    //   .doc(this.state.venueId)
    //   .set(
    //     {
    //       reviews: newRating,
    //       ratingCount: newRating.length
    //     },
    //     { merge: true }
    //   )
    //   .then(function(docRef) {
    //     db.collection("invoice")
    //       .doc(reviewId)
    //       .update({
    //         rated: "yes"
    //       });
    //     console.log("New message added");
    //   })
    //   .catch(function(error) {
    //     console.error("Error adding document: ", error);
    //   });
    // this.setState({ modalVisible: false });
  }

  Rating() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          // alert("Modal has been closed.");
        }}
      >
        <View
          style={{
            marginTop: 50,
            alignItems: "center",
            justifyContent: "center",
            flex: 1
          }}
        >
          <ScrollView style={{ width: PAGE.width }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                margin: 15
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  textAlign: "center",
                  fontWeight: "bold"
                }}
              >
                {this.props.lang==="en"?"Please Rate Your Visit At":"يرجى تقييم زيارتك في"}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  textAlign: "center",
                  fontWeight: "bold",
                  marginBottom: 10
                }}
              >
                {this.state.venueName}
              </Text>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={this.state.newRateMe}
                selectedStar={rating => {
                  this.setState({ newRateMe: rating });
                }}
                fullStarColor={"gold"}
                containerStyle={{ borderColor: "lightblue" }}
                emptyStarColor={"gold"}
                reversed={this.props.lang === "ar" ? true : false}
              />
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  fontWeight: "bold",
                  marginTop: 30,
                  marginBottom: 10
                }}
              >
                 {this.props.lang==="en"?"Please provide your feedback on the services":"يرجى تقديم ملاحظاتكم على الخدمات"}
              </Text>

              <TextInput
                style={{
                  height: 150,
                  padding: 20,
                  paddingTop: 10,
                  borderColor: "gray",
                  borderWidth: 1,
                  borderRadius: 20,
                  width: PAGE.width - 70
                }}
                onChangeText={text => this.setState({ feedbackText: text })}
                value={this.state.feedbackText}
                multiline={true}
                numberOfLines={4}
                placeholder={this.props.lang==="en"?"Comments Goes Here":"التعليقات تذهب هنا"}
              />

              <Text
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  fontWeight: "bold",
                  marginTop: 40,
                  marginBottom: 10
                }}
              >
                {this.props.lang==="en"?"Attach Images (Optional)":"إرفاق الصور (اختياري)"}
              </Text>
              <ProfileImagePicker
                onThumbPress={index =>
                  console.log("thumbnail image tapped, id: ", index)
                }
                thumbnailItems={this.state.thumbnailImages}
                onImagePick={image => {
                  this.props.actions.uploadImageToFirebase(image, uri => {
                    let arrayHolder = this.state.thumbnailImages.slice();
                    arrayHolder = [...arrayHolder, uri];
                    this.setState({ thumbnailImages: arrayHolder });
                  });
                }}
                onDelete={index => {
                  let arrayHolder = this.state.thumbnailImages.slice();
                  arrayHolder.splice(index, 1);
                  this.setState({ thumbnailImages: arrayHolder });
                }}
              />
            </View>
            <View
              style={{
                marginTop: 15,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (
                    this.state.newRateMe > 0 &&
                    this.state.feedbackText != ""
                  ) {
                    this.updateRating();
                  } else {
                    const msg = this.props.lang==="en"?"Please Rate and provide comment to review the venue":"يرجى تقييم المكان"
                    alert(
                      msg
                    );
                  }

                  // this.setModalVisible(!this.state.modalVisible);
                }}
                style={{
                  backgroundColor: "#3f8ca1",
                  // backgroundColor: "#E13438",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                  height: 40,
                  width: 120,
                  alignSelf: "center",
                  margin: 10
                  // flexDirection: 'row',
                  // marginLeft:this.props.lang==="en"?10:0,
                  // marginRight:this.props.lang==="en"?0:10
                }}
              >
                <Text style={{ color: "white" }}>Rate</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
                style={{
                  backgroundColor: "#E13438",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                  height: 40,
                  width: 120,
                  alignSelf: "center",
                  margin: 10
                  // flexDirection: 'row',
                  // marginLeft:this.props.lang==="en"?10:0,
                  // marginRight:this.props.lang==="en"?0:10
                }}
              >
                <Text style={{ color: "white" }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.Rating()}

        <MenuHeader
          lang={this.props.lang}
          headerText={Translation.ownerHome.mainMenu[this.props.lang]}
          notif={this.state.notif}
          onPress={() => this.props.navigation.navigate("Notifications")}
        />
        <View style={{ flex: 1 }}>
          <Heading
            headingText={Translation.HomeScreen.title[this.props.lang]}
            subheadingText={Translation.HomeScreen.description[this.props.lang]}
          />
          <MainMenu
            lang={this.props.lang}
            onPress={c => {
              this.props.actions.setSelectedCategory(c);
              this.props.navigation.popToTop();
              this.props.navigation.navigate("VenueList");
            }}
          />
        </View>

        <View>
          <FooterTab
            onTabPress={route =>
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
  return {
    lang: state.Session.language,
    selectedFilter: state.Session.filterValue,
    profile: state.Session.currentUser
  };
}

function mapActionsToProps(dispatch) {
  const creators = Map()
    .merge(...actionsList)
    .filter(value => typeof value === "function")
    .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(HomeScreen);

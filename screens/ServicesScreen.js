import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Constants } from "expo";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as venue from "../src/Reducers/Session/Actions";
import VenueHeader from "../components/VenueHeader";
import VenueFooter from "../components/VenueFooter";
import AddServicesList from "../components/AddServicesList";

class ServicesScreen extends Component {
  static navigationOptions = {
    header: null
  };
  
  state = {
    selected: 1,
    route: "",
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <VenueHeader
            lang={this.props.lang}
            headerText={`Services`}
            notif={this.props.notification}
            backButton={() => {
              this.props.navigation.goBack()
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          {
            this.props.services.length > 0 ? 
              <AddServicesList
              lang={this.props.lang}
              data={this.props.services}
              onPress={value => {
              }}
              />
            :
              <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Text style={{ fontSize: 20 }}>Currenty no services for this category</Text>
              </View>
          }
          <View>
          <VenueFooter
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
      </View>
    )
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
  let services = [];
  if (state.Session && state.Session.currentVenue && state.Session.currentVenue.servicesOffers) {
    services = state.Session.currentVenue.servicesOffers.filter( i => i.category === state.Session.selectedService);
  }
  return {
    venueDetails: state.Session.currentVenue,
    lang: state.Session.language,
    venue: state.Session.currentVenue,
    selectedService: state.Session.selectedService,
    services: services
  };
}

function mapActionProps(dispatch) {
  return {
    actions: bindActionCreators(venue, dispatch)
  };
}

export default connect(mapStateToProps, mapActionProps)(ServicesScreen);
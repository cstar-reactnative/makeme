import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList
} from "react-native";
import Communications from 'react-native-communications';
import { Constants } from "expo";
import { Entypo, Feather, Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as venue from "../src/Reducers/Session/Actions";
import moment from 'moment';
import VenueHeader from "../components/VenueHeader";
import VenueFooter from "../components/VenueFooter";
import Heading from "../components/Heading";
import Translation from '../assets/translation';
//import { connect } from "http2";

const PAGE = Dimensions.get('window');
class VenueNotifications extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    selected: 1,
    route: "",
    notif: true,
    notifications: this.props.userNotifications,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.userNotifications !== nextProps.userNotifications) {
      this.setState({ notifications: nextProps.userNotifications });
    }
  }

  _keyExtractor = (item, index) => item.id;

  render() {
    return (
      <View style={styles.container}>
        <View>
          <VenueHeader
            lang={this.props.lang}
            headerText="Notifications"
            notif={this.state.notif}
            onPress={() => {}}
            settings={() => this.props.navigation.navigate("RegStep3")}
          />
        </View>

        <View style={{ flex: 1, justifyContent: 'center' }}>
          {
            this.state.notifications.length > 0 ?
            <FlatList
              style={{ flex: 1, backgroundColor: 'whitesmoke' }}
              data={(() => {
                const sorted = this.state.notifications.sort(function compare(a, b) {
                  var dateA = new Date(a.createdAt);
                  var dateB = new Date(b.createdAt);
                  return dateB - dateA;
                });
                return sorted
              })()}
              keyExtractor={this._keyExtractor}
              renderItem={(item, index) => {
                if (item.item.type !== 'newVenue') {
                  return (
                    <View style={{ padding: 15, marginTop: 8, backgroundColor: '#fff' }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ color: item.item.bookingStatus === 'cancelled' ? 'tomato' : 'orange', fontWeight: '700', fontSize: 17 }}>{item.item.bookingStatus.toUpperCase()}</Text>
                        <Text style={{ fontSize: 12, fontWeight: '300' }}>{moment(item.item.createdAt).fromNow()}</Text>
                      </View>
                      <Text style={{ marginTop: 5 }}>
                        Customer {item.item.userDetails.firstName} booked <Text style={{ fontWeight: '500', color: '#2c3e50' }}>{item.item.serviceName}</Text> service on {item.item.userDetails.date}.
                      </Text>
                    </View>
                  )
                } else {
                  return <View />
                }
              }
              }
            />
            :
            <Heading
              headingText={Translation.emptyContainersMessages.notification[this.props.lang]}
              subheadingText={Translation.emptyContainersMessages.notificationSub[this.props.lang]}
            />
          }
        </View>

        <View>
          <VenueFooter
            onTabPress={(tabId, route)=> this.setState({
              selected:tabId,
              route: route,
            })}
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
    userNotifications: state.Session.userNotifications,
  };
}

function mapActionProps(dispatch) {
  return {
    actions: bindActionCreators(venue, dispatch)
  };
}


export default connect(mapStateToProps, mapActionProps)(VenueNotifications);
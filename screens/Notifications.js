import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions
} from "react-native";
import { Constants } from "expo";
import { Entypo, Feather, Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as venue from "../src/Reducers/Session/Actions";
import moment from 'moment';
import MenuHeader from "../components/MenuHeader";
import FooterTab from "../components/FooterTab";
import Heading from "../components/Heading";
import Translation from '../assets/translation';

const PAGE = Dimensions.get('window');
class Notifications extends Component {
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

  notif(){
    const sorted = this.state.notifications.sort(function compare(a, b) {
      var dateA = new Date(a.createdAt);
      var dateB = new Date(b.createdAt);
      return dateB - dateA;
    });
    return sorted;
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <MenuHeader
            lang={this.props.lang}
            headerText={Translation.emptyContainersMessages.notification[this.props.lang]}
            notif={this.state.notif}
            onPress={() => {}}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
        {
          this.state.notifications.length > 0 ?
          <FlatList
            style={{ flex: 1, backgroundColor: 'whitesmoke' }}
               data={(() => {
                return this.notif();
              })()}
            keyExtractor={this._keyExtractor}
            renderItem={(item, index) => {
                if (item.item.type === 'newVenue') {
                  return (
                    <View style={{ padding: 15, marginTop: 8, backgroundColor: '#fff' }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontWeight: '600', fontSize: 17 }}>{item.item.venueName}</Text>
                        <Text style={{ fontSize: 12, fontWeight: '300' }}>{moment(item.item.createdAt).fromNow()}</Text>
                      </View>
                      <Text style={{ marginTop: 5 }}>
                        {item.item.message}
                      </Text>
                    </View>
                  )
                } else {
                  return (
                    <View style={{ padding: 15, marginTop: 8, backgroundColor: '#fff' }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontWeight: '600', fontSize: 17 }}>{item.item.venueName}</Text>
                        <Text style={{ fontSize: 12, fontWeight: '300' }}>{moment(item.item.createdAt).fromNow()}</Text>
                      </View>
                      <Text style={{ marginTop: 5 }}>
                        You're <Text style={{ fontWeight: '500', color: '#2c3e50' }}>{item.item.bookingDetails.bookingService}</Text> booking on {item.item.bookingDetails.bookingDate} - {item.item.bookingDetails.bookingTime}, have been <Text style={{ color: item.item.bookingDetails.bookingStatus === 'rejected' ? 'red' : 'green', fontWeight: '700' }}>{item.item.bookingDetails.bookingStatus}</Text>.
                      </Text>
                    </View>
                    )
                }
              }
            }
          />
          :
          <View style={{ backgroundColor: 'whitesmoke', flex: 1, justifyContent: 'center' }}>
            <Heading
              headingText={Translation.emptyContainersMessages.notification[this.props.lang]}
              subheadingText={Translation.emptyContainersMessages.notificationSub[this.props.lang]}
            />
          </View>
        }
        </View>

        <View>
          <FooterTab
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


export default connect(mapStateToProps, mapActionProps)(Notifications);
import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from "react-native";
import { Constants } from "expo";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import MenuHeader from "../components/MenuHeader";
import FooterTab from "../components/FooterTab";
import ProgressDots from "../components/ProgressDots";
import RoundButton from "../components/RoundButton";
import SelectService from "../components/SelectService";
import AddServiceToCategory from "../components/AddServiceToCategory";
import * as setVenueServices from "../src/Reducers/Session/Actions";
import Translation from '../assets/translation';
import firebase from "../src/config/firestoreConfig";
var db = firebase.firestore();
import moment from 'moment';

class RegStepOne extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super();
    this.state = {
      route: "",
      notif: true,
      currentStep: 1,
      name: "",
      price: "",
      discount: "",
      homeService: false,
      selectedItems: [],
      selectedTab: 0,
      items: [],
      services: props.venueDetails.servicesOffers !== undefined && props.venueDetails.servicesOffers.length > 0 ? props.venueDetails.servicesOffers : [],
      offerArr:[]
    };
  }
  componentDidMount() {
    var teamMemberText = Translation.profile.searchTeamMember[this.props.lang]
    this.props.actions.getTeamMembers((err, res) => {
      let items = [
        {
          name: teamMemberText,
          id: '0',
          children: null
        }
      ];
      if (err) console.log('error ======>> ',err);
      if (res) {
        items[0].children = res;
        this.setState({ items: items})
      }
    })
  }

  filterServices() {
    const { selectedTab } = this.state;
    if (selectedTab === 0) {
      const hair = this.state.services.filter(i => i.category === 'hair')
      return hair;
    } else if (selectedTab === 1) {
      return this.state.services.filter(i => i.category === 'nail')
    } else if (selectedTab === 2) {
      return this.state.services.filter(i => i.category === 'body')
    } else if (selectedTab === 3) {
      return this.state.services.filter(i => i.category === 'face')
    } else {
      return this.state.services;
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <MenuHeader
            lang={this.props.lang}
            headerText={Translation.profile.addServices[this.props.lang]}
            cancelButton={() => {
              this.props.navigation.navigate("VenueHome")
            }}
            // notif={this.state.notif}
            // onPress={() => this.props.navigation.navigate("Notifications")}
          />
        </View>
        <ProgressDots
          lang={this.props.lang}
          currentStep={this.state.currentStep}
          onDotPress={step => {
            this.props.navigation.navigate(`RegStep${step}`);
          }}
        />
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
        >
          <View>
            <SelectService
              lang={this.props.lang}
              dimension={{ height: 35, width: 70 }}
              selected={this.state.selectedTab}
              onPress={index => {
                this.setState({ selectedTab: index });
              }}
            />
          </View>

          <View>
            <AddServiceToCategory
              lang={this.props.lang}
              onEdit={(index, name, price, members, discount, homeService) => {
                this.setState({
                  name: name,
                  price: price,
                  selectedItems: members,
                  discount: discount,
                  homeService: homeService
                });

                const i = this.state.selectedTab;
                let arrayHolder = this.state.services;
                const newdata = arrayHolder.filter(i => i.serviceName !== name);
                this.setState({ services: newdata });
              }}
              onDelete={(index, name) => {
                let arrayHolder = this.state.services;
                const newdata = arrayHolder.filter(i => i.serviceName !== name);
                this.setState({ services: newdata });
              }}
              onAddPress={() => {
                let category = "";
                if (
                  this.state.name === "" ||
                  this.state.price === "" ||
                  this.state.selectedItems.length === 0
                ) {
                  alert("Please fill-out service name, price and members");
                  return;
                }
                const i = this.state.selectedTab;
                let arrayHolder = this.state.services;
                if (i === 0) {
                  category = 'hair'
                } else if (i === 1) {
                  category = 'nail'
                } else if (i === 2) {
                  category = 'body'
                } else {
                  category = 'face'
                }
                arrayHolder = [
                  ...this.state.services,
                  {
                    serviceName: this.state.name,
                    price: this.state.price,
                    members: this.state.selectedItems,
                    discount: this.state.discount,
                    homeService: this.state.homeService,
                    category: category,
                  }
                ];

                let offerArr = this.state.offerArr
                if(this.state.discount!=""){
                  offerArr = [
                    ...this.state.offerArr,
                    {
                      serviceName: this.state.name,
                      price: this.state.price,
                      members: this.state.selectedItems,
                      discount: this.state.discount,
                      homeService: this.state.homeService,
                      category: category,
                    }
                  ];
                }

                this.setState({
                  services: arrayHolder,
                  offerArr: offerArr,
                  name: "",
                  price: "",
                  discount: "",
                  selectedItems: [],
                  homeService: false
                });
              }}
              services={this.filterServices()}
              homeService={this.state.homeService}
              onCheck={() =>
                this.setState({ homeService: !this.state.homeService })
              }
              items={this.state.items}
              selectedItems={this.state.selectedItems}
              onSelectedItemsChange={selectedItems => {
                this.setState({ selectedItems });
              }}
              name={this.state.name}
              price={this.state.price}
              discount={this.state.discount}
              onChangeName={text => this.setState({ name: text })}
              onChangePrice={text => this.setState({ price: text })}
              onChangeDiscount={text => this.setState({ discount: text })}
            />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: this.props.lang === "ar" ? "row" : "row-reverse",
              justifyContent: "center",
              paddingTop: 20,
              paddingBottom: 20
            }}
          >
            <RoundButton
              textColor="black"
              text={Translation.profile.save[this.props.lang]}
              fontSize={20}
              style={{
                alignSelf: "center",
                borderRadius: 33,
                backgroundColor: "white",
                borderWidth: 1,
                height: 60,
                width: 120,
                justifyContent: "center",
                alignItems: "center",
                margin: 10
              }}
              onPress={() => {
                const offers = this.state.services.filter(i => i.discount > 0);
                console.log("______offerArr_____",this.state.offerArr)
                const data = { servicesOffers: this.state.services, offer: offers.length > 0 }
                this.props.actions.updateCurrentVenue(
                  data,
                  'secondStep',
                  (err, res) => {
                    if (err) { Alert.alert('Ooops!', 'Cannot process right now')}
                    if (res) {
                      try{
                      this.state.offerArr.map(e=>{
                        db.collection('users').get().then(users => {
                          users.forEach(item => {
                            const { firstName } = item.data();
                            const message = {
                              hasRead: false,
                              notificationType: 'user',
                              type: 'newVenue',
                              "userId": item.id,
                              createdAt: moment().format('LLL'),
                              venueName: " * New Offer * ",
                              "message": `Hi ${firstName} there is a new offer for ${e.category} as ${e.serviceName} available for booking at ${this.props.venueDetails.name}.`
                            };
                    
                            db.collection('notifications').add(message).then(ref => {
                              
                            }).catch((err) => {
                              console.log('error')
                            })
                            
                          });
                        }).catch(error => {
                          console.log('error fetching users', error);
                        })
                      })
                    }catch(e){
                      console.log('cannot send offer notification', e);
                    }finally{
                      this.props.navigation.navigate("VenueHome");
                    }
                    }
                  }
                );


              }}
            />
            <RoundButton
              textColor="black"
              text={Translation.profile.back[this.props.lang]}
              fontSize={20}
              style={{
                alignSelf: "center",
                borderRadius: 30,
                backgroundColor: "white",
                borderWidth: 1,
                height: 60,
                width: 120,
                justifyContent: "center",
                alignItems: "center",
                margin: 10
              }}
              onPress={() => {
                this.props.navigation.navigate("RegStep2");
              }}
            />
          </View>
        </ScrollView>
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
    venueDetails: state.Session.currentVenue,
  };
}

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators(setVenueServices, dispatch)
  };
}

export default connect(mapStateToProps, mapActionsToProps)(RegStepOne);

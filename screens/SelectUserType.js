import React, { Component } from 'react';
import {  View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Constants } from 'expo'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Heading from '../components/Heading'
import RoundButton from '../components/RoundButton'
import * as chooseUserType from '../src/Reducers/Session/Actions'
import Translation from '../assets/translation';

class SelectUserType extends Component {

  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <View style={styles.container}>
        {/* {
          this.props.isLoading &&
            <View style={{ zIndex: 1, position: 'absolute', backgroundColor: 'rgba(255,255,255,0.3)' }}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
        } */}
        <View style={{margin: 10,flex:2}}>
          <Heading
            imageSource={require('../assets/logo2.png')}
            headingText={Translation.userType.title[this.props.lang]}
            subheadingText={Translation.userType.subheading[this.props.lang]}
          />
        </View>
        <View style={{width: '100%', alignItems: 'center',flex:2}}>
          <RoundButton
            text={Translation.userType.user[this.props.lang]}
            style={[styles.buttonStyle, {backgroundColor: '#dbf4fb'}]}
            textColor='#000'
            fontSize={20}
            onPress={()=> {
              this.props.actions.setUserType('user');
              this.props.navigation.navigate('SignUp')
                // this.props.actions.chooseUserType('user', (err, res) => {
                //   this.props.navigation.navigate('SignUp')
                // })
            }}
          />
          <RoundButton
            text={Translation.userType.businessOwner[this.props.lang]}
            style={styles.buttonStyle}
            textColor='#000'
            fontSize={20}
            onPress={()=> {
              this.props.actions.setUserType('businessOwner');
              this.props.navigation.navigate('SignUp')
              // this.props.actions.chooseUserType('businessOwner', (err, res) => {
              //   this.props.navigation.navigate('SignUp')
              // })
            }}
          />
        </View>
        <View
            style={{
              flexDirection: "row",
              flex:1,
              // marginTop: 20,
              justifyContent: "center",
              alignItems:"flex-end"
            }}
          >
            <RoundButton
              text={Translation.userType.cancel[this.props.lang]}
              style={[styles.buttonStyle, { borderColor: "#000" ,width:"35%"}]}
              textColor="#000"
              fontSize={20}
              onPress={() => {
                this.props.navigation.goBack();
                // this.props.actions.setUserDetails(this.state);
              }}
            />
           
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: '70%',
    margin: 10,
    borderWidth: 2,
    borderRadius: 40,
    borderColor: '#000'
  }
});
function mapStateToProps(state) {
  return {
    isLoading: state.Session.isLoading,
    lang: state.Session.language
  }
}

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators(chooseUserType, dispatch),
  }
}

export default connect(mapStateToProps, mapActionsToProps)(SelectUserType);
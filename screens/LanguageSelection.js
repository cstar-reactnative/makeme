import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Constants } from 'expo'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RoundButton from '../components/RoundButton'
import * as chooseLanguage from '../src/Reducers/Session/Actions';

class LanguageSelection extends Component {

  static navigationOptions = {
    header: null
  }
 
  render() {
    return (
      <View style={styles.container}>
        <View style={{marginTop: 50}}>
          <Image
            source={require('../assets/logo2.png')}
            style={{height: 110, width: 110}}
          />
        </View>
        
        <View>
          <Text style={[styles.text,{fontWeight: 'bold',fontSize: 60}]}>
            MAKE ME
          </Text>
          <Text style={[styles.text,{fontSize: 24}]}>
            Choose Language
          </Text>
        </View>
        <View style={{width: '100%', alignItems: 'center'}}>
          <RoundButton
            text="ENGLISH"
            style={styles.buttonStyle}
            textColor='#3f8ca1'
            fontSize={20}
            onPress={()=>{
              this.props.actions.chooseLanguage('en', () => {
                this.props.navigation.navigate('LocationNoUser')
              });
            }}
          />
          <RoundButton
            text="العَرَبِيَّة"
            style={styles.buttonStyle}
            textColor='#3f8ca1'
            fontSize={20}
            onPress={()=>{
              this.props.actions.chooseLanguage('ar', () => {
                this.props.navigation.navigate('LocationNoUser')  
              });
            }}
          />
        </View>

        <View style={{paddingBottom:"20%"}}>
          {/* <Image
            source={require('../assets/lady_flower.png')}
            style={{height: 200, width: 170}}
          /> */}
        </View>
      </View>
    ); 
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#dbf4fb'
  },
  text: {
    textAlign: 'center',
    color: '#3f8ca1'
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: '70%',
    margin: 10,
    borderWidth: 2,
    borderRadius: 40,
    borderColor: '#3f8ca1'
  }
})

function mapStateToProps(state) {
  return {
    currentUser: state.Session.currentUser,
  }
}

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators(chooseLanguage, dispatch),
  }
}
export default connect(mapStateToProps, mapActionsToProps)(LanguageSelection);


import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import {Foundation} from '@expo/vector-icons'
import Translation from '../assets/translation';

const PAGE = Dimensions.get('window');

const Switch = props => {

  genderSelector = () => {
    let gender = props.gender==='female'?true:false
      return (
        <View style={styles.switch}>
          <TouchableOpacity onPress={()=>props.switchGender('female')}>
            <View style={gender?styles.selected:styles.unselected}>
              <Foundation name="female-symbol" size={40} color={gender?"white":"black"}/>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>props.switchGender('male')}>
            <View style={!gender?styles.selected:styles.unselected}>
              <Foundation name="male-symbol" size={40} color={!gender?"white":"black"}/>
            </View>
          </TouchableOpacity>
        </View>
      )

  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{Translation.profile.female[props.lang]}</Text>
        {genderSelector()}
      <Text style={styles.text}> {Translation.profile.male[props.lang]} </Text>
    </View>
  )
};

export default Switch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 5,
  },
  switch:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 40,
    width: '40%',
  },
  selected: {
    height: 40,
    width: 40,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowOffset: { height: 3 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 2
  },
  unselected: {
    height: 40,
    width: 40,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  text: {
    fontSize: 20,
    paddingHorizontal: 5
  }
})

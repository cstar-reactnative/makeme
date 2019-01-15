import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Translation from '../assets/translation';

const ProgressDots = props => {
  return (
    <View>
      <View style={props.lang === "ar" ? styles.dotRow : styles.dotRowEN}>

        <TouchableOpacity
          onPress={()=>props.onDotPress(1)}
          style={[
            styles.dot,
            {
            backgroundColor: props.currentStep===1?'lightblue':'transparent'
            }
          ]}>
        </TouchableOpacity>

        <View style={styles.line}>
        </View>

        <TouchableOpacity
          onPress={()=>props.onDotPress(2)}
          style={[
            styles.dot,
            {
            backgroundColor: props.currentStep===2?'lightblue':'transparent'
            }
          ]}>
        </TouchableOpacity>

        <View style={styles.line}>
        </View>

        <TouchableOpacity
          onPress={()=>props.onDotPress(3)}
          style={[
            styles.dot,
            {
            backgroundColor: props.currentStep===3?'lightblue':'transparent'
            }
          ]}>
        </TouchableOpacity>

      </View>

      <View style={props.lang === "ar" ? styles.textRow : styles.textRowEN}>
        <Text style={styles.text}>
          {props.currentStep===1 ? Translation.profile.services[props.lang] : null}
        </Text>
        <Text style={styles.text}>
          {props.currentStep===2 ? Translation.profile.team[props.lang]:null}
        </Text>
        <Text style={styles.text}>
          {props.currentStep===3 ? Translation.profile.profile[props.lang] : null}
        </Text>
      </View>
    </View>
  )
};

export default ProgressDots;

const styles = StyleSheet.create({
  dotRow:{
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  dotRowEN:{
    paddingTop: 15,
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  dot:{
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 3,
  },
  textRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
    paddingHorizontal: '3%'
  },
  textRowEN:{
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
    paddingHorizontal: '3%'
  },
  line: {
    borderWidth: 1,
    width: '35%'
  },
  text:{
    fontSize: 14,
    fontWeight: 'bold'
  }
});
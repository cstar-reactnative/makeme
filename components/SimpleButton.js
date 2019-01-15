import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';

const SimpleButton = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>تسجيل</Text>
      </TouchableOpacity>
    </View>
  )
};

export default SimpleButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#bde6ee'
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    padding: 20
  }
});
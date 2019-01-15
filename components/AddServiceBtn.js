import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Translation from '../assets/translation';
const AddServiceBtn = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={props.disabled}
        style={styles.button}
        onPress={() => props.navigation.navigate("Checkout")}
      >
        <Text style={styles.buttonText}>{Translation.booking.completeReservation[props.lang]} ({props.total})</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddServiceBtn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
    // backgroundColor: '#ecf0f1',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#bde6ee"
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    padding: 20
  }
});

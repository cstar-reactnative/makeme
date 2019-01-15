import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import Translation from '../assets/translation';

const LocationInput = props => {
  return (
    <TouchableOpacity
      onPress={() => props.mapLocation()}
      style={ props.lang === "ar" ? styles.container : styles.containerEng }
    >
      <EvilIcons name="location" size={24} />
      {/* <Text style={{marginHorizontal:5}}>{props.mapLocation}</Text> */}
      <Text style={{ fontSize: 18 }}>
        {props.text ? props.text : Translation.profile.getCurrentLocation[props.lang]}
      </Text>
    </TouchableOpacity>
  );
};

export default LocationInput;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 15,
    paddingTop: 5,
    backgroundColor: "white",
    flexDirection: "row",
    paddingBottom: 5,
    borderBottomWidth: 1,
    justifyContent: "space-between"
  },
  containerEng: {
    marginTop: 20,
    marginRight: 15,
    paddingTop: 5,
    backgroundColor: "white",
    flexDirection: "row-reverse",
    paddingBottom: 5,
    borderBottomWidth: 1,
    justifyContent: "space-between"
  }
});

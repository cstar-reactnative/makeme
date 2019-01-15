import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";
import Translation from '../assets/translation';

const CheckoutCard = props => {
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.paddingVertical}
          onPress={props.removeOnPress}
        >
          <Entypo
            name="circle-with-cross"
            size={30}
            color={"red"}
          />
        </TouchableOpacity>
        <View style={styles.paddingVertical}>
          <Text style={{ fontSize: 16, textAlign: "left" }}>{Translation.forTranslations.Price[props.lang]}</Text>
          <Text style={{ fontSize: 13, color: "gray", textAlign: "right" }}>
            {props.servicePrice} {Translation.profile.sar[props.lang]}
          </Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.paddingVertical}>
          <Text
            style={{ fontSize: 16, fontWeight: "bold", textAlign: "right" }}
          >
            {props.date}
          </Text>
          <Text style={{ fontSize: 13, color: "gray", textAlign: "right" }}>
            {props.schedule}
          </Text>
        </View>
        <View style={styles.paddingVertical}>
          <Text
            style={{ fontSize: 16, fontWeight: "bold", textAlign: "right" }}
          >
            {props.serviceOffered}
          </Text>
          <Text style={{ fontSize: 13, color: "gray", textAlign: "right" }}>
            {Translation.forTranslations.by[props.lang]} {props.teamMember}
          </Text>
        </View>
        {/* <View style={styles.paddingVertical}>
          <Text style={{fontSize: 16, textAlign: 'right'}}>{props.serviceOffered}</Text>          
        </View> */}
      </View>
    </View>
  );
};

export default CheckoutCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    paddingTop: 4,
    paddingBottom: 4,
  },

  details: {
    flex: 5,
    // flexDirection: 'row',
    justifyContent: "space-between"
  },

  paddingVertical: {
    paddingVertical: 5
  }
});

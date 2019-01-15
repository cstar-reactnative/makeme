import React, { Component } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as setService from "../src/Reducers/Session/Actions";
import Translation from '../assets/translation';

// var StyleSheet = require("react-native-debug-stylesheet");

import { MaterialIcons } from "@expo/vector-icons";

checkIfItemIsInCart = (item, cartArray) => {
  const res = cartArray.filter(i => i.serviceOffered === item);
  if (res.length > 0) {
    return true
  }
  return false
}

const AddServicesList = props => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.columnOne}>
          <FlatList
            style={styles.flatcontainer}
            data={props.data}
            keyExtractor={(x, i) => i.toString()}
            extraData={props.data}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={props.lang === "ar" ? styles.innerFlatContainer : styles.innerFlatContainerEN}
                onPress={() => {
                  props.onPress(item);
                }}
              >
                <View style={styles.innerViewOne}>
                  {props.lang === "ar" ? <Text style={styles.textResult1}>{Translation.profile.sar[props.lang]} {item.price}</Text> :  <Text style={styles.textResult1}> {item.price} SAR</Text>}
                </View>
                <View>
                {
                  item.discount ?
                    <View style={{ backgroundColor:  'tomato', justifyContent: 'center', padding: 3, width: 60, alignItems: 'center', borderRadius: 16 }}>
                      <Text style={{ color: 'white', fontWeight: '500' }}>{Translation.labels.offer[props.lang]}</Text>
                    </View>
                    :
                    <View />
                  }
                </View>
                <View style={styles.innerViewTwo}>
                  <Text style={styles.textResult2}>{item.serviceName} </Text>
                  {
                    props.currentCart &&
                      this.checkIfItemIsInCart(item.serviceName, props.currentCart) &&
                      <MaterialIcons size={30} name="check" color="#517fa4" />
                  }
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default AddServicesList;

const styles = StyleSheet.create({
  container: {
    flex: 6,
    flexDirection: "row"
  },
  innerContainer: {
    flex: 1,
    flexDirection: "column"
  },
  columnOne: {
    flex: 6
    // backgroundColor: "white"
  },
  flatcontainer: {
    flex: 1
  },
  innerFlatContainer: {
    flex: 1,
    flexDirection: "row",
    borderColor: "#c6c6c6",
    borderWidth: 0.2,
    padding: 14,
    justifyContent: "space-between"
  },
  innerFlatContainerEN: {
    flex: 1,
    flexDirection: "row-reverse",
    borderColor: "#c6c6c6",
    borderWidth: 0.2,
    padding: 14,
    justifyContent: "space-between"
  },
  innerViewOne: {
    flexDirection: "row",
    
  },
  innerViewTwo: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center'
  },
  textResult1: {
    fontSize: 18
  },
  textResult2: {
    fontSize: 18
  },
  columnTwo: {
    flex: 1
  },
  columnTwoFirstRow: {
    flex: 1,
    // backgroundColor:"red",

    flexDirection: "row",
    alignItems: "flex-end"
  },
  scroll: {
    height: 120
  },
  modalBtnContainer: {
    flexDirection: "row",
    marginBottom: 30,
    marginTop: 20,
    justifyContent: "space-around"
  }
});

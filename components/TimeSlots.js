import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

checkIfHourIsAlreadyCheck = (item, cart) => {
  res = cart.filter( i => i.schedule === item);
  if (res.length > 0) {
    return true;
  }
  return false;
}

const TimeSlots = props => {

  return (
    <View
      style={[
        styles.container,
        props.dimension,
        {
          backgroundColor: props.selected ? 'lightblue' : !props.available ? 'red' : 'white',
        }
      ]}
      >
      <Text style={{fontSize: 16, textAlign: 'center', color: !props.available ? 'black' : 'black', padding: 3 }}>
        {props.boxLabel}
      </Text>
    </View>
  )
};

export default TimeSlots;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 5,
    marginVertical: 15,
    borderRadius: 5,
    shadowOffset: { height: 3 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5
  },

});
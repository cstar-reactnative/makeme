import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CategoryBox = props => {

  return (
    <View
      style={[
        styles.container,
        props.dimension,
        {
          backgroundColor: !props.available && props.userType === 'businessOwner' ? 'red' : props.disabled ? 'grey' : props.selected ? 'lightblue' : 'white'
        }
      ]}
      >
      <Text style={{fontSize: 16, textAlign: 'center', color: props.disabled ? 'white' : 'black' }}>
        {props.boxLabel}
      </Text>
    </View>
  )
};

export default CategoryBox;

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
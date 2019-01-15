import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const RoundButton = props => {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress = {props.onPress}
      style={props.style}
    >
      <Text style={{color: props.textColor, fontSize: props.fontSize}}>{props.text}</Text>
    </TouchableOpacity>
  )
};

export default RoundButton;




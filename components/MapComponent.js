import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Location, Permissions, Constants, MapView } from "expo";

class MapComponent extends Component {
  render() {
    return (
      <View>
        <Text>
          Map Component
        </Text>
      </View>
    )
  }
}

export default MapComponent;
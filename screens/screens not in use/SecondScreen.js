import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';

import Showcase from '../components/Showcase'

export default class ShowcaseScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Showcase
          images={[
            'https://picsum.photos/200/300?image=998',
            'https://picsum.photos/200/300?image=903',
            'https://picsum.photos/200/300?image=882',
            'https://picsum.photos/200/300?image=823',
            'https://picsum.photos/200/300?image=777',
          ]}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingVertical: 25
  }
});
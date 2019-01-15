import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Heading = props => {
  return (
    <View style={styles.container}>
      {
        props.imageSource?
        <Image
          style={styles.image}
          source={props.imageSource}
        />:null
      }

      {
        props.headingText?
        <Text style={styles.heading}>
          {props.headingText}
        </Text>:null
      }
      
      {
        props.subheadingText?
        <Text style={styles.subheading}>
          {props.subheadingText}
        </Text>:null
      }
           
    </View>
  )
};

export default Heading;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 95,
    height: 95,
  },
  heading: {
    marginTop: 5,
    fontSize: 34,
    fontWeight: 'bold',
  },
  subheading: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center'
  }
})

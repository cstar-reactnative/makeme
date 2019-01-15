import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper'

const Showcase = props => {

  populateSlides = () =>{
    return(
      props.images.map((item, i)=>{
        return(
          <View key={i} style={{justifyContent: 'center', alignItems: 'center',}}>
            <Image
              style={{width: '100%', height: 350}}
              source={{uri: item}}
            />
            <Text>{item}</Text>
          </View>
        )
      })
    )
  }

    return (
        <Swiper
          height={'40%'}
          width={'100%'}
          paginationStyle={{
            bottom: 15, left: 1, right: 1
          }}
        >
          {populateSlides()}
        </Swiper>
    );
};

export default Showcase;

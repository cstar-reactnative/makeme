import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { Entypo } from '@expo/vector-icons'
import Translation from '../assets/translation';
import uuid from 'u-uid';

const checkoutIfOffer = (category, services) => {
  const filterbyCategory = services.filter(i => i.category === category);
  const checkifOffer = filterbyCategory.filter(z => z.discount > 0);
  if (checkifOffer.length > 0) {
    return true
  }
  return false
}

const TouchableList = props => {

  return (
    <View style={styles.container}>
      <FlatList
        data={props.data}
        renderItem={({item, index}) => (
          <TouchableOpacity 
            onPress={()=>{
              props.onItemPress(item.value)
            }}
            style={props.lang === "ar" ? styles.listContainer : styles.listContainerEN}
          >
            <View>
              {props.lang === "ar" ? <Entypo name="chevron-thin-left" size={30}/> : <Entypo name="chevron-thin-right" size={30}/>}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text>{item.label[props.lang]}</Text>
              {
                checkoutIfOffer(item.value.toLowerCase(), props.servicesOffers) &&
                  <View style={{ marginLeft: 20, backgroundColor:  'tomato', justifyContent: 'center', padding: 3, width: 60, alignItems: 'center', borderRadius: 16 }}>
                    <Text style={{ color: 'white', fontWeight: '500' }}>{Translation.labels.offer[props.lang]}</Text>
                  </View>
              }
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, i) => uuid()}
      />
    </View>
  )
};

export default TouchableList;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: 'whitesmoke',
    paddingVertical: 5,
  },
  listContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 2.5,
    backgroundColor: 'white',
  },
  listContainerEN: {
    flexDirection: 'row-reverse',
    width: '100%',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 2.5,
    backgroundColor: 'white',
  }
})

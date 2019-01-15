import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'


const SearchInput = props => {
  return (
    <View style={styles.container}>
      <View style={ props.lang === "ar" ? styles.searchBar : styles.searchBarEN }>
        <TouchableOpacity onPress={props.onSearchPress}>
          <Ionicons name="ios-search-outline" size={35} />
        </TouchableOpacity>
        <TextInput
          placeholder={props.placeholder}
          style={{ textAlign: props.lang === "ar" ? 'right' : 'left', flex: 1}}
          onChangeText={props.onChangeText}
          value={props.searchValue}
          underlineColorAndroid='transparent'
          returnKeyType = 'search'
          
        />
      </View>
    </View>
  )
};

export default SearchInput;

const styles = StyleSheet.create({
  container:{
    marginHorizontal: 15,
    marginVertical: 5,
    backgroundColor: 'white',
  },
  searchBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderWidth: 2,
    borderRadius: 30,
    justifyContent: 'space-between',
  },
  searchBarEN: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderWidth: 2,
    borderRadius: 30,
    justifyContent: 'space-between',
  }
});

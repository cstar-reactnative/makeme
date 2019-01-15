import React from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import {Feather} from '@expo/vector-icons'

const Dropdown = props => {

  populateMenu = () => {
    return(
      props.menuItems.map((item, i)=>{
        return(
          <MenuOption onSelect={()=>props.onSelect(i)} key={i}>
            <Text>{item}</Text>
          </MenuOption>
        )
      })
    )
  }

  return (
    <View style={styles.container}>
      <Menu>
          <MenuTrigger style={styles.menuTrigger}>
            <Feather name="chevron-down" size={35} />
            <Text style={{fontSize: 18}}>{props.selectedValue}</Text>
          </MenuTrigger>
          <MenuOptions>
            {populateMenu()}
          </MenuOptions>
        </Menu>
    </View>
  )
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: 80,
    width: '60%',
    borderWidth: 2,
    borderRadius: 40,
  },
  menuTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    borderRadius: 40,
  }
})

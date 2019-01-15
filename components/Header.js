import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, Ionicons, Feather} from '@expo/vector-icons'
import Translation from '../assets/translation';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

const Header = props => {


  return (
    <View style={props.lang === "ar" ? styles.container : styles.containerEN}>
      <View style={{flexDirection: props.lang === "ar" ? 'row' : 'row-reverse'}} elevation={1}>
        {
          props.notif && 
          <TouchableOpacity>
            <MaterialIcons name="notifications-none" size={35}/>
            {props.notif?
            <View style={styles.notify}>
            </View>:null}
          </TouchableOpacity>
        }
        {
          props.filterShow &&
          <Menu>
            <MenuTrigger style={{marginLeft: 15}}>
              <Ionicons name="ios-options" size={35}/>
            </MenuTrigger>
            <MenuOptions>
              <MenuOption style={props.lang === "ar" ? styles.menuOption : styles.menuOptionEN} onSelect={()=>props.onSelect("By Distance")} >
                <Text>{Translation.forTranslations.byDistance[props.lang]}</Text>
                <Feather
                  name="check-circle"
                  size={20}
                  color={props.menuSelection==="By Distance"?'lightblue':'white'} 
                />
              </MenuOption>
              <MenuOption style={props.lang === "ar" ? styles.menuOption : styles.menuOptionEN} onSelect={()=>props.onSelect("By Rating")} >
              <Text>{Translation.forTranslations.byRating[props.lang]}</Text>
                <Feather
                  name="check-circle"
                  size={20}
                  color={props.menuSelection==="By Rating"?'lightblue':'white'} 
                />
              </MenuOption>
              <MenuOption style={props.lang === "ar" ? styles.menuOption : styles.menuOptionEN} onSelect={()=>props.onSelect("By Offer")} >
              <Text>{Translation.forTranslations.byOffer[props.lang]}</Text>
                <Feather
                  name="check-circle"
                  size={20}
                  color={props.menuSelection==="By Offer"?'lightblue':'white'} 
                />
              </MenuOption>
              
            </MenuOptions>
          </Menu>
        }
      </View>
      
      <View style={{ justifyContent: 'center' }}>
        <TouchableOpacity style={{flexDirection: props.lang === "ar" ? 'row' : 'row-reverse', alignItems: 'center'}} onPress={props.backButton}>
          <Text style={{fontSize: 20, alignItems: 'center', fontSize: 20, fontWeight: 'bold', paddingRight: 5,}}> {Translation.profile.back[props.lang]} </Text>
          {props.lang === "ar" ? <Feather name="arrow-right" size={25} /> : <Feather name="arrow-left" size={25} />}
        </TouchableOpacity>
      </View>
    </View>
  )
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    backgroundColor: 'white',
  },
  containerEN: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    backgroundColor: 'white',
  },
  notify: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: 'lightblue',
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: -10,
  },
  options: {
    position: 'absolute',
    zIndex: 10,
    minHeight: 150,
    width: 250,
    backgroundColor: 'lightblue',
    top: 20,
    left: 20,
  },
  menuOption:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
  menuOptionEN:{
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  }
})
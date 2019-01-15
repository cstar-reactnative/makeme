import React from 'react';
import Translation from '../assets/translation';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const MainMenu = props => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={styles.topLeft} onPress={()=>props.onPress('salon')}>
          <View style={styles.menuImage}>
            <Image
              source={require('../assets/menu/salon.png')}
              style={styles.menuIcon}
            />
            <Text style={styles.menuLabel}>{Translation.HomeScreen.salon[props.lang]}</Text>
          </View>
        </TouchableOpacity>
          
        <TouchableOpacity style={styles.bottomLeft} onPress={()=>props.onPress('home service')}>
          <View style={styles.menuImage}>  
            <Image
              source={require('../assets/menu/home-service.png')}
              style={styles.menuIcon}
            />
            <Text style={styles.menuLabel}>{Translation.HomeScreen.homeService[props.lang]}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <TouchableOpacity style={styles.topRight} onPress={()=>props.onPress('spa')}>
          <View style={styles.menuImage}> 
            <Image
              source={require('../assets/menu/home-service.png')}
              style={styles.menuIcon}
            />
            <Text style={styles.menuLabel}>{Translation.HomeScreen.spa[props.lang]}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomRight} onPress={()=>props.onPress('clinic')}>
          <View style={styles.menuImage}>
            <Image
              source={require('../assets/menu/clinics.png')}
              style={styles.menuIcon}
            />
            <Text style={styles.menuLabel}>{Translation.HomeScreen.clinics[props.lang]}</Text>
          </View>
        </TouchableOpacity> 
      </View>
    </View>
  )
};

export default MainMenu;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  topLeft: {
    flex: 1,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  bottomLeft: {
    flex: 1,
    borderTopWidth: 0.5,
    borderRightWidth: 0.5,
  },
  topRight: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
  },
  bottomRight: {
    flex: 1,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
  },
  menuImage:{
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuLabel:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  menuIcon: {
    height: 80,
    width: 80
  }
});

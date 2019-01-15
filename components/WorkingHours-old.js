import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Input, SafeAreaView } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Feather, EvilIcons } from '@expo/vector-icons'

const WorkingHours = props => {

  addToHours = () => {
    return(
      <FlatList
        data={props.schedules}
        renderItem={({item, index}) => (
          <View style={styles.schedule}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={()=>props.onDelete(index)}
              >
                <EvilIcons name="trash" size={35} color={'gray'}/>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>props.toggleEdit(index, item.open, item.close, item.day, item.isEditing)}
              >
                {
                  item.isEditing?
                  <Feather name="check-circle" size={23} color={'gray'} style={{paddingLeft: 5, paddingTop: 3}}/>:
                  <EvilIcons name="pencil" size={35} color={'gray'}/>
                }
              </TouchableOpacity>
            </View>
            <Menu style={{flexDirection: 'row'}}>
              <MenuTrigger disabled={!item.isEditing}>
                <Text style={{
                  color: item.isEditing?'black':'gray',
                  fontSize: 12,
                  textAlign: 'right',
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                }}>
                  {item.open}
                </Text>
              </MenuTrigger>
              <MenuOptions>
                {populateTimes(true, index, 'open')}
              </MenuOptions>
            </Menu>
            <Text style={{
                  color: item.isEditing?'black':'gray',
                  fontSize: 12,
                  textAlign: 'right',
                }}>to</Text>
            <Menu style={{flexDirection: 'row',}}>
              <MenuTrigger disabled={!item.isEditing}>
                <Text style={{
                  color: item.isEditing?'black':'gray',
                  fontSize: 12,
                  textAlign: 'right',
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                }}>
                  {item.close}
                </Text>
              </MenuTrigger>
              <MenuOptions>
                {populateTimes(true, index, 'close')}
              </MenuOptions>
            </Menu>
            <Menu style={{flexDirection: 'row',}}>
              <MenuTrigger disabled={!item.isEditing}>
                <Text style={{
                  color: item.isEditing?'black':'gray',
                  fontSize: 12,
                  textAlign: 'right',
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                }}>
                  {item.day}
                </Text>
              </MenuTrigger>
              <MenuOptions>
                  {populateDays(true, index)}
              </MenuOptions>
            </Menu>
          </View>
        )}
        keyExtractor={(item, i)=>i}
      />
    )
  }


  populateDays = (editing, index) => {
    return(
      props.days.map((day, i)=>{
        return(
          <MenuOption 
            key={i}
            onSelect={editing?()=>props.onDayEdit(day, index):()=>props.onDaySelect(day)}
          >
            <Text style={styles.text}>{day}</Text>
          </MenuOption>
        )
      })
    )
  }

  populateTimes = (editing, index, openOrClose) => {
    return(
      props.times.map((time, i)=>{
        return(
          <MenuOption 
            key={i}
            onSelect={editing?()=>props.onTimeEdit(time, index, openOrClose):()=>props.onTimeSelect(time, openOrClose)}
          >
            <Text style={styles.text}>{time}</Text>
          </MenuOption>
        )
      })
    )
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity onPress={props.onAdd}>
          <EvilIcons name="plus" size={30}/>
        </TouchableOpacity>
        <Menu style={{flexDirection: 'row'}}>
          <MenuTrigger style={styles.trigger}>
            <View>
              <EvilIcons name="chevron-down" size={20}/>
            </View>
            <Text style={styles.text}>{props.selectedTime(0)}</Text>
          </MenuTrigger>
          <MenuOptions>
            {populateTimes(null, null, 'open')}
          </MenuOptions>
        </Menu>
        <Menu style={{flexDirection: 'row',}}>
          <Text style={styles.text}>to</Text>
          <MenuTrigger style={styles.trigger}>
            <View>
              <EvilIcons name="chevron-down" size={20}/>
            </View>
            <Text style={styles.text}>{props.selectedTime(1)}</Text>
          </MenuTrigger>
          <MenuOptions>
            {populateTimes(null, null, 'close')}
          </MenuOptions>
        </Menu>
        <Menu style={{flexDirection: 'row',}}>
          <MenuTrigger style={styles.trigger}>
            <View>
              <EvilIcons name="chevron-down" size={20}/>
            </View>
            <Text style={styles.text}>{props.selectedDay}</Text>
          </MenuTrigger>
          <MenuOptions>
              {populateDays()}
          </MenuOptions>
        </Menu>
      </View>
      <View style={{backgroundColor: 'whitesmoke'}}>
        {addToHours()}
      </View>
    </SafeAreaView>
  )
};

export default WorkingHours;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  trigger: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginHorizontal: 7,
    paddingBottom: 5
  },
  text:{
    fontSize: 14,
    textAlign: 'right'
  },
  schedule: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    // paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
});

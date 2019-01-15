import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Form, Item, Input, Label } from 'native-base';
import { Feather, EvilIcons } from '@expo/vector-icons'
import Translation from '../assets/translation'

import Switch from '../components/Switch'
import WorkingHours from '../components/WorkingHours'

const GroupAdd = props => {

  addToGroup = () => {
    return(
      <FlatList
        inverted={true}
        data={props.members}
        renderItem={({item, index}) => (
          <View style={styles.member}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={()=>props.onDelete(index, item.id)}
              >
                <EvilIcons name="trash" size={35} color={'gray'}/>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={()=>props.toggleEdit(index, item.name, item.gender, item.isEditing)}
                onPress={()=>props.onEdit(index, item.name, item.gender, item.availability, item.id)}
              >
                <EvilIcons name="pencil" size={35} color={'gray'}/>
              </TouchableOpacity>
            </View>
            <Input
              onChangeText = {(text)=>props.onEditGender(text, index, item.name, item.isEditing)}
              disabled={!item.isEditing}
              style={{
                flex: 0.75,
                // color: item.isEditing?'black':'gray',
                fontSize: 14,
                textAlign: 'right',
              }}
              value={item.gender}
            />
            <Input
              onChangeText = {(text)=>props.onEditName(text, index, item.gender, item.isEditing)}
              disabled={!item.isEditing}
              style={{
                flex: 1.5,
                // color: item.isEditing?'black':'gray',
                fontSize: 14,
                textAlign: 'right',
              }}
              value={item.name}
            />
            <Image
              style={{height: 35, width: 35, marginLeft: 5}}
              source={require('../assets/male-user.png')}
            />
          </View>
        )}
        keyExtractor={(item, i)=>i.toString()}
      />
    )
  }

  return (
    <View style={styles.container}>
      <Form>
        <Item floatingLabel>
          <Label style={{textAlign: props.lang === "ar" ? 'right' : 'left'}}>{Translation.profile.addMembers[props.lang]}</Label>
          <Input
            style={{textAlign: props.lang === "ar" ? 'right' : 'left'}}
            onChangeText={props.onChangeName}
            value={props.name}
          />
        </Item>
      </Form>
      <View style={{paddingTop: 20}}>
        <Text style={styles.sectionLabel}>{Translation.profile.gender[props.lang]}</Text>
        <Switch
          lang = {props.lang}
          switchGender = {props.switchGender}
          gender = {props.gender}
        />
      </View>
      
      <View style={{paddingTop: 10}}>
      <Text style={styles.sectionLabel}>{Translation.profile.availability[props.lang]}</Text>
        <WorkingHours
          lang={props.lang}
          onTimeEdit={props.onTimeEdit}
          onDayEdit={props.onDayEdit}
          toggleEdit={(index, open, close, day, isEditing)=>props.toggleEdit(index, open, close, day, isEditing)}
          onDelete={props.onDeleteSched}
          onAdd={props.onAddSched}
          schedules={props.schedules}
          selectedTime={props.selectedTime}
          selectedDay={props.selectedDay}
          days={props.days}
          times={props.times}
          onDaySelect={(day)=>props.onDaySelect(day)}
          onTimeSelect={(index,time)=>props.onTimeSelect(index,time)}
        />
      </View>

      <View style={styles.buttonContainer} elevation={10}>
        <TouchableOpacity style={styles.button} onPress={props.onAddPress}>
          <Feather name="plus" size={30} />
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: 'whitesmoke'}}>
        {addToGroup()}
      </View>
    </View>
  )
};

export default GroupAdd;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonContainer:{
    marginVertical: 15,
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  button: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  member: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  sectionLabel:{
    paddingBottom: 5,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

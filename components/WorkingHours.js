import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Input, SafeAreaView } from 'react-native';
import { Feather, EvilIcons } from '@expo/vector-icons'
import Translation from '../assets/translation';
import ModalSelector from 'react-native-modal-selector'

const WorkingHours = props => {

  addToHours = () => {
    return(
      <FlatList
        data={props.schedules}
        renderItem={({item, index}) => (
          <View style={props.lang === "ar" ? styles.scheduleAR : styles.schedule}>
            <ModalSelector
              animationType={'fade'}
              optionContainerStyle={{backgroundColor: 'darkgray', borderRadius: 5,}}
              optionTextStyle={{color: 'white'}}
              cancelContainerStyle={{backgroundColor: 'white', borderRadius: 5}}
              data={
                props.days.map((day, i)=>{
                  return(
                    {key: i, label: day}
                  )
                })
              }
              onChange={(option)=>{props.onDayEdit(option.label, index)}}
              disabled={item.isEditing?false:true}
            >
              <View style={{flexDirection: 'row'}}>
                {item.isEditing?<EvilIcons name="chevron-down" size={20}/>:null}
                <Text style={{fontSize: 12, color: item.isEditing?'black':'gray'}}>{item.day}</Text>
              </View>
            </ModalSelector>
            <Text style={{fontSize: 12,color: 'gray'}}>from</Text>
            <ModalSelector
              animationType={'fade'}
              optionContainerStyle={{backgroundColor: 'darkgray', borderRadius: 5,}}
              optionTextStyle={{color: 'white'}}
              cancelContainerStyle={{backgroundColor: 'white', borderRadius: 5}}
              data={
                props.times.map((time, i)=>{
                  return(
                    {key: i, label: time}
                  )
                })
              }
              onChange={(option)=>{props.onTimeEdit(option.label, index, "open")}}
              disabled={item.isEditing?false:true}
            >
              <View style={{flexDirection: 'row'}}>
                {item.isEditing?<EvilIcons name="chevron-down" size={20}/>:null}
                <Text style={{fontSize: 12, color: item.isEditing?'black':'gray'}}>{item.open}</Text>
              </View>
            </ModalSelector>
            <Text style={{fontSize: 12,color: 'gray'}}>to</Text>
            <ModalSelector
              animationType={'fade'}
              optionContainerStyle={{backgroundColor: 'darkgray', borderRadius: 5,}}
              optionTextStyle={{color: 'white'}}
              cancelContainerStyle={{backgroundColor: 'white', borderRadius: 5}}
              data={
                props.times.map((time, i)=>{
                  return(
                    {key: i, label: time}
                  )
                })
              }
              onChange={(option)=>{props.onTimeEdit(option.label, index, "close")}}
              disabled={item.isEditing?false:true}
            >
              <View style={{flexDirection: 'row'}}>
                {item.isEditing?<EvilIcons name="chevron-down" size={20}/>:null}
                <Text style={{fontSize: 12, color: item.isEditing?'black':'gray'}}>{item.close}</Text>
              </View>
            </ModalSelector>

            <View style={{flexDirection: props.lang === "ar" ? 'row' : 'row-reverse'}}>
              <TouchableOpacity
                onPress={()=>props.onDelete(index)}
              >
                <EvilIcons name="trash" size={35}/>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>props.toggleEdit(index, item.open, item.close, item.day, item.isEditing)}
              >
                {
                  item.isEditing?
                  <Feather name="check-circle" size={23} style={{paddingLeft: 5, paddingTop: 3}}/>:
                  <EvilIcons name="pencil" size={35}/>
                }
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, i)=>i.toString()}
      />
    )
  }

  return (
    <SafeAreaView>
      <View style={props.lang === "ar" ? styles.containerAR : styles.container}>
        <View style={{ flex: 6, flexDirection: props.lang === "ar" ? 'row-reverse' : 'row' }}>
          <ModalSelector
            animationType={'fade'}
            optionContainerStyle={{backgroundColor: 'darkgray', borderRadius: 5,}}
            optionTextStyle={{color: 'white'}}
            cancelContainerStyle={{backgroundColor: 'white', borderRadius: 5}}
            data={
              props.days.map((day, i)=>{
                return(
                  {key: i, label: day}
                )
              })
            }
            onChange={(option)=>{props.onDaySelect(option.label)}}
          >
            <View style={{flexDirection: props.lang === "en" ? 'row' : 'row-reverse'}}>
              <Text style={styles.text}>{props.selectedDay}</Text>
              <EvilIcons name="chevron-down" size={25}/>
            </View>
          </ModalSelector>
          <Text style={styles.text}> {Translation.profile.from[props.lang]}</Text>
          <ModalSelector
            animationType={'fade'}
            optionContainerStyle={{backgroundColor: 'darkgray', borderRadius: 5,}}
            optionTextStyle={{color: 'white'}}
            cancelContainerStyle={{backgroundColor: 'white', borderRadius: 5}}
            data={
              props.times.map((time, i)=>{
                return(
                  {key: i, label: time}
                )
              })
            }
            onChange={(option)=>{props.onTimeSelect(0, option.label)}}
          >
            <View style={{flexDirection: 'row'}}>
              <EvilIcons name="chevron-down" size={25}/>
              <Text style={styles.text}>{props.selectedTime(0)}</Text>
            </View>
          </ModalSelector>
          <Text style={styles.text}> {Translation.profile.to[props.lang]}</Text>
          <ModalSelector
            animationType={'fade'}
            optionContainerStyle={{backgroundColor: 'darkgray', borderRadius: 5,}}
            optionTextStyle={{color: 'white'}}
            cancelContainerStyle={{backgroundColor: 'white', borderRadius: 5}}
            data={
              props.times.map((time, i)=>{
                return(
                  {key: i, label: time}
                )
              })
            }
            onChange={(option)=>{props.onTimeSelect(1, option.label)}}
          >
            <View style={{flexDirection: 'row'}}>
              <EvilIcons name="chevron-down" size={25}/>
              <Text style={styles.text}>{props.selectedTime(1)}</Text>
            </View>
          </ModalSelector>
        </View>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity style={{ alignItems: 'center', padding: 5 }} onPress={props.onAdd}>
          <EvilIcons name="plus" size={40} />
          <Text style={{ fontWeight: '500' }}>
            {Translation.newTranslation.addAvailability[props.lang]}
          </Text>
        </TouchableOpacity>
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
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerAR: {
    flex: 1,
    flexDirection: 'row-reverse',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    // paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  scheduleAR: {
    flex: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    // paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
});

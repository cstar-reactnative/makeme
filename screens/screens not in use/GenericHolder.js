import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet} from 'react-native';
import {Constants} from 'expo'

import WorkingHours from '../components/WorkingHours'
import HeaderImagePicker from '../components/HeaderImagePicker'
import ProfileImagePicker from '../components/ProfileImagePicker'

export default class GenericHolder extends Component {

  static navigationOptions = {
    header: null
  }

  state = {
    days : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    times: [
      '12:00 AM','01:00 AM','02:00 AM','03:00 AM','04:00 AM','05:00 AM','06:00 AM','07:00 AM','08:00 AM','09:00 AM','10:00 AM','11:00 AM',
      '12:00 PM','01:00 PM','02:00 PM','03:00 PM','04:00 PM','05:00 PM','06:00 PM','07:00 PM','08:00 PM','09:00 PM','10:00 PM','11:00 PM',
    ],
    selectedDay: 'Day of Week',
    selectedTime: ['00:00','00:00'],
    schedules: [
      {open: '08:00 AM', close:'10:00 PM', day:'Monday', isEditing: false},
      {open: '07:00 PM', close:'09:00 AM', day:'Tuesday', isEditing: false},
    ],
    headerImage: null,
    thumbnailImages: [
      'https://picsum.photos/200/200?image=1035',
      'https://picsum.photos/200/200?image=1083',
      'https://picsum.photos/200/200?image=1027',
      'https://picsum.photos/200/200?image=996',
      'https://picsum.photos/200/200?image=312',
      'https://picsum.photos/200/200?image=65',
    ]
  }

  render() {    
    return (
      <ScrollView contentContainerStyle={styles.container}>

        <View style={{marginVertical: 15}}>
          <ProfileImagePicker
            onThumbPress={(index)=>console.log('thumbnail image tapped, id: ', index)}
            thumbnailItems={this.state.thumbnailImages}
            onImagePick = {(image)=>{
              let arrayHolder = this.state.thumbnailImages.slice()
              arrayHolder = [...arrayHolder, image]
              this.setState({ thumbnailImages: arrayHolder})
            }}
            onDelete = {(index)=>{
              let arrayHolder = this.state.thumbnailImages.slice()
              arrayHolder.splice(index,1)
              this.setState({ thumbnailImages: arrayHolder})
            }}
          />
        </View>

        <View style={{marginVertical: 15}}>
          <HeaderImagePicker
            image = {this.state.headerImage}
            onImagePick = {(image)=>this.setState({ headerImage: image})}
          />
        </View>

        <View style={styles.workHours}>
          <WorkingHours

            onTimeEdit = {(update, index, openOrClose)=>{
              let arrayHolder = this.state.schedules
              if(openOrClose==='open') arrayHolder[index].open = update
              if(openOrClose==='close') arrayHolder[index].close = update
              this.setState({schedules: arrayHolder})
            }}

            onDayEdit = {(update, index)=>{
              let arrayHolder = this.state.schedules
              arrayHolder[index].day = update
              this.setState({schedules: arrayHolder})
            }}

            toggleEdit = {
              (index, open, close, day, isEditing)=>{
                let updated = this.state.schedules.slice()
                updated[index] = {
                  open: open,
                  close: close,
                  day: day,
                  isEditing: !isEditing
                }
                this.setState({schedules: updated})
              }
            }

            onDelete = {(index)=>{
                let updated = this.state.schedules
                updated.splice(index, 1)
                this.setState({schedules: updated})
              }
            }

            onAdd = {()=>{
              if(this.state.selectedTime[0]==='00:00'
                || this.state.selectedTime[1]==='00:00'
                || this.state.selectedDay==='Day of Week'){
                alert('Please fill-out properly')
                return
              }
  
              this.setState({
                schedules: [...this.state.schedules,
                  {
                    open: this.state.selectedTime[0],
                    close: this.state.selectedTime[1],
                    day: this.state.selectedDay,
                    isEditing: false
                  }
                ],
                selectedDay: 'Day of Week',
                selectedTime: ['00:00','00:00'],
              })
            }}

            schedules = {this.state.schedules}
            selectedTime = {(index, timeOfDay)=>this.state.selectedTime[index]}
            selectedDay = {this.state.selectedDay}
            days = {this.state.days}
            times = {this.state.times}
            onDaySelect = {(day)=>this.setState({selectedDay: day})}
            onTimeSelect = {(time, openOrClose)=>{
              let arrayHolder = this.state.selectedTime.slice()
              if(openOrClose==='open') arrayHolder[0] = time
              if(openOrClose==='close') arrayHolder[1] = time
              this.setState({selectedTime: arrayHolder})
            }}
          />
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    paddingHorizontal: 15
  },
  workHours:{
    paddingTop: 20
  }
});
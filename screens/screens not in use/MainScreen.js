import React, { Component } from 'react';
import { StyleSheet, StatusBar, ScrollView, Text} from 'react-native';

import Button from '../components/Button'
import Heading from '../components/Heading'
import Switch from '../components/Switch'
import Dropdown from '../components/Dropdown'
import FooterTab from '../components/FooterTab'
import Service from '../components/Service'
import Showcase from '../components/Showcase'
import ServiceDetails from '../components/ServiceDetails'
import MainMenu from '../components/MainMenu'
import Thumbnail from '../components/Thumbnail'

export default class componentName extends Component {

  state = {
    gender: true,
    pickers : [
      {label: "React Native", value: "rn"},
      {label: "Javascript", value: "js"},
      {label: "Expo", value: "exp"},
    ],
    selectedValue: "rn", //must be one of the values on the "value" property of the picker items
    selected: 1,
    route: '',
    offer: true,
    favorite: false,
    rating: 4.5,
    ratingCount: 199,
    thumbnailItems: [
      'https://placeimg.com/350/350/nature',
      'https://placeimg.com/350/350/nature',
      'https://placeimg.com/350/350/nature',
      'https://placeimg.com/350/350/nature',
      'https://placeimg.com/350/350/nature'
    ]
  }
  
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>

        <Thumbnail
          onThumbPress={(index)=>console.log('thumbnail image tapped, id: ', index)}
          thumbnailItems={this.state.thumbnailItems}
        />

        <MainMenu
          onPress={()=>console.log('menu item pressed')}
        />

        <ServiceDetails
          imageUri='https://placeimg.com/350/350/people'
          serviceName="SERVICE NAME"
          serviceAddress="1st street, 2nd City"
          rating={this.state.rating}
          ratingCount={this.state.ratingCount}
          description='This is a sample service description, this is a filler text for prototyping purposes. I am trying really hard to describe what is on this service component.'
        />
        
        <Service
          serviceName="SERVICE NAME"
          serviceAddress="1st street, 2nd City"
          distance={2}
          offer={this.state.offer}
          favorite={this.state.favorite}
          onFavorite={(fave)=>this.setState({favorite: fave})}
          rating={this.state.rating}
          ratingCount={this.state.ratingCount}
          imageUri='https://placeimg.com/350/350/people'
          description='This is a sample service description, this is a filler text for prototyping purposes.'
        />

        <FooterTab
          onTabPress={(tabId, route)=> this.setState({
              selected:tabId,
              route: route,
            })}
          selected={this.state.selected}
          route={this.state.route}
          navigation={this.props.navigation}
          
        />

        <Heading
          imageSource={require('../assets/rn.png')}
          headingText={'HEADING'}
          subheadingText={'This is a sample subheading, this is a sample subheading and this is a sample subheading'}
        />

        <Dropdown
          pickerItems = {this.state.pickers}
          selectedValue = {this.state.selectedValue}
        />

        <Button
          onPress = {()=>{}}
          text = {"MAKE ME"}
          backgroundColor = {"lightblue"}
        />

        <Switch
          switchGender = {()=>this.setState({gender: !this.state.gender})}
          genderState = {this.state.gender}
        />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

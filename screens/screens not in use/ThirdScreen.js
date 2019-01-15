import React, { Component } from 'react';
import { StatusBar, ScrollView, StyleSheet} from 'react-native';

import TouchableList from '../components/TouchableList'
import BookDetails from '../components/BookDetails'
import Header from '../components/Header'
import DateSelection from '../components/DateSelection'
import InputField from '../components/InputField'
import TextInput from '../components/TextInput'
import SearchInput from '../components/SearchInput'
import ServiceInfo from '../components/ServiceInfo'
import CheckBoxes from '../components/CheckBoxes'
import GroupAdd from '../components/GroupAdd'

export default class ShowcaseScreen extends Component {

  state = {
    notif: true,
    showOptions: false,
    menuSelection: 1,
    dropCalendar: false,
    inputValue: '',
    textInputValue: '',
    searchValue: '',
    rating: 4.5,
    ratingCount: 199,
    username: '',
    email: '',
    members: [
      {username: 'edmarvabril', email: 'edmarvabril@gmail.com', isEditing: false},
      {username: 'edmarv', email: 'newbie@motqin.dev', isEditing: false},
    ]
  }

  render() {

    return (
      <ScrollView style={styles.container}>

        <GroupAdd
          onDelete = {
            (index)=>{
              let updated = this.state.members
              updated.splice(index, 1)
              this.setState({members: updated})
            }
          }

          onEditEmail={
            (text, index,  username, isEditing)=>{
              let updated = this.state.members.slice()
              updated[index] = {
                username: username,
                email: text,
                isEditing: isEditing
              }
              this.setState({members: updated})
            }
          }

          onEditUsername = {
            (text, index,  email, isEditing)=>{
              let updated = this.state.members.slice()
              updated[index] = {
                username: text,
                email: email,
                isEditing: isEditing
              }
              this.setState({members: updated})
            }
          }
          toggleEdit = {
            (index, username, email, isEditing)=>{
              let updated = this.state.members.slice()
              updated[index] = {
                username: username,
                email: email,
                isEditing: !isEditing
              }
              this.setState({members: updated})
            }
          }
          members = {this.state.members}
          username = {this.state.username}
          email = {this.state.email}
          onChangeUsername = {(text)=>this.setState({username: text})}
          onChangeEmail = {(text)=>this.setState({email: text})}
          onAddPress = {()=>{
            if(this.state.username==='' || this.state.email===''){
              alert('Please fill-out username and email address')
              return
            }

            this.setState({
              members: [...this.state.members,
                {username: this.state.username, email: this.state.email, isEditing: false}]
            })
            this.setState({
              username: '',
              email: ''
            })
          }}
        />

        <CheckBoxes />

        <ServiceInfo
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

        <SearchInput
          placeholder = 'Search Something'
          onChangeText = {(text)=>this.setState({searchValue: text})}
          searchValue={this.state.searchValue}
          onSearchPress = {()=>{
            console.log(this.state.searchValue)
          }}
        />

        <TextInput
          placeholder = 'Type in here'
          onChangeText = {(text)=>this.setState({textInputValue: text})}
          textInputValue={this.state.textIputValue}
        />

        <InputField
          label = 'Input Label'
          onChangeText = {(text)=>this.setState({inputValue: text})}
          inputValue={this.state.inputValue}
        />

        <DateSelection 
          onCalendarPress = {()=>this.setState({dropCalendar: !this.state.dropCalendar})}
          dropCalendar = {this.state.dropCalendar}
        />

        <Header
          notif={this.state.notif}
          optionsPress={()=>this.setState({showOptions: !this.state.showOptions})}
          showOptions={this.state.showOptions}
          menuSelection = {this.state.menuSelection}
          onSelect = {(selection)=> this.setState({menuSelection: selection})}
        />

        <BookDetails 
          service={"Massage and Spa"}
          schedule={"Morning 8:00 - 10:00"}
          serviceOffered={"Relaxing Massage + Aromatherapy Spa"}
          serviceProvider={"BodyReact Spa"}
          location={"2km point1 - point2"}
        />

        <TouchableList
          onItemPress={(index)=>console.log(`list item pressed, id: ${index}`)}
          data={[
            'Sample List Item 1',
            'Sample List Item 2',
            'Sample List Item 3',
            'Sample List Item 4',
          ]}
        />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    backgroundColor: 'whitesmoke'
  }
});

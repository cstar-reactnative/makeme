import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Form, Item, Input, Label } from 'native-base';
import { Feather, EvilIcons } from '@expo/vector-icons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import { CheckBox } from 'react-native-elements'
import Translation from '../assets/translation';

import Switch from '../components/Switch'
import WorkingHours from '../components/WorkingHours'

const AddServiceToCategory = props => {

  addToList = () => {
    return(
      <FlatList
        inverted={true}
        data={props.services}
        renderItem={({item, index}) => (
          <View style={props.lang === "ar" ? styles.member : styles.memberEN}>
            <View style={{flexDirection: props.lang === "ar" ? 'row' : 'row-reverse'}}>
              <TouchableOpacity
                onPress={()=>props.onDelete(index, item.serviceName)}
              >
                <EvilIcons name="trash" size={35} color={'gray'}/>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={()=>props.toggleEdit(index, item.name, item.gender, item.isEditing)}
                onPress={()=>props.onEdit(index, item.serviceName, item.price, item.members, item.discount, item.homeService)}
              >
                <EvilIcons name="pencil" size={35} color={'gray'}/>
              </TouchableOpacity>
            </View>
            <Input
              disabled={true}
              style={{
                flex: 0.75,
                // color: item.isEditing?'black':'gray',
                fontSize: 14,
                textAlign: props.lang === "ar" ? 'right' : 'left',
              }}
              value={`${item.price} ${Translation.profile.sar[props.lang]}`}
            />
            <Input
              disabled={true}
              style={{
                flex: 1.5,
                // color: item.isEditing?'black':'gray',
                fontSize: 14,
                textAlign: props.lang === "ar" ? 'right' : 'left',
              }}
              value={item.serviceName}
            />
            {/* <Image
              style={{height: 35, width: 35, marginLeft: 5}}
              source={require('../assets/male-user.png')}
            /> */}
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
          <Label style={{textAlign: props.lang === "ar" ? 'right' : 'left'}}>{Translation.profile.serviceName[props.lang]}</Label>
          <Input
            style={{textAlign: props.lang === "ar" ? 'right' : 'left'}}
            onChangeText={props.onChangeName}
            value={props.name}
          />
        </Item>
        <View style={{flexDirection: props.lang === "en" ? 'row' : 'row-reverse', alignItems:'flex-end'}}>
          <Item floatingLabel style={{width: '83%'}}>
            <Label style={{textAlign: props.lang === "ar" ? 'right' : 'left'}}>{Translation.profile.price[props.lang]}</Label>
            <Input
              style={{textAlign: props.lang === "ar" ? 'right' : 'left'}}
              onChangeText={props.onChangePrice}
              value={props.price}
              keyboardType={'numeric'}
            />
            
          </Item>
          <Text style={{fontSize: 20, paddingBottom: 3}}> {Translation.profile.sar[props.lang]}</Text>
        </View>
        <SectionedMultiSelect
          items={props.items} 
          uniqueKey='id'
          subKey='children'
          selectText={Translation.profile.selectedMembers[props.lang]}
          showDropDowns={true}
          readOnlyHeadings={true}
          onSelectedItemsChange={props.onSelectedItemsChange}
          selectedItems={props.selectedItems}
          showDropDowns={false}
          confirmText={Translation.profile.confirm[props.lang]}
          searchPlaceholderText = {Translation.profile.searchTeamMember[props.lang]}
        />
        <View style={{flexDirection: props.lang === "en" ? 'row' : 'row-reverse', alignItems:'flex-end'}}>
          <Item floatingLabel style={{width: '90%'}}>
            <Label style={{textAlign: props.lang === "ar" ? 'right' : 'left'}}>{Translation.profile.discountOffer[props.lang]}</Label>
            <Input
              style={{textAlign: props.lang === "ar" ? 'right' : 'left'}}
              onChangeText={props.onChangeDiscount}
              value={props.discount}
              keyboardType={'numeric'}
            />
          </Item>
          <Text style={{fontSize: 25, paddingBottom: 2}}>%</Text>
        </View>
        <CheckBox
          right
          iconRight
          title={Translation.profile.homeServices[props.lang]}
          checked={props.homeService}
          onPress={props.onCheck}
          checkedColor='lightblue'
          containerStyle={{alignSelf: props.lang === "ar" ? 'flex-end' : 'flex-start',backgroundColor:"white",borderWidth:0,marginTop:20,width:'40%'}}
        />
      </Form>
      
      <View style={styles.buttonContainer} elevation={10}>
        <TouchableOpacity style={styles.button} onPress={props.onAddPress}>
          <Feather name="plus" size={30} />
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: 'whitesmoke'}}>
        {addToList()}
      </View>
    </View>
  )
};

export default AddServiceToCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonContainer:{
    marginVertical: 20,
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
  memberEN: {
    flexDirection: 'row-reverse',
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

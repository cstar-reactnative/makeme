import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Form, Item, Input, Label } from 'native-base';
import { Feather, EvilIcons } from '@expo/vector-icons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import { CheckBox } from 'react-native-elements'

import Switch from '../components/Switch'
import WorkingHours from '../components/WorkingHours'

const AddServiceToCategory = props => {

  addToList = () => {
    return(
      <FlatList
        inverted={true}
        data={props.services}
        renderItem={({item, index}) => (
          <View style={styles.member}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={()=>props.onDelete(index)}
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
                textAlign: 'right',
              }}
              value={item.price}
            />
            <Input
              disabled={true}
              style={{
                flex: 1.5,
                // color: item.isEditing?'black':'gray',
                fontSize: 14,
                textAlign: 'right',
              }}
              value={item.serviceName}
            />
            {/* <Image
              style={{height: 35, width: 35, marginLeft: 5}}
              source={require('../assets/male-user.png')}
            /> */}
          </View>
        )}
        keyExtractor={(item, i)=>i}
      />
    )
  }

  return (
    <View style={styles.container}>
      <Form>
        <Item floatingLabel>
          <Label style={{textAlign: 'right'}}>Service Name</Label>
          <Input
            style={{textAlign: 'right'}}
            onChangeText={props.onChangeName}
            value={props.name}
          />
        </Item>
        <Item floatingLabel>
          <Label style={{textAlign: 'right'}}>Price</Label>
          <Input
            style={{textAlign: 'right'}}
            onChangeText={props.onChangePrice}
            value={props.price}
            keyboardType={'numeric'}
          />
        </Item>
        
        <SectionedMultiSelect
          items={props.items} 
          uniqueKey='id'
          subKey='children'
          selectText='Select Members'
          showDropDowns={true}
          readOnlyHeadings={true}
          onSelectedItemsChange={props.onSelectedItemsChange}
          selectedItems={props.selectedItems}
        />
        <Item floatingLabel>
          <Label style={{textAlign: 'right', paddingTop: 5}}>Discount Offer Percentage(%)</Label>
          <Input
            style={{textAlign: 'right'}}
            onChangeText={props.onChangeDiscount}
            value={props.discount}
            keyboardType={'numeric'}
          />
        </Item>
        <CheckBox
          right
          iconRight
          title='Home Service'
          checked={props.homeService}
          onPress={props.onCheck}
          checkedColor='lightblue'
          containerStyle={{backgroundColor:"white",borderWidth:0,marginTop:20}}
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
  sectionLabel:{
    paddingBottom: 5,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

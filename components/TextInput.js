import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Form, Item, Input, Label } from 'native-base';


const TextInput = props => {
  return (
    <View style={styles.container}>
      <Form>
        <Item rounded style={{borderColor: 'black', paddingHorizontal: 20}}>
          <Input
            placeholder={props.placeholder}
            style={{textAlign: 'left'}}
            onChangeText={props.onChangeText}
            value={props.inputValue}
          />
        </Item>
      </Form>
    </View>
  )
};

export default TextInput;

const styles = StyleSheet.create({
  container:{
    paddingVertical: 15,
    marginVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: 'white'
  }
});

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Form, Item, Input, Label } from "native-base";

const InputField = props => {
  return (
    <View style={styles.container}>
      <Form>
        <Item floatingLabel>
          <Label
            style={[
              { textAlign: props.lang === "en" ? "left" : "right" },
              props.labelStyle
            ]}
          >
            {props.label}
          </Label>
          <Input
            returnKeyType='done'
            editable={props.editable}
            style={[{ textAlign:  props.lang==="en"?"left":"right"}, props.inputStyle]}
            onChangeText={props.onChangeText}
            value={props.inputValue}
            secureTextEntry={props.secure}
            keyboardType={props.keyboardType}
          />
        </Item>
      </Form>
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    width:"90%",
    backgroundColor: "white"
  }
});

import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Text } from "react-native";
import { ImagePicker, Permissions } from "expo";
import { MaterialIcons } from "@expo/vector-icons";

const HeaderImagePicker = props => {
  return (
    <View style={props.image && !props.loading ? styles.container : styles.centered}>
      {
        props.loading ? 
          <View>
            <ActivityIndicator size="large" color="lightblue" />
            <Text>Loading image please wait</Text>
          </View>
        :
          <TouchableOpacity
            onPress={async () => {
              let status = await Permissions.askAsync(Permissions.CAMERA_ROLL);
              {
                if (status === "granted") {
                }
                let result = await ImagePicker.launchImageLibraryAsync({
                  allowsEditing: true,
                  aspect: [4, 3]
                });
                if (!result.cancelled) {
                  props.onImagePick(result.uri);
                }
              }
            }}
          >
            {
              props.image ? 
                (
                  <Image
                    source={{ uri: props.image }}
                    style={{ width: "100%", height: 250 }}
                  />
                ) 
              : 
                (
                  <MaterialIcons name="add-a-photo" size={85} color="lightgray" />
                )
            }
          </TouchableOpacity>
      }
    </View>
  );
};

export default HeaderImagePicker;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "whitesmoke",
    height: 250
  },
  centered: {
    backgroundColor: "whitesmoke",
    height: 250,
    justifyContent: "center",
    alignItems: "center"
  }
});

import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { ImagePicker, Permissions } from "expo";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const ProfileImagePicker = props => {
  populateThumbnail = () => {
    return props.thumbnailItems.map((item, i) => {
      return (
        <View key={i} style={styles.thumb}>
          <TouchableOpacity
            onPress={() => props.onDelete(i)}
            style={styles.delete}
          >
            <MaterialCommunityIcons name="window-close" size={20} />
          </TouchableOpacity>
          <Image
            style={{ height: 130, width: 130, borderRadius: 30 }}
            source={{ uri: item }}
          />
        </View>
      );
    });
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <ScrollView
        contentContainerStyle={{ flexDirection: "row-reverse" }}
        horizontal={true}
      >
        {populateThumbnail()}
        <View style={styles.imagePicker}>
          <TouchableOpacity
            onPress={async () => {
              let status = await Permissions.askAsync(Permissions.CAMERA_ROLL);
              {
                if (status === "granted") {}
                  let result = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                    aspect: [1, 1]
                  });
                  if (!result.cancelled) {
                    props.onImagePick(result.uri);
                  }
                }
            }}
          >
            <MaterialIcons name="add-a-photo" size={60} color="lightgray" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileImagePicker;

const styles = StyleSheet.create({
  thumb: {
    marginHorizontal: 3,
    borderRadius: 30
  },
  imagePicker: {
    justifyContent: "center",
    alignItems: "center",
    height: 130,
    width: 130,
    borderRadius: 30,
    backgroundColor: "whitesmoke"
  },
  delete: {
    backgroundColor: "lightgray",
    borderColor: "gray",
    borderWidth: 0.7,
    height: 26,
    width: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 2,
    top: 10,
    left: 10
  }
});

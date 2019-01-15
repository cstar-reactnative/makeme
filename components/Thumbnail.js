import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Lightbox from "react-native-lightbox";

const Thumbnail = props => {
  populateThumbnail = () => {
    return props.thumbnailItems.map((item, i) => {
      return (
        
        <TouchableOpacity
          style={styles.thumb}
          key={i}
          onPress={() => props.onThumbPress(i)}
        >
          <Lightbox 
            underlayColor="white"
            activeProps={{ style: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }, resizeMode: 'contain' }}
          >
            <Image
              style={{  flex: 1, justifyContent: "space-around",height: 130, width: 130, borderRadius: 30 }}
              // resizeMode="contain"
              source={{ uri: item }}
            />
          </Lightbox>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View>
      <ScrollView horizontal={true}>{populateThumbnail()}</ScrollView>
    </View>
  );
};

export default Thumbnail;

const styles = StyleSheet.create({
  thumb: {
    flex: 1,
    marginHorizontal: 3,
    paddingVertical: 10,
    // height: 130,
    // width: 130,
    // borderRadius: 30
  }
});

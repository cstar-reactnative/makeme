import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Rating } from "react-native-elements";

const ServiceInfo = props => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        props.setVenue(props._id);
        props.navigation.navigate("Service");
      }}
    >
    <View style={{ flexDirection: props.lang === 'ar' ? 'row-reverse' : 'row' }}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: props.imageUri }} />
      </View>
      <View style={{ padding: 5 }}>
        <Text
          style={{
            textAlign: props.lang === "ar" ? "right" : "left",
            fontWeight: "bold"
          }}
        >
          {props.serviceName}
        </Text>
        <View style={{ flexDirection: props.lang === 'ar' ? 'row-reverse' : 'row', justifyContent: 'center' }}>
          <Rating
            type="custom"
            fractions={1}
            ratingColor="gold"
            startingValue={props.rating}
            imageSize={20}
            onFinishRating={rating => console.log("Rating is: " + rating)}
          />
          <Text style={{ textAlign: "right", alignSelf: 'center' }}>({props.ratingCount}) </Text>
        </View>
        <View style={{ flexDirection: props.lang === 'ar' ? 'row-reverse' : 'row' }}>
          <Text style={{ textAlign: "right" }}>{props.distance}km </Text>
          <Entypo name="location" size={20} />
        </View>
      </View>
    </View>
    <Text style={{ textAlign: props.lang === "ar" ? "right" : "left" }}>
      {props.serviceAddress}
    </Text>
    </TouchableOpacity>
  );
};

export default ServiceInfo;

const styles = StyleSheet.create({
  container: {
    
    justifyContent: "center",
    padding: 15,
    backgroundColor: "white"
  },
  containerEN: {
    
    justifyContent: "center",
    padding: 15,
    backgroundColor: "white"
  },
  imageContainer: {
    justifyContent: 'center',
    padding: 5
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30
    // margin: 5,
  },
  service: {
    flex: 4,
    alignItems: "flex-end",
    paddingRight: 10
  },
  serviceEN: {
    flex: 4,
    alignItems: "flex-start",
    paddingLeft: 20
  }
});

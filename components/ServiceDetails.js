import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Rating } from "react-native-elements";
import StarRating from "react-native-star-rating";

const ServiceDetails = props => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: props.lang === "ar" ? "row" : "row-reverse",
          justifyContent: "space-between"
        }}
      >
        <View
          style={{
            flexDirection: props.lang === "ar" ? "row" : "row-reverse",
            flex: 1
          }}
        >
          <View
            style={{ marginTop: 10, flex: 1, justifyContent: "flex-start" }}
          >
            <Text
              style={{
                textAlign: props.lang === "ar" ? "right" : "left",
                fontWeight: "bold"
              }}
            >
              {props.serviceName}
            </Text>
            <View
              style={{
                flexDirection: props.lang === "ar" ? "row-reverse" : "row"
              }}
            >
              <StarRating
                readonly
                type="custom"
                fractions={1}
                starSize={20}
                ratingColor="gold"
                rating={props.rating}
                fullStarColor={"gold"}
                emptyStarColor={"gold"}
                imageSize={20}
                onFinishRating={rating => {
                  props.ratingOnGetValue(rating);
                }}
                style={{ marginRight: 5 }}
              />
              <Text style={{ justifyContent: "center", alignItems: "center", alignSelf: 'center' }}>
                ({props.ratingCount}){" "}
              </Text>
            </View>
            <Text
              style={{
                textAlign: props.lang === "ar" ? "right" : "left",
                borderBottomWidth: 1,
                borderBottomColor: "lightgrey",
                paddingBottom: 5,
                paddingTop: 5,
              }}
            >
              {props.phonenumber}
            </Text>
          </View>
          <Image style={styles.image} source={{ uri: props.imageUri }} />
        </View>
      </View>
      <Text
        numberOfLines={2}
        style={{
          textAlign: props.lang === "ar" ? "right" : "left",
          borderBottomWidth: 1,
          borderBottomColor: "lightgrey",
          paddingBottom: 10
        }}
        onPress={()=>{props.openLink()}}
      >
        <EvilIcons name="location" size={20} />
        {props.serviceAddress}
      </Text>
      <View>
        <Text     style={{
          textAlign: props.lang === "ar" ? "right" : "left"}}
          >{props.description}</Text>
      </View>
    </View>
  );
};

export default ServiceDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
    margin: 5
  }
});

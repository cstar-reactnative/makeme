import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import StarRating from "react-native-star-rating";
import Translation from '../assets/translation';


const avatar = props => {
  return (
    <View style={{ justifyContent: 'center' }}>
      <Image style={styles.image} source={{ uri: props.imageUri }} />
    </View>
  )
}

const venueNameAndRatings = props => {
  return (
    <View style={{ flex: 2, justifyContent: 'center', padding: 5 }}>
      <Text style={{ textAlign: props.lang === "ar" ? "right" : "left", fontWeight: "bold" }}>
        {props.serviceName}
      </Text>
      <View style={{ flexDirection: props.lang === 'ar' ? 'row-reverse' : 'row' }}>
        <StarRating
          disabled={true}
          maxStars={5}
          starSize={20}
          rating={props.rating}
          fullStarColor={"gold"}
          containerStyle={{ borderColor: "lightblue" }}
          emptyStarColor={"gold"}
          reversed={props.lang === "ar" ? true : false}
        />
        <Text style={{ alignSelf: 'center' }}>
          ({props.ratingCount}){" "}
        </Text>
      </View>
      <View style={{ flexDirection: props.lang === 'ar' ? 'row-reverse' : 'row', marginTop: 10 }}>
        <Entypo name="location" size={20} />
        <Text style={{ textAlign: props.lang === "ar" ? "right" : "left" }}>{props.distance}km </Text>
      </View>
    </View>
  )
}

const offerAndDistance = props => {
  return (
    <View style={{ padding: 5 }}>
      {
      props.offer ? (
        <TouchableOpacity style={{ backgroundColor: 'tomato', width: 65, alignSelf: 'flex-start', borderRadius: 25, padding: 3 }}>
          <Text style={styles.offerText}>{Translation.labels.offer[props.lang]}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  )
}

const Service = props => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        props.setVenue(props._id);
        props.navigation.navigate("Service");
      }}
    >
      <View style={{ flexDirection: props.lang === 'ar' ? 'row-reverse' : 'row', flex: 1 }}>
        {avatar(props)}
        {venueNameAndRatings(props)}
        {offerAndDistance(props)}
        <View style={{ flexShrink: 1 }}>
        {props.favorite ? (
          <TouchableOpacity
            onPress={() => props.onFavorite(false)}
          >
            <Ionicons name="md-heart" size={38} color="tomato" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => props.onFavorite(true)}
          >
            <Ionicons name="md-heart-outline" size={38} />
          </TouchableOpacity>
        )}
        </View>
      </View>
      <View style={{ padding: 8 }}>
        <Text  onPress={()=>props.openLink()} numberOfLines={1} style={{ textAlign: props.lang === "ar" ? "right" : "left" }}>
          {props.serviceAddress}
        </Text>
        <Text numberOfLines={3} style={{ textAlign: props.lang === "ar" ? "right" : "left" , marginTop: 11 }}>
            {props.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Service;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 12
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  service: {
    flex: 3,
    alignItems: "flex-end"
  },
  serviceEN: {
    flex: 3,
    alignItems: "flex-start"
  },
  addressContainer: {
    marginLeft: 5
  },
  addressContainerEN: {
    marginLeft: 10,
  },
  favorite: {
    flex: 1,
    margin: 5
  },
  favoriteEN: {
    flex: 1,
    margin: 5,
    alignItems: 'flex-end'
  },
  offerContainer: {
    
  },
  offerContainerEN: {
    borderWidth: 1,
  },
  offer: {
    backgroundColor: "tomato",
    borderRadius: 10,
    padding : 2,
  },
  offerText: {
    color: "white",
    textAlign: "center"
  }
});

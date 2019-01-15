import React, { Component } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, Dimensions } from "react-native";
import Lightbox from "react-native-lightbox";
import { Rating } from "react-native-elements";

const ReviewCard = ({ usersdata, lang }) => {
  return (
    <FlatList
      style={{}}
      data={usersdata}
      keyExtractor={(x, i) => i.toString()}
      renderItem={({ item }) => (
        <View style={styles.CardContainer}>
          <View style={[styles.boxContainer, styles.boxOne]}>
            <View style={styles.boxOneFirstSection}>
              <View style={{ alignItems: lang === "en" ? 'flex-start' : 'flex-end' }}>
                <Text style={{fontSize:16}}>{item.userDetails.firstName}</Text>
              </View>
              <View style={{ flexDirection: lang === "en" ? 'row' : 'row-reverse', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 13, color: '#cecece' }}>{item.ratedAt}</Text>
                <Rating
                  readonly
                  type="star"
                  fractions={1}
                  startingValue={item.rating}
                  imageSize={16}
                />
              </View>
            </View>
          </View>
          <View style={[styles.boxContainer, styles.boxTwo]}>
            <View style={styles.boxTwoFirstSection}>
              <Text style={{ marginTop: 4, marginBottom: 10 }}>
                {item.feedbackText}
              </Text>
              <View style={{ flex: 1, flexDirection: "row", marginBottom: 20 }} >
                <ScrollView horizontal={true}>
                {item.thumbnailImages.map((item, i) => {
                  return (
                    <View key={i} style={{ marginRight: 2, marginLeft: 2 }}>
                      <TouchableOpacity style={{}}>
                        <Lightbox 
                          underlayColor="white"
                          activeProps={{ style: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }, resizeMode: 'contain' }}>
                          <Image
                            style={{ width: 110, height: 110, borderRadius: 25 }}
                            resizeMode="cover"
                            source={{ uri: item }}
                          />
                        </Lightbox>
                      </TouchableOpacity>
                    </View>
                  );
                })}
                </ScrollView>
              </View>
              <View style={{ borderBottomColor: "#cecece", borderBottomWidth: 1, marginRight: 10, marginLeft: 10 }} />
            </View>
          </View>
        </View>
      )}
    />
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  CardContainer: {
    flex: 1
  },
  boxContainer: {
    flex: 1,
    flexDirection: "column"
  },
  boxOne: {
    flex: 1.4,
    backgroundColor: "#FFF",
    paddingRight: 10,
    paddingLeft: 10
  },
  boxTwo: {
    flex: 5,
    backgroundColor: "#FFF",
    paddingRight: 10,
    paddingLeft: 10
  },
  boxOneFirstSection: {
    flex: 1,
    flexDirection: "column",
    marginTop: 5
  },
  boxTwoFirstSection: {
    flex: 1,
    flexDirection: "column"
  },
  contain: {
    flex: 1
  }
});

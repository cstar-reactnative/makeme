import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";
import Translation from "../assets/translation";
const BookDetails = props => {
  let statusColor = "#FCAE46";
  let statusMessage = Translation.ownerHome.pending[props.lang];
  let msgColor = "white";
  if (props.status === "accepted") {
    statusColor = "limegreen";
    statusMessage = Translation.ownerHome.accepted[props.lang];
    msgColor = "white";
  }
  if (props.status === "rejected") {
    statusColor = "#E13438";
    statusMessage = Translation.ownerHome.rejected[props.lang];
    msgColor = "white";
  }
  if (props.status === "cancelled") {
    statusColor = "grey";
    statusMessage = Translation.userType.cancel[props.lang];
    msgColor = "white";
  }

  return (
    <View style={props.lang === "ar" ? styles.container : styles.containerEN}>
      <View style={styles.options}>
        {props.userType === "user" && (
          <Menu>
            <MenuTrigger
              style={
                props.lang === "ar"
                  ? styles.menuAlignment
                  : styles.menuAlignmentEN
              }
            >
              <Entypo name="dots-three-vertical" size={30} />
            </MenuTrigger>
            {
              props.status === 'pending' || props.status === 'accepted' ?
                <MenuOptions>
                  <MenuOption
                    style={styles.menuOption}
                    onSelect={() => props.onSelect("cancel")}
                  >
                    <Text>{Translation.userType.cancel[props.lang]}</Text>
                  </MenuOption>
                  <MenuOption
                    style={styles.menuOption}
                    onSelect={() => props.onSelect("edit")}
                  >
                    <Text>
                      {Translation.newTranslation.edit[props.lang]}
                    </Text>
                  </MenuOption>
                </MenuOptions>
                :
                <MenuOptions />
            }
          </Menu>
        )}
        {props.userType === "businessOwner" && (
          <Menu>
            <MenuTrigger
              style={
                props.lang === "ar"
                  ? styles.menuAlignment
                  : styles.menuAlignmentEN
              }
            >
              <Entypo name="dots-three-vertical" size={30} />
            </MenuTrigger>
            <MenuOptions>
              { props.status === 'accepted' ?
                <MenuOption
                  style={styles.menuOption}
                  onSelect={() => props.onSelect("reject")}
                >
                  <Text>{Translation.ownerHome.reject[props.lang]}</Text>
                </MenuOption>
                :
                props.status !== 'cancelled' && props.status === 'pending' &&
                <MenuOption
                  style={styles.menuOption}
                  onSelect={() => props.onSelect("accepted")}
                >
                  <Text>{Translation.ownerHome.accept[props.lang]}</Text>
                </MenuOption>
              }
              { props.status === 'rejected' ?
                <MenuOption
                  style={styles.menuOption}
                  onSelect={() => props.onSelect("accepted")}
                >
                  <Text>{Translation.ownerHome.accept[props.lang]}</Text>
                </MenuOption>
                :
                props.status !== 'cancelled' && props.status === 'pending' &&
                <MenuOption
                  style={styles.menuOption}
                  onSelect={() => props.onSelect("reject")}
                >
                  <Text>{Translation.ownerHome.reject[props.lang]}</Text>
                </MenuOption>
              }
            </MenuOptions>
          </Menu>
        )}
        <View style={styles.priceContainer}>
          <Text>
            {Translation.ownerHome.price[props.lang]}: {props.servicePrice}
          </Text>
        </View>
        <View style={[styles.status, { backgroundColor: statusColor }]}>
          <Text style={{ color: msgColor }}>{statusMessage}</Text>
        </View>
      </View>

      <View style={props.lang === "ar" ? styles.details : styles.detailsEN}>
        <View style={styles.paddingVertical}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              textAlign: props.lang === "ar" ? "right" : "left"
            }}
          >
            {props.date}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: "gray",
              textAlign: props.lang === "ar" ? "right" : "left"
            }}
          >
            {props.schedule}
          </Text>
        </View>
        <View style={styles.paddingVertical}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              textAlign: props.lang === "ar" ? "right" : "left"
            }}
          >
            {props.serviceOffered}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: "gray",
              textAlign: props.lang === "ar" ? "right" : "left"
            }}
          >
            {Translation.forTranslations.by[props.lang]} {props.teamMember==="Book any team member"?props.lang === "ar" ? "أي عضو في الفريق" : "AnyTeamMember":props.teamMember}
          </Text>
        </View>
        <View style={styles.paddingVertical}>
          <TouchableOpacity
            onPress={() => {
              if (!props.venueOwner) {
                props.setVenue(props.venueId);
                props.navigation.navigate("GoToVenue");
              }
            }}
          >
            <Text
              style={{
                fontSize: 16,
                textAlign: props.lang === "ar" ? "right" : "left"
              }}
            >
              {props.venueOwner ? props.firstName : props.serviceProvider}
            </Text>
          </TouchableOpacity>
          {props.venueOwner ? (
            <Text
              style={{
                fontSize: 13,
                color: "gray",
                textAlign: props.lang === "ar" ? "right" : "left"
              }}
            >
              {props.venueOwner ? props.mobile : props.location}
            </Text>
          ) : (
            <TouchableOpacity
              style={{ paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}
              onPress={props.externalLink}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: "gray",
                  textAlign: props.lang === "ar" ? "right" : "left"
                }}
              >
                {props.location ? props.location : "default address"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.rightIcons}>
        <Entypo name="calendar" size={30} />
        <View
          style={{ borderRightWidth: 0.5, flex: 1, justifyContent: "center" }}
        />
        <View style={styles.blueDot} />
        <View
          style={{ borderRightWidth: 0.5, flex: 1, justifyContent: "center" }}
        />
        <Entypo name={props.venueOwner ? "user" : "location"} size={28} />
      </View>
    </View>
  );
};

export default BookDetails;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 5
  },
  containerEN: {
    flexDirection: "row-reverse",
    backgroundColor: "white",
    padding: 5
  },
  menuAlignment: {
    marginLeft: 15
  },
  menuAlignmentEN: {
    alignItems: "flex-end",
    marginRight: 15
  },
  rightIcons: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 5
  },
  details: {
    flex: 5,
    justifyContent: "space-between"
  },
  detailsEN: {
    flex: 5,
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  options: {
    flex: 3,
    justifyContent: "space-between",
    paddingVertical: 15
  },
  paddingVertical: {
    paddingVertical: 10
  },
  blueDot: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: "lightblue"
  },
  status: {
    paddingVertical: 3,
    justifyContent: "center",
    alignItems: "center",
    // height:30,
    // width: 90,
    borderRadius: 15,
    // marginLeft: 10,
    // marginRight: 8,
    padding: 10
  },
  priceContainer: {
    marginTop: 20,
    marginLeft: 16
  }
});

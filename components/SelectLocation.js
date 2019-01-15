import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { Location, Permissions, Constants, MapView } from "expo";

const style = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  setLocation: {
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 30,
    zIndex: 1,
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    padding: 8,
    left: "10%",
    shadowOffset: { height: 3 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 2
  },
  cancelLocation: {
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 30,
    zIndex: 1,
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    padding: 8,
    right: "10%",
    shadowOffset: { height: 3 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 2
  },
  textStyle: {
    fontSize: 17,
    fontWeight: '400',
    color: '#000',

  }
})
class SelectLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAddress: null,
      marker: {},
      loading: false
    }
  }

  getAddress() {
    const { latitude, longitude } = this.state.marker;
    var url =`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAcHgSIDeupIsGsuYBB74KWP_WinNOb7fY`;
    axios.get(url).then((response) => {
      const { data } = response;
      if (data.results.length > 0) {
        const { results } = data;
        this.setState({ loading: false }, () => {
          const data = {
            address: results[0].formatted_address,
            geoLocation: results[0].geometry.location,
          };
          console.log('location', data)
          this.props.onGetValue(data)
        })
      } else {
        console.log('no location')
        this.setState({ loading: false })
      }
    }).catch((error) => {
      this.setState({ loading: false })
    });
  }

  render() {
    return(
      <View style={style.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.visible}
          onRequestClose={() => {
            console.log('cloesed');
          }}
        >
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, marginTop: 20 }}>
              {
                this.state.loading ? 
                  <View
                    style={{
                      zIndex: 1,
                      position: "absolute",
                      marginTop: -37,
                      marginLeft: -20,
                      left: "50%",
                      top: "50%"
                    }}
                  >
                    <ActivityIndicator size="large" color="tomato" />
                  </View>
                :
                  <MaterialCommunityIcons
                    name="map-marker"
                    style={{
                      zIndex: 3,
                      position: "absolute",
                      marginTop: -37,
                      marginLeft: -20,
                      left: "50%",
                      top: "50%"
                    }}
                    size={40}
                    color="#f00"
                  />
              }
              <TouchableOpacity
                onPress={() => {
                  this.setState({ loading: true }, () => {
                    this.getAddress()
                  })
                }}
                style={style.setLocation}
              >
                <Text style={style.textStyle}>Set address</Text>
              </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.props.closeModal}
                  style={style.cancelLocation}
                >
                <Text style={style.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <MapView
                style={{ flex: 1 }}
                provider={MapView.PROVIDER_GOOGLE}
                initialRegion={{
                  latitude: this.props.currentLocation.latitude,
                  longitude: this.props.currentLocation.longitude,
                  latitudeDelta: 0.0322,
                  longitudeDelta: 0.021
                }}
                loadingEnabled={true}
                showsUserLocation={true}
                onRegionChange={l => {
                  this.setState({ marker: l });
                }}
              >
              </MapView>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

export default SelectLocation;
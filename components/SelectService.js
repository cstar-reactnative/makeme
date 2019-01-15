import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Translation from '../assets/translation';
import CategoryBox from './CategoryBox'

export default class SelectService extends React.Component {

  state = {
    categories: [Translation.profile.hair[this.props.lang],Translation.profile.nail[this.props.lang],Translation.profile.body[this.props.lang],Translation.profile.face[this.props.lang]],
  }

  render(){
    renderBoxes = () => {
      return(
        this.state.categories.map((item, index)=>{
          return(
            <TouchableOpacity
              key={index}
              onPress={()=>this.props.onPress(index)}
            >
              <CategoryBox
                boxLabel = {item}
                dimension = {this.props.dimension}
                selected = {this.props.selected===index}
              />
            </TouchableOpacity>
          )
        })
      )
    }
    return (
      <View style={styles.container}>
        {renderBoxes()}
      </View>
    )
  }
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    // paddingVertical: 10
  }
});

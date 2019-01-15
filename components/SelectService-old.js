import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CategoryBox from './CategoryBox'

export default class SelectService extends React.Component {

  state = {
    categories: [
      {category: 'Hair', selected: false},
      {category: 'Nail', selected: false},
      {category: 'Body', selected: false},
      {category: 'Face', selected: false}
    ]
  }

  render(){
    renderBoxes = () => {
      return(
        this.state.categories.map((item, index)=>{
          return(
            <TouchableOpacity
              key={index}
              onPress={()=>{
                let arrayHolder = this.state.categories.slice()
                arrayHolder[index].selected = !item.selected
                this.setState({categories:arrayHolder})
                this.props.onGetValue(this.state.categories)
              }}
            >
              <CategoryBox
                boxLabel = {item.category}
                dimension = {this.props.dimension}
                selected = {this.state.categories[index].selected}
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

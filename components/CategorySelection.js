import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CategoryBox from './CategoryBox'
import Translation from '../assets/translation'
export default class CategorySelection extends React.Component {

  state = {
    categories: [
      {category: 'spa', selected: false},
      {category: 'salon', selected: false},
      {category: 'clinic', selected: false},
      {category: 'home service', selected: false}
    ],
    selectedCategories: this.props.currentCategories,
  }

  componentDidMount() {
    const arrayCategories = ['spa', 'salon', 'clinic', 'home service'];
    const categories = []
    arrayCategories.map(i => {
      const a = this.props.currentCategories.find( item => item === i);
      if (a) {
        categories.push({ category: i, selected: true });
      } else {
        categories.push({ category: i, selected: false });
      }
    })
    this.setState({ categories });
  }

  removed(item){
    const categories = this.state.selectedCategories.filter(i => i !== item);
    this.setState({ selectedCategories: categories }, () => {
      this.props.onGetValue(this.state.selectedCategories)
    });
  }

  addItem(item){
    this.setState({ selectedCategories: [ ...this.state.selectedCategories, item] }, () => {
      this.props.onGetValue(this.state.selectedCategories)
    });
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
                this.setState({ categories: arrayHolder });
                if (item.selected) {
                  this.addItem(item.category)
                } else {
                  this.removed(item.category)
                }
              }}
            >
              <CategoryBox
                boxLabel = {this.props.registration ? Translation.profile[item.category][this.props.lang] : item.category}
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

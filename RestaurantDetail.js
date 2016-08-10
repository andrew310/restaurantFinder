'use strict';

import React, { Component } from 'react';
import {
 Image,
 StyleSheet,
 Text,
 TextInput,
 View,
 TouchableHighlight,
 ActivityIndicator
} from 'react-native';

var styles = StyleSheet.create({
    container: {
        marginTop: 60,
        alignItems: 'center'
    },
    inputContainer: {
      marginTop: 15,
      padding: 10
    },
    image: {
        width: 80,
        height: 80,
        padding: 10
    },
    description: {
        padding: 10,
        fontSize: 15,
        color: '#656565'
    },
    input: {
        height: 36,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 18,
        borderWidth: 1,
        flex: 1,
        borderRadius: 4,
        padding: 5
    },
    fieldLabel: {
        fontSize: 15,
        marginTop: 15
    },
    errorMessage: {
        fontSize: 15,
        alignSelf: 'center',
        marginTop: 15,
        color: 'red'
    },
    button: {
        height: 36,
        backgroundColor: '#f39c12',
        borderRadius: 8,
        justifyContent: 'center',
        marginTop: 15
    },
    deleteButton: {
        height: 36,
        backgroundColor: '#ff0000',
        borderRadius: 8,
        justifyContent: 'center',
        marginTop: 15
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    }
});

class RestaurantDetail extends Component {
  constructor(props){
    super(props);
    this.state = ({
        name : this.props.restaurant.name,
        description : this.props.restaurant.description
      }
    );
  }
  restaurantNameInput(event) {
    this.setState({ name: event.nativeEvent.text });
  }
  restaurantDescriptionInput(event) {
    this.setState({ description: event.nativeEvent.text });
  }
  editRestaurant(){
    this.setState({ isLoading: true });
    var ADD_URL = "http://138.68.49.15:8080/api/restaurants/" + this.props.restaurant._id;
    fetch(ADD_URL, {
      method: 'PUT',
      headers: {
        'x-access-token' : global.token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({isLoading: false});
      if(responseData){
        const stuff = responseData.payload;
        this.setState({
          msg: stuff,
        });
      } else{
        this.setState({ msg: ' no response from server'});
      }
    })
    .catch(error =>
      this.setState({
        isLoading: false,
        errorMessage: error
      }))
    .done()
  }
  deleteRestaurant(){
    this.setState({ isLoading: true });
    var ADD_URL = "http://138.68.49.15:8080/api/restaurants/" + this.props.restaurant._id;
    fetch(ADD_URL, {
      method: 'DELETE',
      headers: {
        'x-access-token' : global.token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({isLoading: false});
      if(responseData){
        const stuff = responseData.payload;
        this.setState({
          msg: stuff,
        });
      } else{
        this.setState({ msg: ' no response from server'});
      }
    })
    .catch(error =>
      this.setState({
        isLoading: false,
        errorMessage: error
      }))
    .done()
  }
  render() {
    ( <View/>);
    //props from parent component
    var restaurant = this.props.restaurant;
    var imgurl = "https://cdn1.iconfinder.com/data/icons/business-items/512/market_store_local_shop_cafe_commerce_retail_shopping_grocery_facade_fastfood_small_building_flat_design_icon-128.png";
    //if we have a description then show it, otherwise empty str
    var description = (typeof restaurant.description !== 'undefined') ? restaurant.description : '';
    var spinner = this.state.isLoading ?
    ( <ActivityIndicator hidden='true' size='large'/>) :
    ( <View/>);
    return (
      <View>
        <View style={styles.container}>
          <Image style={styles.image} source={{uri: imgurl}} />
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.description}>{restaurant.address}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.instructions}>Edit Restaurant</Text>
          <View>
            <Text style={styles.fieldLabel}>Restaurant name:</Text>
            <TextInput style={styles.input} value={this.state.name} onChange={this.restaurantNameInput.bind(this)}/>
          </View>
          <View>
            <Text style={styles.fieldLabel}>Description:</Text>
            <TextInput style={styles.input} value={this.state.description} onChange={this.restaurantDescriptionInput.bind(this)}/>
          </View>

          <TouchableHighlight style={styles.button}
            underlayColor='#f1c40f'
            onPress={this.editRestaurant.bind(this)}>
            <Text style={styles.buttonText}>Submit Changes</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.deleteButton}
            underlayColor='#f1c40f'
            onPress={this.deleteRestaurant.bind(this)}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableHighlight>

          {spinner}

          <View>
            <Text style={styles.fieldLabel}></Text>
            <Text>{this.state.msg}</Text>
          </View>
          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
        </View>
      </View>
    );
  }
}//end of RestaurantDetail

module.exports = RestaurantDetail;

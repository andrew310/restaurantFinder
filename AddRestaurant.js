'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';

var styles = StyleSheet.create({
    container: {
        marginTop: 65,
        padding: 10
    },
    searchInput: {
        height: 36,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 18,
        borderWidth: 1,
        flex: 1,
        borderRadius: 4,
        padding: 5
    },
    button: {
        height: 36,
        backgroundColor: '#f39c12',
        borderRadius: 8,
        justifyContent: 'center',
        marginTop: 15
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    instructions: {
        fontSize: 18,
        alignSelf: 'center',
        marginBottom: 15
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
    }
});

class AddRestaurant extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      description: '',
      isLoading: false,
      errorMessage: ''
    };
  }
  render() {
    var spinner = this.state.isLoading ?
    ( <ActivityIndicator hidden='true' size='large'/>) :
    ( <View/>);
    return(
      <View style={styles.container}>
        <Text style={styles.instructions}>Add Restaurant</Text>
        <View>
          <Text style={styles.fieldLabel}>Restaurant name:</Text>
          <TextInput style={styles.searchInput} onChange={this.restaurantNameInput.bind(this)}/>
        </View>
        <View>
          <Text style={styles.fieldLabel}>Description:</Text>
          <TextInput style={styles.searchInput} onChange={this.restaurantDescriptionInput.bind(this)}/>
        </View>
        <TouchableHighlight style={styles.button}
          underlayColor='#f1c40f'
          onPress={this.addRestaurant.bind(this)}>
          <Text style={styles.buttonText}>Submit</Text>
          </TouchableHighlight>
          {spinner}
          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
      </View>
    );
  }
  restaurantNameInput(event) {
    this.setState({ name: event.nativeEvent.text });
  }
  restaurantDescriptionInput(event) {
    this.setState({ description: event.nativeEvent.text });
  }
  addRestaurant() {
    this.fetchData();
  }
  fetchData(){
    this.setState({ isLoading: true });
    var ADD_URL = "http://107.170.230.36:8080/api/restaurants";
    fetch(ADD_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
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
        this.setState({
          msg: responseData
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
}

module.exports = AddRestaurant;

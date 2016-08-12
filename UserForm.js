'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';

var styles = StyleSheet.create({
    container: {
        marginTop: 65,
        padding: 10
    },
    Input: {
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

class UserForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      errorMessage: '',
      msg: '',
      token: ''
    };
  }
  render() {
    //hide spinner if waiting on response
    var spinner = this.state.isLoading ?
    ( <ActivityIndicator hidden='true' size='large'/>) :
    ( <View/>);

    return(
      <View style={styles.container}>
        <Text style={styles.instructions}>Login or Signup</Text>
        <View>
          <Text style={styles.fieldLabel}>username:</Text>
          <TextInput style={styles.Input} value={this.state.username} onChange={this.usernameInput.bind(this)}/>
        </View>
        <View>
          <Text style={styles.fieldLabel}>password:</Text>
          <TextInput secureTextEntry={true} style={styles.Input} value={this.state.password} onChange={this.passwordInput.bind(this)}/>
        </View>

        <TouchableHighlight style={styles.button}
          underlayColor='#f1c40f'
          onPress={this.signup.bind(this)}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.button}
          underlayColor='#f1c40f'
          onPress={this.login.bind(this)}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.button}
          underlayColor='#f1c40f'
          onPress={this.logout.bind(this)}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableHighlight>
          {spinner}
          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
          <View>
            <Text style={styles.fieldLabel}></Text>
            <Text>{this.state.msg}</Text>
          </View>
      </View>
    );
  }

  //function to set state of the input box
  usernameInput(event) {
    this.setState({ username: event.nativeEvent.text });
  }

  //function to set state of input box
  passwordInput(event) {
    this.setState({ password: event.nativeEvent.text });
  }

  /*handler for signup button, sends POST request*/
  signup(){
    var ADD_URL = "http://138.68.49.15:8080/api/users";
    fetch(ADD_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({isLoading: false});
      if(responseData){
        const stuff = responseData.message;
        this.setState({
          msg: stuff,
          username: '',
          password: ''
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

  /*handler for login button, sends post request*/
  login(){
      var ADD_URL = "http://138.68.49.15:8080/api/users/token";
      fetch(ADD_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({isLoading: false});
        if(responseData){
          const stuff = responseData.message;
          const token = responseData.token;
          global.token = token;
          this.setState({
            msg: stuff,
            token: global.token,
            password: '',
            username: ''
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
      .done()}

  /*handler for logout function, simply deletes token*/
  logout(){
    global.token = '';
    this.setState({
      msg: "Logged out."
    });
  }
  
}

module.exports = UserForm;

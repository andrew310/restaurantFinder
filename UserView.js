'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  NavigatorIOS

} from 'react-native';
var UserForm = require('./UserForm');


var styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

//this will create the header for this view
class User extends Component {
    render() {
        return (
          <NavigatorIOS
            style={styles.container}
            initialRoute={{
              title: 'User',
              component: UserForm
            }}/>
        );
    }
}

module.exports = User;

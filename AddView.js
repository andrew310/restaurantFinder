'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  NavigatorIOS

} from 'react-native';
var AddRestaurant = require('./AddRestaurant');


var styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

//this will create the header for this view
class Add extends Component {
    render() {
        return (
          <NavigatorIOS
            style={styles.container}
            initialRoute={{
              title: 'Add Restaurant',
              component: AddRestaurant
            }}/>
        );
    }
}

module.exports = Add;

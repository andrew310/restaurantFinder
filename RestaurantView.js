'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  NavigatorIOS

} from 'react-native';
var RestaurantList = require('./RestaurantList');


var styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

//this will create the header for this view
class Restaurant extends Component {
    render() {
        return (
          <NavigatorIOS
            style={styles.container}
            initialRoute={{
              title: 'Restaurants',
              component: RestaurantList
            }}/>
        );
    }
}

module.exports = Restaurant;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict';

var RestaurantList = require('./RestaurantView.js');
var Search = require('./SearchView.js');
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TabBarIOS,
} from 'react-native';

class RestaurantFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'restaurants'
    };
  }
  render() {
    return (
      <TabBarIOS selectedTab={this.state.selectedTab}>
          <TabBarIOS.Item
            selected={this.state.selectedTab === 'restaurants'}
            systemIcon="top-rated"
              onPress={() => {
                  this.setState({
                      selectedTab: 'restaurants'
                  });
              }}>
              <RestaurantList/>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            selected={this.state.selectedTab === 'search'}
            systemIcon="search"
            onPress={() => {
                this.setState({
                    selectedTab: 'search'
                });
            }}>
            <Search/>
        </TabBarIOS.Item>
      </TabBarIOS>

    );
  }
}


AppRegistry.registerComponent('RestaurantFinder', () => RestaurantFinder);

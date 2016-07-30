'use strict';

import React, { Component } from 'react';
import {
 Image,
 StyleSheet,
 Text,
 View,
 ListView,
 TouchableHighlight
} from 'react-native';

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10,
        borderBottomColor:'#dddddd',
        borderBottomWidth: 1
    },
    thumbnail: {
        width: 53,
        height: 81,
        marginRight: 10
    },
    rightContainer: {
        flex: 1
    },
    title: {
        fontSize: 20,
        marginBottom: 8
    },
    author: {
        color: '#656565'
    },
});

var FAKE_DATA = [
    {name: "Captain D's", description: "terrible seafood"},
    {name: "Jack in the Box", description: "terrible hamburgers"}
];
class RestaurantList extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }
  componentDidMount(){
    var restaurants = FAKE_DATA;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(restaurants)
    });
  }
  renderRestaurant(restaurant) {
    //var restaurant = FAKE_DATA[0];
    var imgurl = "http://facebook.github.io/react/img/logo_og.png";
    return(
      <TouchableHighlight>
        <View style={styles.container}>
          <Image
            source={{uri: imgurl}}
            style={styles.thumbnail}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{restaurant.name}</Text>
            <Text style={styles.author}>{restaurant.description}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  render(){
    return(
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRestaurant.bind(this)}
        style={styles.listView}
      />
    );
  }
}

module.exports = RestaurantList;

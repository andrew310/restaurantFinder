'use strict';

import React, { Component } from 'react';
import {
 Image,
 StyleSheet,
 Text,
 View,
 ListView,
 TouchableHighlight,
 ActivityIndicator,
 RefreshControl
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
        width: 30,
        height: 30,
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
    listView: {
      paddingTop: 60,
      backgroundColor: '#F5FCFF'
    },
    loading: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
});

var FAKE_DATA = [
    {name: "Captain D's", description: "terrible seafood"},
    {name: "Jack in the Box", description: "terrible hamburgers"}
];
var REQUEST_URL = "http://107.170.230.36:8080/api/restaurants/";
class RestaurantList extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }
  fetchData() {
    fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((responseData) =>{
      this.setState(
        {
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          isLoading: false,
          refreshing: false
        });
    })
    .catch((error) => {
      console.error(error);
    })
    .done();
  }
  componentDidMount(){
    this.fetchData();
  }
  renderRestaurant(restaurant) {
    //var restaurant = FAKE_DATA[0];
    var imgurl = "https://cdn1.iconfinder.com/data/icons/business-items/512/market_store_local_shop_cafe_commerce_retail_shopping_grocery_facade_fastfood_small_building_flat_design_icon-128.png";
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
  renderLoadingView(){
    return(
      <View style={styles.loading}>
        <ActivityIndicator
          size='large'/>
        <Text>
          Loading restaurants...
        </Text>
      </View>
    );
  }
  _onRefresh(){
    this.setState({refreshing: true});
    this.fetchData();
  }
  render(){
    if(this.state.isLoading){
      return this.renderLoadingView();
    }
    return(
      <ListView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
        dataSource={this.state.dataSource}
        renderRow={this.renderRestaurant}
        style={styles.listView}
      />
    );
  }
}

module.exports = RestaurantList;

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

var RestaurantDetail = require('./RestaurantDetail.js');

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
        marginBottom: 4
    },
    desc: {
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
    },
    address:
    {
      color: '#7f7f7f',
      marginBottom: 4
    },
    fieldLabel: {
        fontSize: 15,
        marginTop: 15
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
    }
});

var FAKE_DATA = [
    {name: "Captain D's", description: "terrible seafood"},
    {name: "Jack in the Box", description: "terrible hamburgers"}
];
var REQUEST_URL = "http://138.68.49.15:8080/api/restaurants";

//create our React component
class RestaurantList extends Component {
  constructor(props){
    super(props);
    //bind this to class (we have to do this because it is called by the Listview)
    this.renderRestaurant = this.renderRestaurant.bind(this)
    this._onRefresh = this._onRefresh.bind(this)
    this.state = {
      isLoading: true,
      success: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }
  //get request for all restaurants with this username from server
  fetchData() {
    var token = this.state.token;
    fetch(REQUEST_URL, {
      method: 'GET',
      headers: {
        //send our credentials token
        'x-access-token' : global.token
      }
    })
    .then((response) => response.json())
    .then((responseData) =>{
      var s = this.state.success;
      //check if we got a message instead of the array of data
      if(!responseData.hasOwnProperty("success")){
        s = true;
      }
      this.setState(
        {
          success: s,
          message: responseData.message,
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
  //wait until our view has finished loading, then send the request
  componentDidMount(){
    this.fetchData();
  }

  //this is called for each item in the array we get back from server
  renderRestaurant(restaurant) {
    //var restaurant = FAKE_DATA[0];
    var imgurl = "https://cdn1.iconfinder.com/data/icons/business-items/512/market_store_local_shop_cafe_commerce_retail_shopping_grocery_facade_fastfood_small_building_flat_design_icon-128.png";
    return(
      <TouchableHighlight onPress={()=>this.showRestaurant(restaurant)} underlayColor='#dddddd'>
        <View style={styles.container}>
          <Image
            source={{uri: imgurl}}
            style={styles.thumbnail}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{restaurant.name}</Text>
            <Text style={styles.address}>{restaurant.address}</Text>
            <Text style={styles.desc}>{restaurant.description}</Text>

          </View>
        </View>
      </TouchableHighlight>
    );
  }

  //makes restaurant vieable in the restaurantDetail page
  showRestaurant(restaurant){
    this.props.navigator.push({
      title: restaurant.name,
      component: RestaurantDetail,
      passProps: {restaurant}
    });
  }

  //this view is rendered if we are not logged in
  renderNotLoggedIn(){
    return(
      <View style={styles.container}>
        <View>
          <Text style={styles.fieldLabel}></Text>
          <Text>Please log in.</Text>
        </View>

        <TouchableHighlight style={styles.button}
          underlayColor='#f1c40f'
          onPress={this._onRefresh.bind(this)}>
          <Text style={styles.buttonText}>Refresh</Text>
        </TouchableHighlight>
      </View>
    );
  }
  //view to be rendered while waiting for request to finish
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
  //if user is logged in but there is nothing to show
  renderEmptyView(){
    return(
      <View style={styles.container}>
        <View>
          <Text style={styles.fieldLabel}></Text>
          <Text>Add Some Restaurants.</Text>
        </View>

        <TouchableHighlight style={styles.button}
          underlayColor='#f1c40f'
          onPress={this._onRefresh.bind(this)}>
          <Text style={styles.buttonText}>Refresh</Text>
        </TouchableHighlight>
      </View>
    );
  }
  //called when user pulls/swipes down on the page
  _onRefresh(){
    // if(!global.token){
    //   this.set
    // }
    this.setState({refreshing: true});
    this.fetchData();
  }
  //if we get here, request to api was successful
  render(){
    //while we are waiting on the API
    if(this.state.isLoading){
      return this.renderLoadingView();
    }
    if(!this.state.success){
      return this.renderNotLoggedIn();
    }
    if(!global.token){
      return this.renderNotLoggedIn();
    }
    const check = this.state.dataSource.getRowCount();
    if(!check){
      return this.renderEmptyView();
    }
    //once we have the data
    return(
      <ListView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
        enableEmptySections={true}
        //get our data from state
        dataSource={this.state.dataSource}
        //map to our restaurant component
        renderRow={this.renderRestaurant}
        style={styles.listView}
      />
    );
  }
}

module.exports = RestaurantList;

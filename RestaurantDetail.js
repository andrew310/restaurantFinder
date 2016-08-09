'use strict';

import React, { Component } from 'react';
import {
 Image,
 StyleSheet,
 Text,
 View
} from 'react-native';

var styles = StyleSheet.create({
    container: {
        marginTop: 75,
        alignItems: 'center'
    },
    image: {
        width: 107,
        height: 165,
        padding: 10
    },
    description: {
        padding: 10,
        fontSize: 15,
        color: '#656565'
    }
});

class RestaurantDetail extends Component {
  render() {
    //props from parent component
    var restaurant = this.props.restaurant;
    var imgurl = "https://cdn1.iconfinder.com/data/icons/business-items/512/market_store_local_shop_cafe_commerce_retail_shopping_grocery_facade_fastfood_small_building_flat_design_icon-128.png";
    //if we have a description then show it, otherwise empty str
    var description = (typeof restaurant.description !== 'undefined') ? restaurant.description : '';
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: imgurl}} />
        <Text style={styles.description}>{description}</Text>
        </View>
    );
  }
}//end of RestaurantDetail

module.exports = RestaurantDetail;

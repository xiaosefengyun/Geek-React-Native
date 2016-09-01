/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 'use strict'

 import React, { Component } from 'react'
 import { AppRegistry, StyleSheet, Navigator } from 'react-native'
 import HomePage from './jscore/HomePage'


class gank extends Component {
  render() {
    return (
      <Navigator style = {styles.container}
        initialRoute={{
          component: HomePage
        }}
        renderScene={(route, navigator) => {
          return <route.component navigator={navigator} {...route} {...route.passProps}/>
        }}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('gank', () => gank);

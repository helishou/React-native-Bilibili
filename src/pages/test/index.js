import React, {useState, useRef} from 'react';
import {
  Button,
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import Testp from './testp';
const {height, width} = Dimensions.get('window');

export default function Test() {
  return (
    <View
      style={{ height: height, width: width, flex: 1}}>
      <Testp></Testp>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  navigationContainer: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
    padding: 8,
  },
});

import React, {Component, useRef} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {showErrorMsg, navigatePushTo} from '../../util/function';
import {config} from '../../config/defaultMsgConfig';
import {DrawerActions} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';

export default function Header() {
  const navigation = useNavigation();
  // console.log('navigation',navigation)
  // console.log(navigation.openDrawer());
  return (
    <View style={styles.header}>
      <TouchableWithoutFeedback
        onPress={() => {
          console.log('我被点了');
          return navigation.navigate('Search');
        }}>
        <View
          style={{
            posion: 'abosulute',
            right: 10,
            width: 50,
            height: 50,
            top: 40,
            // backgroundColor: 'red',
          }}>
          <View style={styles.circle}>
            <Icon
              name="search"
              size={20}
              style={styles.search}
              // onPress={() => {
              //   console.log('我被点了')
              //   return navigation.navigate('Live');
              // }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          return navigation.openDrawer();
        }}>
        <View
          style={{
            posion: 'abosulute',
            right: -40,
            top: -12,
            width: 50,
            height: 50,
            // backgroundColor: 'red',
          }}>
          <View style={styles.circle}>
            <Image
              style={styles.user}
              source={require('../../static/images/head.jpeg')}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: 'white',
    elevation: 10,
    // top: 5,
    // left:5,
  },
  search: {
    position: 'relative',
    left: 8,
    top: 8,
    color: '#777777',
  },
  user: {
    position: 'relative',
    width: 40 - 2,
    height: 40 - 2,
    borderRadius: 40,
    zIndex: 1,
  },
  header: {
    position: 'absolute',
    right: 0,
    // top:40,
    height: 100,
    width: 100,
    // flex:2,
    // alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
});

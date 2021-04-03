import React, {Component} from 'react';
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
import {styles} from '../../style/CommStyle.js';
export default function Header() {
  const navigation = useNavigation();
  // console.log(navigation.openDrawer());
  return (
    <View style={styles.header}>
      <View>
        <TouchableWithoutFeedback
          onPress={() => {
            return navigation.openDrawer();
          }}
          style={{flex: 1}}>
          <View style={styles.circleUser}>
            <Image
              style={styles.user}
              source={require('../../static/images/head.jpeg')}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => showErrorMsg()}>
          <View style={styles.circleSearch}>
            <Icon
              name="search"
              size={20}
              style={styles.search}
              // onPress={() => navigatePushTo('Search')}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import px2dp from '../../util';
import Icon from 'react-native-vector-icons/Ionicons';
import {marginLeft} from '../../style/CommStyle';
import {useNavigation} from '@react-navigation/native';
export default function index(props) {
  const navigation = useNavigation();
  const title = props.title || '预定义';
  const style = props.style || {};
  // console.log(onClick)
  return (
    <View style={[styles.nav, style]}>
      <Icon
        onPress={() => {
          navigation.goBack();
          try {
            console.log('我试了',props.onClick())
            props.onClick();
          }catch{}
        }}
        name="arrow-back-outline"
        size={px2dp(25)}></Icon>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    height: px2dp(100),
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingTop: px2dp(60),
    paddingLeft: px2dp(20),
  },
  title: {
    position: 'relative',
    bottom: px2dp(3),
    left: px2dp(10),
    // position:'absolute',
    // left:px2dp(20),
    // top:px2dp(50)
    fontSize: px2dp(20),
  },
});

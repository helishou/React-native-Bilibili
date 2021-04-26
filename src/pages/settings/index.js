import React from 'react';
import {View, Dimensions, Text} from 'react-native';
import VideoList from '../../component/videoList';
import Header from '../../component/header';
const {height, width} = Dimensions.get('window');
export default function Settings() {
  return (
    <View>
      <View style={{height: 80, width: width}}>
        <Header search=""></Header>
      </View>

      <Text>功能开发中...</Text>
    </View>
  );
}

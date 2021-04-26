import React from 'react';
import {View, Dimensions} from 'react-native';
import VideoList from '../../component/videoList';
import Header from '../../component/header';
const {height, width} = Dimensions.get('window');
export default function History() {
  return (
    <View>
      <View style={{height: 80, width: width}}>
        <Header search=""></Header>
      </View>
      <VideoList></VideoList>
    </View>
  );
}

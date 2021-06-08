/*
 * @Author       : helishou
 * @Date         : 2021-04-26 21:39:43
 * @LastEditTime : 2021-06-08 09:21:17
 * @LastEditors  : helishou
 * @Description  :
 * @FilePath     : \src\pages\settings\index.js
 * 你用你的指尖,阻止我说再见,在bug完全失去之前
 */
import React from 'react';
import {View, Dimensions, Text} from 'react-native';
import Header from '../../component/header';
const {width} = Dimensions.get('window');
export default function Settings() {
  return (
    <View>
      <View style={{height: 80, width: width}}>
        <Header search="" />
      </View>

      <Text>功能开发中...</Text>
    </View>
  );
}

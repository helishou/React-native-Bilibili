
import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialTopTabNavigator from './materialTopTabNavigator';

import Search from './pages/search';

const StackTab = createStackNavigator();
export default function StackNavigator() {
  return (
    <StackTab.Navigator
    // screenOptions={{headerShown:false}}
    >
      <StackTab.Screen
        name="Bilibili"
        component={MaterialTopTabNavigator}
        options={{title: '哔哩哔哩', headerShown: false}}></StackTab.Screen>
      {/* <StackTab.Screen
        name="Search"
        component={Search}
        options={{title: '搜索'}}></StackTab.Screen> */}
      {/* <StackTab.Screen
        name="earch"
        component={Live}
        options={{title: '搜索'}}></StackTab.Screen> */}
      {/* <StackTab.Screen
        name="VideoPlayDetail"
        component={VideoPlayDetail}
        options={{title: '视频播放'}}></StackTab.Screen> */}
    </StackTab.Navigator>
  );
}

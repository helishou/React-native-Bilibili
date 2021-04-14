import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './bottomBar';
import Search from '../pages/search';
import {connect} from 'react-redux';
import UserDetail from '../pages/userDetail';
const StackTab = createStackNavigator();
function StackNavigator(props) {
  return (
    <StackTab.Navigator
    // screenOptions={{headerShown:false}}
    >
      <StackTab.Screen
        name="Bilibili"
        component={TabNavigator}
        options={{title: '哔哩哔哩', headerShown: false}}></StackTab.Screen>
      <StackTab.Screen
        name="Search"
        component={Search}
        options={{
          title: '搜索',
          headerShown: !props.pressed,
        }}></StackTab.Screen>
      <StackTab.Screen
        name="userDetail"
        component={UserDetail}
        options={{
          title: '个人空间',
          headerShown: !props.pressed,
        }}></StackTab.Screen>
      {/* <StackTab.Screen
        name="VideoPlayDetail"
        component={VideoPlayDetail}
        options={{title: '视频播放'}}></StackTab.Screen> */}
    </StackTab.Navigator>
  );
}
export default connect(state => ({pressed: state.pressed}), {})(StackNavigator);

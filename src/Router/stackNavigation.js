import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './bottomBar';
import Search from '../pages/search';
import {connect} from 'react-redux';
import UserDetail from '../pages/userDetail';
import VideoPlayDetail from '../pages/videoPlayDetail';
import Findings from '../component/bottom/findings';
import CommunionDetail from '../pages/communionDetail';
import MaterialTopTabNavigator from './materialTopTabNavigator';
import {Easing} from 'react-native';
const StackTab = createStackNavigator();
function StackNavigator(props) {
  return (
    <StackTab.Navigator
      screenOptions={{
        transitionSpec: {
          // 进入页面的配置
          open: {
            animation: 'timing',
            config: {
              duration: 450,
            },
          },
          // 关闭页面的配置
          close: {
            animation: 'timing',
            config: {
              duration: 450,
            },
          },
        },
      }}>
      <StackTab.Screen
        name="Bilibili"
        // component={TabNavigator}
        component={MaterialTopTabNavigator}
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
        options={({navigation, route}) => {
          console.log(route);
          const {params} = route;
          return {
            title: '',
            // title: params ? params.owner.name : '出错了',
            headerShown: !props.pressed,
            // headerTransparent:'true'
          };
        }}
      />
      <StackTab.Screen
        name="CommunionDetail"
        component={CommunionDetail}
        options={({navigation, route}) => {
          console.log(route);
          const {params} = route;
          return {
            title: 'biubiubiu',
            // title: params ? params.owner.name : '出错了',
            // headerShown: false,
            // headerTransparent:'true'
          };
        }}
      />
      <StackTab.Screen
        name="VideoPlayDetail"
        mode="card"
        // headerMode='float'
        component={VideoPlayDetail}
        options={{
          title: '',
          headerTransparent: 'true',
          headerShown: false,
          // gesturesEnabled:'false',
          // headerMode: 'float',
        }}></StackTab.Screen>
      <StackTab.Screen
        name="Findings2"
        mode="card"
        // headerMode='float'
        component={Findings}
        options={{
          title: '',
          headerTransparent: 'true',
          // gesturesEnabled:'false',
          // headerMode: 'float',
        }}></StackTab.Screen>
    </StackTab.Navigator>
  );
}
export default connect(state => ({pressed: state.pressed}), {})(StackNavigator);

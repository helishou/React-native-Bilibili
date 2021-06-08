/*
 * @Author       : helishou
 * @Date         : 2021-04-26 21:39:43
 * @LastEditTime : 2021-06-08 10:21:01
 * @LastEditors  : helishou
 * @Description  : 栈导航
 * @FilePath     : \src\router\stackNavigation.js
 * 你用你的指尖,阻止我说再见,在bug完全失去之前
 */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Search from '../pages/search';
import {connect} from 'react-redux';
import UserDetail from '../pages/userDetail';
import VideoPlayDetail from '../pages/videoPlayDetail';
// import Findings from '../component/bottom/findings';
import CommunionDetail from '../pages/communion/communionDetail';
import MaterialTopTabNavigator from './materialTopTabNavigator';
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
        options={{title: '哔哩哔哩', headerShown: false}}
      />
      <StackTab.Screen
        name="Search"
        component={Search}
        options={{
          title: '搜索',
          headerShown: !props.pressed,
        }}
      />
      <StackTab.Screen
        name="userDetail"
        component={UserDetail}
        options={({navigation, route}) => {
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
          const {params} = route;
          return {
            title: '包子铺',
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
        }}
      />
      {/* <StackTab.Screen
        name="Findings2"
        mode="card"
        // headerMode='float'
        component={Findings}
        options={{
          title: '',
          headerTransparent: 'true',
          // gesturesEnabled:'false',
          // headerMode: 'float',
        }}></StackTab.Screen> */}
    </StackTab.Navigator>
  );
}
export default connect(state => ({pressed: state.pressed}), {})(StackNavigator);

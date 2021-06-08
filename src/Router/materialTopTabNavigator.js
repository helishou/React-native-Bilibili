/*
 * @Author       : helishou
 * @Date         : 2021-04-26 21:39:43
 * @LastEditTime : 2021-06-08 09:56:29
 * @LastEditors  : helishou
 * @Description  : 顶部导航
 * @FilePath     : \src\router\materialTopTabNavigator.js
 * 你用你的指尖,阻止我说再见,在bug完全失去之前
 */
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Suggest from '../pages/suggest/Suggest';
import Communion from '../pages/communion';
import Header from '../component/header';

import MyTabBar from './myTabBar';
import {connect} from 'react-redux';
const MaterialTopTab = createMaterialTopTabNavigator();

function MaterialTopTabNavigator(props) {
  return (
    <MaterialTopTab.Navigator
      // headerShown={false}
      // style={{backgroundColor:'rgba(0,0,0,0)'}}
      swipeEnabled={props.pressed ? false : true}
      initialRouteName="Suggest"
      lazy="true"
      backBehavior
      tabBar={props => <MyTabBar {...props} />}>
      {/* <MaterialTopTab.Screen
        name="Live"
        component={Live}
        options={{
          title: '直播',
          // tabBarIcon: <Ionicons name="home" />
        }}
      /> */}
      <MaterialTopTab.Screen
        name="Suggest"
        component={Suggest}
        options={{title: '推荐', headerRight: <Header />}}
      />
      {/* <MaterialTopTab.Screen
        name="Category"
        component={Category}
        options={{title: '分区'}}
      /> */}
      <MaterialTopTab.Screen
        name="Communion"
        component={Communion}
        options={{title: '交流'}}
      />
      {/* <MaterialTopTab.Screen
        name="CategoryList"
        component={Category}
        options={{title: '目录'}}
      /> */}
    </MaterialTopTab.Navigator>
  );
}
export default connect(
  state => ({pressed: state.pressed}),
  {},
)(MaterialTopTabNavigator);

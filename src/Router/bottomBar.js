import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
// import StackNavigator from './stackNavigation';
import MaterialTopTabNavigator from './materialTopTabNavigator';


import Ionicons from 'react-native-vector-icons/Ionicons';

import Mv from '../component/movement';
import Me from '../component/bottom/me';
import Findings from '../component/bottom/findings';
import Message from '../component/bottom/message';
import Test from '../pages/test';
import {connect} from 'react-redux';
const Tab = createBottomTabNavigator();
function TabNavigator(props) {
  console.log('bottom', props.fullscreen);
  return (
    <Tab.Navigator
      // tabBar={props => <MyTabBar {...props} />}
      adaptive={true}
      screenOptions={
        ({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            // console.log('route', route);
            return route.name != 'test' ? (
              focused ? (
                <Ionicons name={route.name} size={size} color={color} />
              ) : (
                <Ionicons
                  name={route.name + '-outline'}
                  size={size}
                  color={color}
                />
              )
            ) : null;
          },
        })
        // {animationEnabled: true, scrollEnabled: true}
      }
      tabBarOptions={{
        activeTintColor: '#01BDC5',
        inactiveTintColor: '#999',
      }}
      initialRouteName="test">
      {/* <Tab.Screen name="test" component={Test} options={{title: '测试页面'}} /> */}
      <Tab.Screen
        name="home"
        component={MaterialTopTabNavigator}
        options={{
          title: '主页',
          tabBarVisible: props.fullscreen ? false : true,
        }}
      />
      <Tab.Screen
        name="infinite"
        component={Findings}
        options={{
          title: '发现',
        }}
      />
      <Tab.Screen name="fitness" component={Mv} options={{title: '动态'}} />
      <Tab.Screen
        name="chatbubble-ellipses"
        component={Message}
        options={{title: '消息'}}
      />
      <Tab.Screen name="tv" component={Me} options={{title: '我的'}} />
    </Tab.Navigator>
  );
}

export default connect(
  state => ({fullscreen: state.fullscreen}),
  {},
)(TabNavigator);

import React, {Component} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Suggest from './component/suggest/Suggest';
import Live from './component/live/Live';
import Dance from './component/category/Dance';
import Communion from './component/communion/Communion';
import CommunionDetail from './component/communion/CommunionDetail';
import mv from './component/movement';
import VideoPlayDetail from './component/video/VideoPlayDetail';
import LivePlayOnWebview from './component/live/LivePlayOnWebview';
import Category from './component/category/Category';
import CategoryList from './component/category/CategoryList';
import Setting from './component/Setting';
import Header from './component/header/Header';
import Search from './component/header/Search';
import {NavigationContainer} from '@react-navigation/native';
const MaterialTopTab = createMaterialTopTabNavigator();
function MaterialTopTabNavigator() {
  return (
    <MaterialTopTab.Navigator
      initialRouteName="Live"
      screenOptions={{animationEnabled: true, scrollEnabled: true}}
      lazy="true">
      <MaterialTopTab.Screen
        name="Live"
        component={Live}
        options={{title: '直播'}}
      />
      <MaterialTopTab.Screen
        name="Suggest"
        component={Suggest}
        options={{title: '推荐'}}
      />
      <MaterialTopTab.Screen
        name="category"
        component={Category}
        options={{title: '分区'}}
      />
      <MaterialTopTab.Screen
        name="Communion"
        component={Communion}
        options={{title: '交流'}}
      />
      <MaterialTopTab.Screen
        name="movement"
        component={mv}
        options={{title: '动态'}}
      />
    </MaterialTopTab.Navigator>
  );
}
const Tab = createStackNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator
      // initialRouteName="tabs"
      screenOptions={{
        headerTitle: <Header />,
        headerStyle: {
          backgroundColor: '#3496f0',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Tab.Screen name="tabs" component={MaterialTopTabNavigator} />
      <Tab.Screen name="VideoPlayDetail" component={VideoPlayDetail} />
      <Tab.Screen name="LivePlayOnWebview" component={LivePlayOnWebview} />
      <Tab.Screen name="CategoryList" component={CategoryList} />
      <Tab.Screen name="Dance" component={Dance} />
      <Tab.Screen name="CommunionDetail" component={CommunionDetail} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
}
const RootStack = createDrawerNavigator();
function RootNavigation() {
  return (
    <RootStack.Navigator
      initialRouteName="首页"
      overlayColor="transparent"
      screenOptions={{
        // drawerWidth:200,            //侧边栏的宽度
        // drawerPosition:'right',     //定义侧边栏位置右边，默认left左边
        // contentComponent:CustomDrawer,            //自定义侧边栏组件
        drawerBackgroundColor: '#fff4f7', //侧边栏背景色
        drawerContentOptions: {
          //对侧边栏中的标签详细设置如下↓
          activeTintColor: '#3496f0', //标签激活时的前景色
          activeBackgroundColor: '#e7e1ea', //标签激活时的背景色
          inactiveTintColor: '#3c3c3c', //标签未激活时的前景色
          // inactiveBackgroundColor:'#c1e1ff',         //标签未激活时的背景色
          // itemsContainerStyle:{                      //侧边栏整体样式
          //     borderTopWidth:2,borderTopColor:'#5153ff'
          // },
          itemStyle: {
            //单个标签样式
            // borderBottomWidth:2,
            // borderBottomColor:'#000',
          },
          labelStyle: {
            //标签文字样式
            fontSize: 16,
            inactiveTintColor: '#3c3c3c',
            activeTintColor: '#3496f0',
          },
          // iconContainerStyle:styles.icon,            //标签icon样式
        },
      }}>
      <RootStack.Screen
        name="首页"
        component={TabNavigator}
        options={{
          drawerIcon: ({tintColor}) => (
            <Icon name="home" size={26} color={tintColor} />
          ),
        }}
      />
      <RootStack.Screen
        name="我的大会员"
        component={Setting}
        options={{
          drawerIcon: ({tintColor}) => (
            <Icon name="vimeo" size={26} color={tintColor} />
          ),
        }}
      />
      <RootStack.Screen
        name="会员积分"
        component={Setting}
        options={{
          drawerIcon: ({tintColor}) => (
            <Icon name="credit-card" size={26} color={tintColor} />
          ),
        }}
      />
      <RootStack.Screen
        name="免流服务"
        component={Setting}
        options={{
          drawerIcon: ({tintColor}) => (
            <Icon name="signal" size={26} color={tintColor} />
          ),
        }}
      />
      <RootStack.Screen
        name="离线缓存"
        component={Setting}
        options={{
          drawerIcon: ({tintColor}) => (
            <Icon name="download" size={26} color={tintColor} />
          ),
        }}
      />
      <RootStack.Screen
        name="交流设置"
        component={Setting}
        options={{
          drawerIcon: ({tintColor}) => (
            <Icon name="commenting" size={26} color={tintColor} />
          ),
        }}
      />
      <RootStack.Screen
        name="稍后再看"
        component={Setting}
        options={{
          drawerIcon: ({tintColor}) => (
            <Icon name="clock-o" size={26} color={tintColor} />
          ),
        }}
      />
      <RootStack.Screen
        name="我的收藏"
        component={Setting}
        options={{
          drawerIcon: ({tintColor}) => (
            <Icon name="star" size={26} color={tintColor} />
          ),
        }}
      />
      <RootStack.Screen
        name="历史记录"
        component={Setting}
        options={{
          drawerIcon: ({tintColor}) => (
            <Icon name="history" size={26} color={tintColor} />
          ),
        }}
      />
      <RootStack.Screen
        name="主题设置"
        component={Setting}
        options={{
          drawerIcon: ({tintColor}) => (
            <Icon name="adjust" size={26} color={tintColor} />
          ),
        }}
      />
      <RootStack.Screen
        name="设置与帮助"
        component={Setting}
        options={{
          drawerIcon: ({tintColor}) => (
            <Icon name="cog" size={26} color={tintColor} />
          ),
        }}
      />
    </RootStack.Navigator>
  );
}
export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor="#3496f0" animated={true} />
        <NavigationContainer>{RootNavigation()}</NavigationContainer>
      </SafeAreaView>
    );
  }
}

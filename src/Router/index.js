import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import History from '../pages/history';
import Setting from '../pages/settings';
import Search from '../pages/search';
import {connect} from 'react-redux';
// import TabNavigator from './bottomBar.js';
import StackNavigator from './stackNavigation';
// import CustomDrawerContent from './customDrawerContent';

const RootStack = createDrawerNavigator();
function RootNavigation() {
  const isLargeScreen = false;
  return (
    <RootStack.Navigator
      initialRouteName="首页"
      overlayColor="transparent"
      // drawerContent={props => (
      //   <CustomDrawerContent {...props}></CustomDrawerContent>
      // )}
      drawerType={isLargeScreen ? 'permanent' : 'front'}
      // drawerPosition='right'//定义侧边栏位置右边，默认left左边
    >
      <RootStack.Screen
        name="首页"
        component={StackNavigator}
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
        component={History}
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
      <RootStack.Screen
        name="Search"
        component={Search}
        options={{
          title: '',
        }}
      />
    </RootStack.Navigator>
  );
}

function AppInner(props) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        // backgroundColor={themeColor}
        backgroundColor={props.fullscreen ? 'black' : 'rgba(0, 0, 0, 0)'}
        translucent={true}
        barStyle={0 ? 'light-content' : 'dark-content'}
        animated={true}
      />
      {/* <View></View> */}
      <NavigationContainer>{RootNavigation()}</NavigationContainer>
      {/* <NavigationContainer>
        <StackNavigator />
      </NavigationContainer> */}
    </SafeAreaView>
  );
}

export default connect(
  state => ({video: state.video, fullscreen: state.fullscreen}),
  {},
)(AppInner);
// export default AppInner

import React, {Component} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
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

const SuggestStack = createStackNavigator({
  Suggest: {screen: Suggest},
});

const movementStack = createStackNavigator({
  movement: {screen: mv},
});

const LiveStack = createStackNavigator({
  Live: {screen: Live},
});

const CategoryStack = createStackNavigator({
  Category: {screen: Category},
});

const CommunionStack = createStackNavigator({
  Category: {screen: Communion},
});

const HeaderStack = createStackNavigator({
  Header: {screen: Header},
});

const MaterialTopTabNavigator = createMaterialTopTabNavigator(
  {
    直播: LiveStack,
    推荐: SuggestStack,
    分区: CategoryStack,
    交流: CommunionStack,
    动态: movementStack,
  },
  {
    initialRouteName: '推荐',
    animationEnabled: true,
    lazy: true, //由于部分接口请求时间较长，所以暂时取消lazy
    // swipeEnabled: false,
    scrollEnabled: true,
  },
);

const TabStack = createStackNavigator(
  {
    tabs: MaterialTopTabNavigator,
    VideoPlayDetail: {screen: VideoPlayDetail},
    LivePlayOnWebview: {screen: LivePlayOnWebview},
    CategoryList: {screen: CategoryList},
    Dance: {screen: Dance},
    CommunionDetail: {screen: CommunionDetail},
    Search: {screen: Search},
  },
  {
    navigationOptions: {
      header: <Header />,
      headerStyle: {
        backgroundColor: '#3496f0',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const RootStack = createDrawerNavigator(
  {
    首页: {
      screen: TabStack,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Icon name="home" size={26} style={{color: tintColor}} />
        ),
      },
    },
    我的大会员: {
      screen: Setting,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Icon name="vimeo" size={26} style={{color: tintColor}} />
        ),
      },
    },
    会员积分: {
      screen: Setting,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Icon name="credit-card" size={26} style={{color: tintColor}} />
        ),
      },
    },
    免流服务: {
      screen: Setting,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Icon name="signal" size={26} style={{color: tintColor}} />
        ),
      },
    },
    离线缓存: {
      screen: Setting,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Icon name="download" size={26} style={{color: tintColor}} />
        ),
      },
    },
    交流设置: {
      screen: Setting,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Icon name="commenting" size={26} style={{color: tintColor}} />
        ),
      },
    },
    稍后再看: {
      screen: Setting,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Icon name="clock-o" size={26} style={{color: tintColor}} />
        ),
      },
    },
    我的收藏: {
      screen: Setting,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Icon name="star" size={26} style={{color: tintColor}} />
        ),
      },
    },
    历史记录: {
      screen: Setting,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Icon name="history" size={26} style={{color: tintColor}} />
        ),
      },
    },
    主题设置: {
      screen: Setting,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Icon name="adjust" size={26} style={{color: tintColor}} />
        ),
      },
    },
    设置与帮助: {
      screen: Setting,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Icon name="cog" size={26} style={{color: tintColor}} />
        ),
      },
    },
  },
  {
    // drawerWidth:200,            //侧边栏的宽度
    // drawerPosition:'right',     //定义侧边栏位置右边，默认left左边
    // contentComponent:CustomDrawer,            //自定义侧边栏组件
    drawerBackgroundColor: '#fff4f7', //侧边栏背景色
    contentOptions: {
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
  },
);

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor="#3496f0" animated={true} />
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </SafeAreaView>
    );
  }
}

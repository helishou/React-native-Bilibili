import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

const MaterialTopTab = createMaterialTopTabNavigator();
function MaterialTopTabNavigator() {
  return (
    <MaterialTopTab.Navigator
      initialRouteName="推荐"
      screenOptions={{animationEnabled: true, lazy: true, scrollEnabled: true}}>
      <MaterialTopTab.screen
        name="Live"
        component={Live}
        options={{title: '直播'}}
      />
      <MaterialTopTab.screen
        name="Suggest"
        component={Suggest}
        options={{title: '直播'}}
      />
      <MaterialTopTab.screen
        name="category"
        component={Category}
        options={{title: '分区'}}
      />
      <MaterialTopTab.screen
        name="Communion"
        component={Communion}
        options={{title: '交流'}}
      />
      <MaterialTopTab.screen
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
    <Tab.Navigator>
      <Tab.screen name="tabs" component={MaterialTopTabNavigator} />
      <Tab.screen name="VideoPlayDetail" component={VideoPlayDetail} />
      <Tab.screen name="LivePlayOnWebview" component={LivePlayOnWebview} />
      <Tab.screen name="CategoryList" component={CategoryList} />
      <Tab.screen name="Dance" component={Dance} />
      <Tab.screen name="CommunionDetail" component={CommunionDetail} />
      <Tab.screen name="Search" component={Search} />
    </Tab.Navigator>
  );
}

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
import React from 'react'
import { moduleName } from 'react-native'
// 导入底部导航组件
import {createBottomTabNavigator} from 'react-navigation-tabs'
//导入底部导航拦相关的三个页面
import HomePage from '../home/HomePage.js'
import CatePage from '../cate/CatePage.js'
import MinePage from '../mine/MinePage.js'

//定义整个底部导航拦组件
const BottomNavigator =createBottomTabNavigator({
    Home:{
        screen:HomePage,
        navationOptions:{
            title:'首页',
            tabBarLabel:'首页'
        }
    },
    Cate:{
        screen:CatePage,
        navationOptions:{
            title:'分类',
            tabBarLabel:'分类'
        }
    },
    Me:{
        screen:MinePage,
        navationOptions:{
            title:'Me',
            tabBarLabel:'Me'
        }
    },

})
export default BottomNavigator;

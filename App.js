import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import BottomNavigator from './page/root/RootPage'
import BriefPage from './page/brief/BriefPage'
import ImgPage from './page/brief/ImgPage'
import ListPage from './page/cate/ListPage'
import {View, Text} from 'react-native';


//设置react-native路由导航
const AppStack = createStackNavigator(
  {
    BottomNavigator:{
      screen:BottomNavigator,
      navigationOptions:{
        headerShown:false,
      }
    },
    Brief:{screen:BriefPage},
    ImgPage:{screen:ImgPage},
    ListPage:{screen:ListPage}
  },
  {
    mode:'modal',
    headerMode:'none'
  }
)
// const App = () => {
//   return (
//     <View>
//       <View>
//         <Text>Wxy打码</Text>
//       </View>
//       <View style={{marginTop: 8, padding: 8, backgroundColor: 'blue'}}>
//         <Text style={{color: 'white'}}>Wxy打码1</Text>
//       </View>
//       <View
//         style={{marginTop: 8, padding: 8, width: 200, backgroundColor: 'blue'}}>
//         <Text style={{color: 'white'}}>Wxy打码2</Text>
//       </View>
//       <View>
//         <Text style={{color: 'black'}}>Wxy打码3</Text>
//       </View>
//       <AppStack/>
//     </View>        
//   );
// };

export default createAppContainer(AppStack);

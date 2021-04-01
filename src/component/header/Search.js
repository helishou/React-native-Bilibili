import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class Search extends Component {
  static navigationOptions = ({navigation}) => {
    let header;
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
    return {
      tabBarVisible,
      header,
      title: '搜索',
      headerStyle: {
        backgroundColor: '#3496f0',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };

  render() {
    return (
      <View>
        <Text>搜索页面</Text>
      </View>
    );
  }
}

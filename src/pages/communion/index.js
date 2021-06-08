/*
 * @Author       : helishou
 * @Date         : 2021-04-01 10:56:12
 * @LastEditTime : 2021-06-08 10:17:49
 * @LastEditors  : helishou
 * @Description  : 交流页面
 * @FilePath     : \src\pages\communion\index.js
 * 你用你的指尖,阻止我说再见,在bug完全失去之前
 */
import React from 'react';
import {Button, Image, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
class MV extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      header: null,
      tabBarVisible: false,
    };
  };

  render() {
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        locations={[0, 0.1]}
        colors={['#f4f4f4', '#fff']}
        style={{
          flex: 1,
          // justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{width: 350, height: 350, marginBottom: 30, marginTop: 100}}
          source={require('../../static/images/communion.jpg')}
        />
        <Button
          title="详细介绍"
          onPress={() => this.props.navigation.navigate('CommunionDetail')}
        />
        <Text style={styles.text}>@copyRight：helishou</Text>
        <Text style={styles.text}>联系方式：479525390@qq.com</Text>
      </LinearGradient>
    );
  }
}

export default MV;

const styles = StyleSheet.create({
  text: {
    // fontSize: 10,
    marginTop: 5,
    color: '#01BDC5',
  },
});

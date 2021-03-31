import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  View,
  Image,
  StyleSheet,
  Button,
  Alert,
  Text,
  TouchableOpacity,
  TextInput,
  Animated,
  Switch,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
export default function App15() {
  const [hidden, setHidden] = useState(false);
  const [barStyle, setBarStyle] = useState('light-content');
  const changeHidden = () => {
    setHidden(!hidden);
  };
  const changeBarstyle = () => {
    setBarStyle(barStyle == 'light-content' ? 'dark-content' : 'light-content');
  };
  return (
    <ScrollView contentContainerStyle = {{flex:1}}>
    <View style={styles.container}>
      <StatusBar barStyle={barStyle} hidden={hidden}></StatusBar>
      <TouchableOpacity style={styles.button} onPress={changeHidden} ><Text>显示或者隐藏</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={changeBarstyle} ><Text>改变主题色</Text></TouchableOpacity>

    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'blue',
    // width:50,
    // height:100,
  },
  button: {
    // flex: 1,
    margin:20,
    height: 40,
    borderColor:'black',
    borderRadius:50,
   borderWidth:1,
    justifyContent: 'center',
    width: 100,
    backgroundColor: '#4ba37b',
    alignItems: 'center',
  },
  buttonTxt: {
    justifyContent: 'center',
    color: '#ffffff',
  },
  container: {
    flex: 1,
    // marginTop: 10,
    // paddingTop: 100,
    // backgroundColor:'red',
    // justifyContent:'center',
    alignItems: 'center',
  },
});

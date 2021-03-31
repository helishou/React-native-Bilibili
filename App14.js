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
  Switch
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
export default function App14() {
  const label = {false:'关',true:'开'}
  const [switchValue, setSwitchValue] = useState(true)
  const toggleSwitch = (value) =>{
    setSwitchValue(value)
  }
  
  
  return (
<View style={styles.container}>
    <Switch 
    onValueChange={toggleSwitch}
    // style={{color:'yellow'}}
    value={switchValue}></Switch>
    <View><Text>switch 现在的状态是:{label[switchValue]}</Text></View>
</View>
  );
}

const styles = StyleSheet.create({
  box:{
    backgroundColor:'blue',
    // width:50,
    // height:100,
  },
  button: {
    flex: 1,
    height: 44,
    justifyContent: 'center',
    width: 100,
    backgroundColor: 'red',
    alignItems: 'center',
  },
  buttonTxt: {
    justifyContent: 'center',
    color: '#ffffff',
  },
  container: {
    flex: 1,
    // marginTop: 10,
    paddingTop:100,
    // backgroundColor:'red',
    // justifyContent:'center',s
    alignItems:'center'
  },
});

import React from 'react';
import { View,Text,StyleSheet } from 'react-native';

export default function CustomDrawerContent(props) {
  // console.log('自定义侧边',props)
  // console.log('---------------')
  return (
    <View style={styles.container}>
      {/* <View style={styles.test}></View> */}
      <Text style={styles.text}>功能施工中</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    margin:100,
    flex:1,
    backgroundColor: 'red',
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    // height:800,
    // width:200,
  },
  test:{
    backgroundColor: 'red',
    height:800,
    width:200,
  },
  text:{

  },
})

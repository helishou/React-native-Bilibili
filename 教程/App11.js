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
} from 'react-native';
export default function App10() {
  const showAlert = () => {
    Alert.alert('发送数据成功');
  };
  const showAlert2 = () => {
    Alert.alert(
      '警告',
      '确认删除?',
      [
        {text: '确认', onPress: () => showTip()},
        {text: '取消', style: 'cancel'},
      ],
      {cancelable: false},
    );
  };
  const showTip = () => {
    Alert.alert('删除数据成功');
  };
  return (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity onPress={showAlert} style={styles.Button}>
        <Text style={{fontSize: 20}}>发 送</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={showAlert2} style={styles.Button}>
        <Text style={{fontSize: 20}}>删 除</Text>
      </TouchableOpacity>
      <Image
        style={{margin: 10, width: 200, height: 200, resizeMode: 'cover'}}
        source={{
          uri:
            'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2588644203,3440251002&fm=11&gp=0.jpg',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Button: {
    backgroundColor: '#4ba37b',
    width: 100,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  activityIndicator: {
    height: 80,
  },
  container: {
    flex: 1,
    marginTop: 70,
  },
});

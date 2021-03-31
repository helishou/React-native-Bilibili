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
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
export default function App10() {
  const [name, setName] = useState('胡宏洋,你胖吗');
  const [inputText, setInputText] = useState(
    '不是很清楚,最近体重秤坏了,会多转一圈,才十几斤',
  );
  const readName = async () => {
    try {
      const value = await AsyncStorage.getItem('name');
      if (value !== null) {
        setName(value);
      }
      Alert.alert('读取数据成功');
    } catch (e) {
      console.log(e);
      Alert.alert('读取数据失败!');
    }
  };
  const saveName = () => {
    AsyncStorage.setItem('name', inputText);
    Alert.alert('保存成功',inputText);
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        autoCapitalize="none"
        placeholder={inputText}  onChangeText={(text)=>{setInputText(text)}}></TextInput>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={[styles.button, {marginRight: 8}]}
          onPress={saveName}>
          <Text style={styles.buttonTxt}>保存</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor:'blue'}]}
          onPress={readName}>
          <Text style={styles.buttonTxt}>读取</Text>
        </TouchableOpacity>
      </View>
      <View style={{margin:9}}>
          <Text style={styles.inputText}>当前的值:{name}</Text>
      </View>
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
    textInput:{
        margin:5,
        height:44,width:"100%",
        borderWidth:1,
        borderColor:'#dddddd'
    },
  button:{
    flex:1,
    height:44,
    justifyContent:'center',
    width:100,
    backgroundColor:'red',
    alignItems:'center'
  },
  buttonTxt:{
    justifyContent:'center',
    color:'#ffffff'
  },
  container: {
    flex: 1,
    margin: 10,
  },
});

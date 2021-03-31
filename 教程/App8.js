import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

export default function app8() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [intro, setIntro] = useState('');
  handleEmail = text => {
    setEmail(text);
  };
  handlePassword = text => {
    setPassword(text);
  };
  handleInsetIntro = text => {
    setIntro(text);
  };
  register = () => {
    alert('email:' + email + '\npassword:' + password + '\nintro:' + intro);
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        //   下划线的颜色,透明
        underlineColorAndroid="transparent"
        //占位符
        placeholder="请输入邮箱"
        //占位符颜色
        placeholderTextColor="#f4f4f4"
        //   字母大写模式
        autoCapitalize="none"
        //键盘类型
        keyboardType="email-address"
        //键盘上的返回键类型 可选值有done go next search send
        returnKeyType="next"
        //   文本变更后的回调函数,参数为输入框里的文本
        onChangeText={handleEmail}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        // underlineColorAndroid="transparent"
        placeholder="请输入密码"
        placeholderTextColor="#f4f4f4"
        autoCapitalize="none"
        //键盘类型
        // keyboardType="visible-password"
        //键盘上的返回键类型 可选值有done go next search send
        returnKeyType="next"
        //   文本变更后的回调函数,参数为输入框里的文本
        onChangeText={handlePassword}
      />
      <TextInput
        style={[styles.input, {height: 100}]}
        //设置多行
        multiline={true}
        //函数
        numberOfLines={4}
        //文字的位置考上
        textAlignVertical="top"
        underlineColorAndroid="transparent"
        //占位符
        placeholder="请输入描述"
        //占位符颜色
        placeholderTextColor="#f4f4f4"
        //   字母大写模式
        autoCapitalize="none"
        //键盘类型
        keyboardType="default"
        //键盘上的返回键类型 可选值有done go next search send
        returnKeyType="done"
        //   文本变更后的回调函数,参数为输入框里的文本
        onChangeText={handleInsetIntro}
      />
      {/* 提交按钮 */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => register(email, password, intro)}>
        <Text style={{color:'white'}}>注册</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    input:{
        // fontSize:20,
        margin:15,
        height:40,
        borderColor:'#eeeeee' ,
        borderRadius:1,
        borderWidth:1,
        backgroundColor:'hsla(50, 33%, 25%, 0.3)',
    },
    submitButton:{
        backgroundColor:'red',
        padding:10,
        alignItems:'center',
        // alignSelf:'center',
        margin:15 ,
        height:40,
    },
});

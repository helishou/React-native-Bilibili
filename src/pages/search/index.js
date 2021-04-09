import React from 'react';
import SeachView from '../../component/searchView';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import px2dp from '../../util';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {reqSeach} from '../../config/api';
// import { styles } from '../../style/CommStyle';
export default function Search() {
  const [text, setText] = useState('');
  const onChangeText = text => {
    setText(text);
  };
  // const fetchData = keyword => {
  //   // let formData = new FormData();
  //   // formData.append('keyword', keyword);
  //   // let opts = {
  //   //   method: 'POST', //请求方法
  //   //   body: formData, //请求体
  //   //   headers: {

  //   //     'Accept':'application/json',
        
  //   //     'Content-Type':'multipart/form-data;boundary=6ff46e0b6b5148d984f148b6542e5a5d'
        
  //   //     },
  //   // };
  //   fetch(`http://api.bilibili.com/x/web-interface/search/all/v2?keyword=${keyword}`)
  //     .then(response => {
  //       console.log('resp',response)
  //       return response.json()})
  //     .then(Soucedata => {
  //       console.log('111', Soucedata);
  //     })
  //     .catch(err => {
  //       console.log('error!!!', err);
  //     })
  //     .done();
  // };
  const onEndEditing = async () => {
    const result = await reqSeach(text);
    // fetchData(text)
    console.log(result);
  };
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.searchBox}>
          <Icon name="search" size={18} style={styles.searchIcon}></Icon>

          <TextInput
            autoFocus={true}
            placeholder="请输入文字"
            style={styles.inputText}
            keyboardType="web-search"
            onChangeText={text => onChangeText(text)}
            onEndEditing={() => onEndEditing()}
          />
        </View>
      </View>
      <SeachView></SeachView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // 水平排布
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: Platform.OS === 'ios' ? 20 : 0, // 处理iOS状态栏
    height: Platform.OS === 'ios' ? 68 : 58, // 处理iOS状态栏
    backgroundColor: '#ffffff',
    alignItems: 'center', // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中
  },

  searchBox: {
    //搜索框
    height: 40,
    flexDirection: 'row', // 水平排布
    flex: 1,
    borderRadius: 5, // 设置圆角边
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 8,
    // elevation:10,
  },
  searchIcon: {
    //搜索图标
    height: 20,
    width: 20,
    marginLeft: 10,
    // resizeMode: 'stretch',
    opacity: 0.7,
  },
  inputText: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: 15,
  },
});

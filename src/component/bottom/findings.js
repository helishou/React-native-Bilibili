import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Button,
  ScrollView
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import WebView from 'react-native-webview'
import Orientation from 'react-native-orientation';
import VideoPlayer from '../video/VideoPlayer'
// 计算左侧的外边距，使其居中显示
const {width, height} = Dimensions.get('window');
const cols = 2;
const marginLeft = 8;

const card_width = Number.parseInt((width - (cols + 1) * marginLeft) / cols);
const card_height = 120;
const hMargin = 10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  fullScreen:{
    position: 'absolute',
    top: 0,
    right: 0,
    // transform:[{rotate:'90deg'},{scale:height/width}],
    height: width,
    width: height,
    zIndex: 0,
  }
})

const url = 'https://player.bilibili.com/player.html?aid=927382529&cid=244002362&page=1'

export default function VideoExample (props) {
  useEffect(() => {
    Orientation.lockToLandscape();
    return () => {
      Orientation.lockToLandscape();
    }
  }, [])
  // console.log(props.route.params)
    return (
      <View style={styles.container}>
                  <WebView
            source={{ uri: 'http://player.bilibili.com/player.html?aid=417243313&cid=313087062&page=1' }}
            style={styles.fullScreen}
          />
      </View>
    )

}

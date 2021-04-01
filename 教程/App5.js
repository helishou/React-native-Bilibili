import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Taptap
        {/* 设置红色字体样式 */}
        <Text style={styles.capitalLetter}>仿</Text>
        <Text>打码</Text>
        {/* 设置字体加粗 */}
        <Text>
          机器<Text style={styles.wordBold}>打代码</Text>就是牛!竟然1个也不错!
        </Text>
        {/* 设置斜体 */}
        <Text style={styles.italicText}>这都不打赏!</Text>
        <Text style={styles.textShadow}>抹了油的键盘</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {color: '#41cdf4'},
  container: {
    alignItems: 'center',
    marginTop: 100,
    padding: 20,
  },
  capitalLetter: {color: 'red', fontSize: 20},
  italicText: {fontStyle: 'italic', color: '#37849b'},
  wordBold: {fontWeight: 'bold', color: 'black'},
  textShadow: {
    textShadowColor: 'red',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 1,
  },
});

/*
 * @Author       : helishou
 * @Date         : 2021-04-12 09:06:06
 * @LastEditTime : 2021-06-08 10:19:37
 * @LastEditors  : helishou
 * @Description  : 作者简介
 * @FilePath     : \src\pages\communion\communionDetail\index.js
 * 你用你的指尖,阻止我说再见,在bug完全失去之前
 */
import React, {useEffect, useState, useRef} from 'react';
import {BackHandler} from 'react-native';
import {WebView} from 'react-native-webview';
export default function CommunionDetail() {
  // const [isBack, setIsBack] = useState(false);
  // const webRef = useRef('');
  // useEffect(() => {
  //   const handleBackPress = () => {
  //     console.log('6');
  //     if (isBack) {
  //       console.log(webRef.current);
  //       webRef.current.goBack();
  //       return true;
  //     }
  //   };
  //   BackHandler.addEventListener('hardwareBackPress', handleBackPress);
  //   return () => {
  //     BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  //   };
  // }, []);

  // // 获取 webview 事件返回的 canGoBack 属性 ， 判断网页是否可以回退
  // function _onNavigationStateChange(navState) {
  //   console.log('change');
  //   if (navState.canGoBack) {
  //     setIsBack(true);
  //   } else {
  //     setIsBack(false);
  //   }
  // }

  return (
    <WebView
      // ref={webRef}
      source={{uri: 'http://wangxinyang.xyz/article/60bed39f538f510268ba51b2'}}
      // onNavigationStateChange={_onNavigationStateChange}
      mediaPlaybackRequiresUserAction={false}
      startInLoadingState={true}
      injectedJavaScript={"$('.header,footer').remove();"}
    />
  );
}

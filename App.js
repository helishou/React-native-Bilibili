/*
 * @Author       : helishou
 * @Date         : 2021-04-13 19:46:12
 * @LastEditTime : 2021-06-08 09:45:49
 * @LastEditors  : helishou
 * @Description  : 主入口
 * @FilePath     : \App.js
 * 你用你的指尖,阻止我说再见,在bug完全失去之前
 */
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import React, {useEffect} from 'react';
import AppInner from './src/router';
import stores from './src/redux/store';
import SplashScreen from 'react-native-splash-screen';
import Orientation from 'react-native-orientation';
export default function App() {
  useEffect(() => {
    SplashScreen.hide();
    Orientation.lockToPortrait();
    return () => {};
  }, []);
  return (
    <Provider store={stores}>
      <AppInner />
    </Provider>
  );
}

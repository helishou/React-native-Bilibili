import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import React, {useEffect} from 'react';
import AppInner from './src/Router';
import stores from './src/redux/store';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar, View, Text } from "react-native";
export default function App() {
  useEffect(() => {
    SplashScreen.hide();
    return () => {};
  }, []);
  return (
    <Provider store={stores}>
      <AppInner />
    </Provider>
  );
}

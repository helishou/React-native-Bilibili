import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import React, {useEffect} from 'react';
import AppInner from './src/router';
import stores from './src/redux/store';
import SplashScreen from 'react-native-splash-screen';
import {StatusBar, View, Text} from 'react-native';
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

import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import React from 'react'
import AppInner from './src/Router';
import stores from './src/redux/store'
export default function App() {
  return (
    <Provider store={stores}>
      <AppInner/>
    </Provider>
  );
}

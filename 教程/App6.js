import React, {useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import SiteComponent from './App7';
export default function App() {
  const [name, setname] = useState('hhy');
  const [type, settype] = useState('牛逼');
  const updateState = () => {
    const newType = type == '牛逼' ? '帅' : '牛逼';
    settype(newType);
  };
  return (
    <View style={styles.container}>
      <Text onPress={updateState} style={{padding: 5, fontSize: 30}}>
        名称:{name}
      </Text>
      <Text style={styles.textShadow}>特点:{type}</Text>
      <SiteComponent name={name} setname={setname} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {color: '#41cdf4'},
  container: {
    alignItems: 'center',
    marginTop: 100,
    padding: 20,
    backgroundColor: 'skyblue',
  },
  capitalLetter: {color: 'red', fontSize: 20},
  italicText: {fontStyle: 'italic', color: '#37849b'},
  wordBold: {fontWeight: 'bold', color: 'black'},
  textShadow: {
    textShadowColor: 'red',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 1,
    fontSize: 30,
  },
});

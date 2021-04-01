import React, {useState} from 'react';
import {View, Text, Alert, StyleSheet} from 'react-native';

export default function SiteNameComponnent(props) {
  // alert(name)
  const {name, setname} = props;
  const [type, settype] = useState('牛逼');
  const updateState = () => {
    const newType = type == '牛逼' ? '帅' : '牛逼';
    settype(newType);
    setname('wxy');
  };
  return (
    <View style={styles.container}>
      <Text>这是一个子组件</Text>
      <Text onPress={updateState} style={{padding: 5, fontSize: 30}}>
        名称:{name}
      </Text>
      <Text style={styles.textShadow}>特点:{type}</Text>
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

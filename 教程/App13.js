import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  View,
  Image,
  StyleSheet,
  Button,
  Alert,
  Text,
  TouchableOpacity,
  TextInput,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
export default function App10() {
  const [animatedStyle, setAnimatedStyle] = useState({});
  useEffect(() => {
    animatedWidth = new Animated.Value(50);
    animatedHeight = new Animated.Value(100);
    setAnimatedStyle({
      width: animatedWidth,
      height: animatedHeight,
    });
    return () => {};
  }, []);
  const animatedBox = () => {
    Animated.timing(animatedWidth, {
      toValue: 200,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    Animated.timing(animatedHeight, {
      toValue: 500,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  return (
    <TouchableOpacity style={styles.container} onPress={animatedBox}>
      <Animated.View style={[styles.box, animatedStyle]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'blue',
    // width:50,
    // height:100,
  },
  button: {
    flex: 1,
    height: 44,
    justifyContent: 'center',
    width: 100,
    backgroundColor: 'red',
    alignItems: 'center',
  },
  buttonTxt: {
    justifyContent: 'center',
    color: '#ffffff',
  },
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

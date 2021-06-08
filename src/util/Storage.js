/*
 * @Author       : helishou
 * @Date         : 2021-04-12 10:00:18
 * @LastEditTime : 2021-06-08 09:23:41
 * @LastEditors  : helishou
 * @Description  :
 * @FilePath     : \src\util\Storage.js
 * 你用你的指尖,阻止我说再见,在bug完全失去之前
 */
import AsyncStorage from '@react-native-community/async-storage';
import {fromPairs} from './function';

export const setItem = (key, value) => {
  return AsyncStorage.setItem(key, value);
};

export const multiGetItem = async key => {
  let result = await AsyncStorage.multiGet(key);
  let item = fromPairs(result);
  return item;
};

/**
 * 获取JSON格式的Storage
 * @param key
 */

export const getItem = async key => {
  let result = await AsyncStorage.getItem(key);
  return JSON.parse(result);
};

export const removeItem = key => {
  return AsyncStorage.removeItem(key);
};

/**
 * 获取字符串格式的Storage
 * @param key
 */

export const getRawItem = async key => await AsyncStorage.getItem(key);

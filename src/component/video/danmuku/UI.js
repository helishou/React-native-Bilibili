/*
 * @Author       : helishou
 * @Date         : 2021-04-20 20:24:55
 * @LastEditTime : 2021-06-08 09:19:08
 * @LastEditors  : helishou
 * @Description  : 弹幕的适配
 * @FilePath     : \src\component\video\danmuku\UI.js
 * 你用你的指尖,阻止我说再见,在bug完全失去之前
 */
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const IS_IPHONE_6 = height === 1334;
const IS_IPHONE_PLUS = height === 2208;
const IS_IPHONE_X = height === 2436;

const size = {
  screenWidth: width,
  screenHeight: height,
};

const fontSize = {
  regular: 16,
  lineHeight: 20,
};

const lineHeight = {
  regular: 20,
};

export default {
  size,
  fontSize,
  lineHeight,
  IS_IPHONE_6,
  IS_IPHONE_PLUS,
  IS_IPHONE_X,
};

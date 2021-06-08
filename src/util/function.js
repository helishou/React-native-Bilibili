/*
 * @Author       : helishou
 * @Date         : 2021-04-01 09:37:53
 * @LastEditTime : 2021-06-08 09:24:04
 * @LastEditors  : helishou
 * @Description  :
 * @FilePath     : \src\util\function.js
 * 你用你的指尖,阻止我说再见,在bug完全失去之前
 */
import {Alert} from 'react-native';

function getLocalTime(timestamp) {
  let date = new Date(timestamp);
  Y = date.getFullYear() + '年';
  M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '月';
  D = date.getDate() + '日 ';
  h = date.getHours() + '时';
  m = date.getMinutes() + '分';
  s = date.getSeconds() + '秒';
  // noinspection JSAnnotator
  return Y + M + D + h + m + s;
}

function getVideoViewsRandomNum(max = 50000, min = 1000) {
  let num = Math.floor(Math.random() * (max - min + 1) + min);
  if (num >= 10000) {
    //保留两位小数
    num = Math.round((num / 10000) * 100) / 100;

    return num + '万';
  } else {
    return num;
  }
}

function showErrorMsg(msg = '亲、非常抱歉。此功能暂时不开放！') {
  Alert.alert('提示', msg);
}

function navigatePushTo(view, parm1, parm2, parm3, parm4, parm5, parm6) {
  this.props.navigation.navigate(view, {
    parm1: parm1,
    parm2: parm2,
    parm3: parm3,
    parm4: parm4,
    parm5: parm5,
    parm6: parm6,
  });
}

//lodash function
export const fromPairs = pairs => {
  var index = -1,
    length = pairs ? pairs.length : 0,
    result = {};

  while (++index < length) {
    var pair = pairs[index];
    result[pair[0]] = pair[1];
  }
  return result;
};

export {getLocalTime, getVideoViewsRandomNum, showErrorMsg, navigatePushTo};

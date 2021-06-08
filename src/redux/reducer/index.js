/*
 * @Author       : helishou
 * @Date         : 2021-04-22 13:49:45
 * @LastEditTime : 2021-06-07 22:05:32
 * @LastEditors  : helishou
 * @Description  :
 * @FilePath     : \src\redux\reducer\index.js
 * 你用你的指尖,阻止我说再见,在bug完全失去之前
 */
import {combineReducers} from 'redux';
import ACTIONTYPES from '../types';
import search from './search';
import common from './common';
const initHeadNavigator = true;
//默认上部导航栏显示
function headNavagator(state = initHeadNavigator, action) {
  switch (action.type) {
    case ACTIONTYPES.SET_HEAD_NAVIGATOR:
      return action.data;
    default:
      return state;
  }
}

const initVideo = {type: 1, currentTime: 0};
function video(state = initVideo, action) {
  let url;
  switch (action.type) {
    case ACTIONTYPES.PLAY_VIDEO:
      url = `https://player.bilibili.com/player.html?aid=${action.data.aid}&cid=${action.data.cid}&high_quality=1&autoplay=true&platform=html5`;
      return {
        ...state,
        url: url,
        ...action.data,
      };
    case ACTIONTYPES.SET_PAGES:
      return {
        ...state,
        cid: action.data.cid,
        videos: action.data.videos,
      };

    case ACTIONTYPES.SWICH_VIDEO:
      url = `https://player.bilibili.com/player.html?aid=${state.aid}&cid=${
        state.cid[action.data].cid
      }&high_quality=1&autoplay=true&platform=html5`;
      // url = `https://www.bilibili.com/blackboard/html5mobileplayer.html?aid=${state.aid}&cid=${state.cid}&page=${action.data}&autoplay=true`;
      return {...state, url: url, pg: action.data};
    case ACTIONTYPES.RESET_VIDEO:
      return {type: state.type};
    case ACTIONTYPES.CHANGE_VIDEO_TYPE:
      return {type: action.data};
    case ACTIONTYPES.UPDATE_VIDEO:
      return {...state, ...action.data};
    default:
      return state;
  }
}
function pressed(state = false, action) {
  switch (action.type) {
    case ACTIONTYPES.PRESSED:
      return action.data;
    default:
      return state;
  }
}
function fullscreen(state = false, action) {
  switch (action.type) {
    case ACTIONTYPES.FULLSCREEN:
      return action.data;
    default:
      return state;
  }
}
// function headNavagator(state=initHeadNavigator,action){
//     switch(action.type){
//         case SET_HEAD_NAVIGATOR:
//             return action.data
//         default:
//             return state
//     }
// }

const reducer = combineReducers({
  headNavagator,
  video,
  pressed,
  fullscreen,
  search,
  common,
});

export default reducer;

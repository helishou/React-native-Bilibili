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

const initVideo = false;
function video(state = initVideo, action) {
  let url;
  switch (action.type) {
    case ACTIONTYPES.PLAY_VIDEO:
      url = `https://player.bilibili.com/player.html?aid=${action.data.aid}&cid=${action.data.cid}&page=${action.data.pg}&autoplay=true`;
      return {url: url, videos: action.data.videos, pg: action.data.pg};
    case ACTIONTYPES.SWi_VIDEO:
      url = `https://player.bilibili.com/player.html?aid=${state.aid}&cid=${state.cid}&page=${action.data.pg}&autoplay=true`;
      return {...state, url: url, pg: action.data.pg};
    case ACTIONTYPES.RESET_VIDEO:
      return {};
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

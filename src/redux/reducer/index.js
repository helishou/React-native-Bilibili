import {combineReducers} from 'redux';
import ACTIONTYPES from '../types';
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
  switch (action.type) {
    case ACTIONTYPES.PLAY_VIDEO:
      const url = `http://player.bilibili.com/player.html?aid=${action.data.aid}&cid=${action.data.cid}&page=1&autoplay=true`;
      return {url: url, videos: action.videos};
    case ACTIONTYPES.RESET_VIDEO:
      return {};
    default:
      return state;
  }
}
function pressed(state = false, action) {
  switch (action.type) {
    case ACTIONTYPES.PRESSED:
        return action.data
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
});

export default reducer;

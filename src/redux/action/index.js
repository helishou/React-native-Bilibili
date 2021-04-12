import ACTIONTYPES from '../types/index.js';

export const playVideo = video => ({type: ACTIONTYPES.PLAY_VIDEO, data: video});
export const resetVideo = () => ({type: ACTIONTYPES.RESET_VIDEO, data: null});
export const changeHeadNavigation = state => ({
  type: ACTIONTYPES.SET_HEAD_NAVIGATOR,
  data: state,
});
export const press = data => ({type: ACTIONTYPES.PRESSED, data});
export const setFullscreen = data => ({type: ACTIONTYPES.FULLSCREEN, data});

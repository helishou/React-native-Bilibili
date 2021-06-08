/*
 * @Author       : helishou
 * @Date         : 2021-04-22 13:49:45
 * @LastEditTime : 2021-06-07 22:27:06
 * @LastEditors  : helishou
 * @Description  : api
 * @FilePath     : \src\config\api.js
 * 你用你的指尖,阻止我说再见,在bug完全失去之前
 */
// import {
//   Toast,
// } from '@ant-design/react-native';
import ajax from './ajax';
// 包含应用中所有接口请求函数的模块
// 要求:能根据接口文档定义接口请求
// 每个函数的返回值都是promise

//登陆

export const reqFuzzySeach = keyword =>
  ajax(
    `http://api.bilibili.com/x/web-interface/search/all/v2?keyword=${keyword}`,
    'POST',
  );
export const reqSeach = (search_type, keyword, page) =>
  ajax(
    `http://api.bilibili.com/x/web-interface/search/type?search_type=${search_type}&keyword=${keyword}&page=${page}`,
  );

export const reqSpaceNotice = mid =>
  ajax('http://api.bilibili.com/x/space/notice', {mid});

export const reqSpaceVideos = mid => {
  return ajax('http://api.bilibili.com/x/space/arc/search', {mid});
};

export const reqVideoDetail = aid => {
  return ajax('https://api.bilibili.com/x/web-interface/view', {aid});
};
export const reqReply = (oid, sort) => {
  return ajax(
    `http://api.bilibili.com/x/v2/reply?type=1&oid=${oid}&sort=${sort}&ps=5&pn=1`,
    {},
  );
};

export const reqVideo = (avid, cid) => {
  return ajax(
    'https://api.bilibili.com/x/player/playurl?type=mp4&platform=html5&high_quality=1',
    {avid, cid},
  );
};
export const reqDanmuku = cid => {
  return ajax('https://bilipi.sigure.xyz/api/v0/danmaku/dplayer', {cid});
};

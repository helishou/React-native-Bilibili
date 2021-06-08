/*
 * @Author       : helishou
 * @Date         : 2021-04-12 09:06:06
 * @LastEditTime : 2021-06-07 21:57:08
 * @LastEditors  : helishou
 * @Description  :
 * @FilePath     : \src\redux\store.js
 * 你用你的指尖,阻止我说再见,在bug完全失去之前
 */
import reducer from './reducer';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

export default createStore(reducer, applyMiddleware(thunkMiddleware));

import reducer from './reducer'
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

export default createStore(reducer, applyMiddleware(thunkMiddleware));

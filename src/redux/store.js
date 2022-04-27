import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import gameReducer from './gameReducer/reducer';

const rootReducer = combineReducers({
    gameReducer
});

const client = axios.create({ //all axios can be used, shown in axios documentation
    baseURL: 'http://localhost:3000/',
    responseType: 'json'
});

export const store = createStore(rootReducer, applyMiddleware(axiosMiddleware(client)));
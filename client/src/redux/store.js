import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import gameReducer from './gameReducer/reducer';

const rootReducer = combineReducers({
    gameReducer
});

const client = axios.create({ //all axios can be used, shown in axios documentation
    baseURL: '/',
    responseType: 'json'
});


const middlewareConfig = {
    interceptors: {
        request: [
            function ({ getState }, req) {
                const token = (state) => state.gameReducer.token;
                const state = getState();

                if (req.url === '/login') {
                    return req;
                }
                
                req.headers['Authorization'] = 'Bearer ' + token(state);
                return req;
            }
        ]
    }
};

export const store = createStore(rootReducer, applyMiddleware(axiosMiddleware(client, middlewareConfig)));
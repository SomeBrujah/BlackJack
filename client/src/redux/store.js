import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import gameReducer from './gameReducer/reducer';
import { loginInGame } from './gameReducer/actions';

const rootReducer = combineReducers({
    gameReducer
});

const client = axios.create({ //all axios can be used, shown in axios documentation
    baseURL: '/',
    responseType: 'json'
});

const token = (state) => state.gameReducer.token;

const axiosMiddlewareConfig = {
    interceptors: {
        request: [
            function ({ getState, dispatch }, req) {
                const state = getState();

                if (req.url === '/login') {
                    return req;
                }

                req.headers['Authorization'] = 'Bearer ' + token(state);
            }
        ]
    }
};

export const store = createStore(rootReducer, applyMiddleware(axiosMiddleware(client, axiosMiddlewareConfig)));
import { handleActions } from 'redux-actions';
import { loginInGame, updateState, hitCurrentPlayer, standCurrentPlayer, restartGame } from './actions';

const defaultState = {
    token: localStorage.getItem('token'),
    loading: false,
    deck: null,
    players: [],
    gameIsEnd: false,
    isDraw: false,
    winners: [],
    resultString: ''
};

const gameReducer = handleActions({
    [loginInGame]: state => ({ ...state, loading: true }),
    [loginInGame.success]: (state, payload) => {
        const { token, game } = payload.payload.data;
        console.log(game);
        localStorage.setItem('token', token);
        return {
            ...state,
            token: token,
            loading: false,
            ...game
        }
    },
    [updateState]: state => ({ ...state, loading: true }),
    [updateState.success]: (state, payload) => {
        const data = payload.payload.data;
        const gameData = data;
        return {
            ...state,
            loading: false,
            ...gameData
        }
    },
    [updateState.fail]: (state) => {
        localStorage.removeItem('token');
        return {
            ...state,
            loading: false,
            token: null
        }
    },
    [hitCurrentPlayer]: state => ({ ...state, loading: true }),
    [hitCurrentPlayer.success]: (state, payload) => {
        const data = payload.payload.data;
        const gameData = data;
        console.log(gameData);
        return {
            ...state,
            loading: false,
            ...gameData
        }
    },
    [standCurrentPlayer]: state => ({ ...state, loading: true }),
    [standCurrentPlayer.success]: (state, payload) => {
        const data = payload.payload.data;
        const gameData = data;
        return {
            ...state,
            loading: false,
            ...gameData
        }
    },
    [restartGame]: state => ({ ...state, loading: true }),
    [restartGame.success]: (state, payload) => {
        const data = payload.payload.data;
        console.log(data);
        const gameData = data;
        return {
            ...state,
            loading: false,
            ...gameData
        }
    },
}, defaultState);

export default gameReducer;
import { handleActions } from 'redux-actions';
import { loginInGame, updateState , hitCurrentPlayer, standCurrentPlayer, restartGame} from './actions';

const defaultState = {
    token: localStorage.getItem('token'),
    loading: false,
    deck: null,
    players: [],
    currentPlayer: null,
    gameIsEnd: false,
    isDraw: false,
    winners: [],
    result: ''
};

const gameReducer = handleActions({
    [loginInGame]: state => ({...state, loading: true}),
    [loginInGame.success]: (state, payload) => {
        const {token, game} = payload.payload.data;
        localStorage.setItem('token', token);
        return {
            ...state,
            token: token,
            loading: false,
            deck: game.deck,
            players: game.players,
            currentPlayer: game.currentPlayer,
            gameIsEnd: game.gameIsEnd,
            isDraw: game.isDraw,
            winners: game.winners,
            result: game.resultString
        }
    },
    [updateState]: state => ({...state, loading: true}),
    [updateState.success]: (state, payload) => {
        const {deck, players, currentPlayer, gameIsEnd, isDraw, winners, resultString} = payload.payload.data;
        return {
            ...state,
            loading: false,
            deck: deck,
            players: players,
            currentPlayer: currentPlayer,
            gameIsEnd: gameIsEnd,
            isDraw: isDraw,
            winners: winners,
            result: resultString
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
    [hitCurrentPlayer]: state => ({...state, loading: true}),
    [hitCurrentPlayer.success]: (state, payload) => {
        const {deck, players, currentPlayer, gameIsEnd, isDraw, winners, resultString} =  payload.payload.data;
        return {
            ...state,
            loading: false,
            deck: deck,
            players: players,
            currentPlayer: currentPlayer,
            gameIsEnd: gameIsEnd,
            isDraw: isDraw,
            winners: winners,
            result: resultString
        }
    },
    [standCurrentPlayer]: state => ({...state, loading: true}),
    [standCurrentPlayer.success]: (state, payload) => {
        const {deck, players, currentPlayer, gameIsEnd, isDraw, winners, resultString} = payload.payload.data;
        return {
            ...state,
            loading: false,
            deck: deck,
            players: players,
            currentPlayer: currentPlayer,
            gameIsEnd: gameIsEnd,
            isDraw: isDraw,
            winners: winners,
            result: resultString
        }
    },
    [restartGame]: state => ({...state, loading: true}),
    [restartGame.success]: (state, payload) => {
        const {deck, players, currentPlayer, gameIsEnd, isDraw, winners} = payload.payload.data;
        return {
            ...state,
            loading: false,
            deck: deck,
            players: players,
            currentPlayer: currentPlayer,
            gameIsEnd: gameIsEnd,
            isDraw: isDraw,
            winners: winners
        }
    },
}, defaultState);

export default gameReducer;
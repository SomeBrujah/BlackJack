import { handleActions } from 'redux-actions';
import { updateState , hitCurrentPlayer, standCurrentPlayer, restartGame} from './actions';

const defaultState = {
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
    [updateState]: state => ({...state, loading: true}),
    [updateState + '_SUCCESS']: (state, payload) => {
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
    [hitCurrentPlayer]: state => ({...state, loading: true}),
    [hitCurrentPlayer + '_SUCCESS']: (state, payload) => {
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
    [standCurrentPlayer + '_SUCCESS']: (state, payload) => {
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
    [restartGame + '_SUCCESS']: (state, payload) => {
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
import { createAction } from "redux-actions";

export const updateState = createAction('UPDATE_STATE', ()=>({
    request: {
        method: 'post',
        url: '/getGame'
    }
}));

export const hitCurrentPlayer = createAction('HIT', ()=>({
    request: {
        method: 'post',
        url: '/hit'
    }
}));

export const standCurrentPlayer = createAction('STAND', ()=>({
    request: {
        method: 'post',
        url: '/stand'
    }
}));

export const restartGame = createAction('RESTART', ()=>({
    request: {
        method: 'post',
        url: '/restart'
    }
}));
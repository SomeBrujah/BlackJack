import { createAction } from "redux-actions";

export const loginInGame = createAction('LOGIN', (data)=>({
    request: {
        method: 'post',
        url: '/login',
        data: data
    }
}));

export const updateState = createAction('UPDATE_STATE', ()=>({
    request: {
        method: 'post',
        url: '/getGame',
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }   
}));

export const hitCurrentPlayer = createAction('HIT', ()=>({
    request: {
        method: 'post',
        url: '/hit',
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }
}));

export const standCurrentPlayer = createAction('STAND', ()=>({
    request: {
        method: 'post',
        url: '/stand',
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }
}));

export const restartGame = createAction('RESTART', ()=>({
    request: {
        method: 'post',
        url: '/restart',
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }
}));
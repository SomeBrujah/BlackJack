import { createAction } from "redux-actions";

const createRequestAction = (type, payloadCreator) => {
    const action = createAction(type, (...args) => ({
        request: payloadCreator(...args)
    }));

    action.success = action + '_SUCCESS';
    action.fail = action + '_FAIL';
    return action;
};

export const loginInGame = createRequestAction('LOGIN', (data) => ({
    method: 'post',
    url: '/login',
    data: data
}));

export const updateState = createRequestAction('UPDATE_STATE', () => ({
    method: 'post',
    url: '/getGame'
}));

export const hitCurrentPlayer = createRequestAction('HIT', () => ({
    method: 'post',
    url: '/hit'
}));

export const standCurrentPlayer = createRequestAction('STAND', () => ({
    method: 'post',
    url: '/stand'
}));

export const restartGame = createRequestAction('RESTART', () => ({
    method: 'post',
    url: '/restart'
}));
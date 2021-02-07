import {UserActionTypes} from './user.types';

/* Flow: 1º
Action Creator é uma função que ao ser executada, ativa os Reducers
Ao ser disparada, comunica ao reducer o type por exemplo, SET_CURRENT_USER
e o payload que tem o valor user */ 

export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
})
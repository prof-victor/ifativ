import {ActivityActionTypes} from './activity.types';

/* Flow: 1º
Action Creator é uma função que ao ser executada, ativa os Reducers
Ao ser disparada, comunica ao reducer o type por exemplo, SET_CURRENT_USER
e o payload que tem o valor user */ 

export const setCurrentActivity = activity => ({
    type: ActivityActionTypes.SET_CURRENT_ACTIVITY,
    payload: activity
})
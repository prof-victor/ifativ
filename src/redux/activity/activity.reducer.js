import {ActivityActionTypes} from './activity.types';

const INITIAL_STATE = {
    currentActivity: null
}
/* Flow 4º
Reducer verifica se o state será ou não, atualizado
Se for atualizado, envia à Store o novo dado, caso contrário mantém o valor do dado
Lembre-se o state é somente leitura e a action é a única maneira de modificá-lo */
const activityReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActivityActionTypes.SET_CURRENT_ACTIVITY:
            return {
                ...state,
                currentActivity: action.payload
            };
            default:
                return state;
    }
};

export default activityReducer;
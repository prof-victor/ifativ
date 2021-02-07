import {UserActionTypes} from './user.types';

const INITIAL_STATE = {
    currentUser: null
}
/* Flow 4º
Reducer verifica se o state será ou não, atualizado
Se for atualizado, envia à Store o novo dado, caso contrário mantém o valor do dado
Lembre-se o state é somente leitura e a action é a única maneira de modificá-lo */
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            };
            default:
                return state;
    }
};

export default userReducer;
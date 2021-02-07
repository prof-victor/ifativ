import { combineReducers } from "redux";
import userReducer from './user/user.reducer';

/* Flow 3º
Combinação de todos os reducers do app, utlizado para selecionar os reducers */
export default combineReducers({
    user: userReducer
});
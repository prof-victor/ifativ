import { combineReducers } from "redux";
import userReducer from './user/user.reducer';
import activityReducer from './activity/activity.reducer';

/* Flow 3º
Combinação de todos os reducers do app, utlizado para selecionar os reducers */
export default combineReducers({
    user: userReducer,
    activity: activityReducer
});
import {createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';

/***************************************************************************
 * Flow 2º
 * Store é o container que que armazena e centraliza o estado geral do app
 * Store é aciona pelas actions para consultar os states
*/
const middlewares = [logger];
const store = createStore(rootReducer, applyMiddleware(...middlewares));
//ou
//const store = createStore(rootReducer, applyMidleware(...middlewares(logger)));
//****************************************************************************/

export default store;
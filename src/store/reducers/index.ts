import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import loginReducer from './loginReducer';
import alertReducer from './alertReducer';

const rootReducer = combineReducers({
    cart: cartReducer,
    login: loginReducer,
    alert: alertReducer,
});

export default rootReducer;

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Importa redux-thunk
import weatherReducer from './weatherReducer';

const rootReducer = combineReducers({
  weather: weatherReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk)); // Aplica redux-thunk como middleware

export default store;


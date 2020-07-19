import {createStore, applyMiddleware} from 'redux'
import {Reducer, initialState} from './reducer'
import thunk from 'redux-thunk';

export const ConfigureStore = () => {
    const store = createStore(Reducer,initialState,applyMiddleware(thunk));
    return store;
};
import { createStore } from 'redux';
import { reducer, initialState } from './reducer';

export const configureStore = () => {
    const store = createStore(
        reducer,
        initialState
    );
    return store;
}
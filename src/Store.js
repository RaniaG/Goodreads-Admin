import { createStore } from 'redux';
import { Reducer } from './reducers/user';
import React from 'react';

export const Store = createStore(Reducer, {
    user: {
        username: 'rania'
    }
})

export const myContext = React.createContext();
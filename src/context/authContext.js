import {createContext} from 'react';

function  noop() {}

export const AuthContext = createContext({
    token: null,
    login: noop,
    logout: noop,
    isAuthenticated: false,
    language: null, 
    newLanguage: noop,
    translations: null,
});
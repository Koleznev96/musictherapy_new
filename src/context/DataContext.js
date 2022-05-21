import {createContext} from "react";

function noop(){}

export const DataContext = createContext({
    data: null,
    loader: null,
    updateHandler: noop,
    getData: noop,
});
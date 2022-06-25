import {createContext} from "react";

function noop(){}

export const DataContext = createContext({
    data: null,
    loader: null,
    updateHandler: noop,
    getData: noop,
    classic_menu: null,
    upload_classic_menu: noop,
    dostup: null,
    getDostup: noop,
});
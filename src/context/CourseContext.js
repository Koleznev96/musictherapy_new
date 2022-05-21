import {createContext} from "react";

function noop(){}

export const CourseContext = createContext({
    data: null,
    loader: null,
    updateHandler: noop,
    getData: noop,
});
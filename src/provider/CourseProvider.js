import React, {useState, useEffect, useContext} from "react";
import { AuthContext } from "../context/authContext";
import { CourseContext } from '../context/CourseContext';
import { useHttp } from "../hooks/http.hook";


export const CourseProvider = ({children, ...props}) => {
    const auth = useContext(AuthContext);
    const [data, setData] = useState(null);
    const [update, setUpdate] = useState(false);
    const [loader, setLoader] = useState(false);
    const {loading, request, error, clearError} = useHttp();

    const updateHandler = () => {
        setUpdate(!update);
    };

    const getData = async () => {
        setLoader(true);
        try {
            const data = await request(`/api/data/get_list_course/`, 'GET', null, {
                Authorization: `${auth.token}`
            });
            setData(data.data);
        } catch (e) {}
        setLoader(false);
    };

    useEffect(() => {
        getData();
    }, [update, auth.token]);


    return <CourseContext.Provider
        value={{
            data,
            loader,
            updateHandler,
            getData,
        }}
        {...props}
    >
        {children}
    </CourseContext.Provider>
}
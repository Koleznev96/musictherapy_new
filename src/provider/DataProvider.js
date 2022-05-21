import React, {useState, useEffect, useContext} from "react";
import { AuthContext } from "../context/authContext";
import { DataContext } from '../context/DataContext';
import { useHttp } from "../hooks/http.hook";


export const DataProvider = ({children, ...props}) => {
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
            const data = await request(`/api/data/get_list_test/`, 'GET', null, {
                Authorization: `${auth.token}`
            });
            setData(data.data);
        } catch (e) {
            console.log('err-', e)
        }
        setLoader(false);
    };

    useEffect(() => {
        getData();
    }, [update, auth.token]);


    return <DataContext.Provider
        value={{
            data,
            loader,
            updateHandler,
            getData,
        }}
        {...props}
    >
        {children}
    </DataContext.Provider>
}
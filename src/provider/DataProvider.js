import React, {useState, useEffect, useContext} from "react";
import { AuthContext } from "../context/authContext";
import { DataContext } from '../context/DataContext';
import { useHttp } from "../hooks/http.hook";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const DataProvider = ({children, ...props}) => {
    const auth = useContext(AuthContext);
    const [data, setData] = useState(null);
    const [update, setUpdate] = useState(false);
    const [loader, setLoader] = useState(false);
    const {loading, request, error, clearError} = useHttp();
    const [classic_menu, set_classic_menu] = useState("0");
    const [dostup, set_dostup] = useState("Гость");

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
        } catch (e) {}
        setLoader(false);
    };

    const upload_classic_menu = (value) => {
        AsyncStorage.setItem("classic_menu", value);
        set_classic_menu(value);
    }

    const classic_menu_start = async () => {
        const classic_menu_new = await AsyncStorage.getItem("classic_menu");
        upload_classic_menu(classic_menu_new ? classic_menu_new : "0");
    }

    useEffect(() => {
        classic_menu_start();
    }, []);

    const getDostup = async () => {
        try {
            const data = await request(`/api/data/access`, 'GET', null, {
                Authorization: `${auth.token}`
            });
            set_dostup(data);
        } catch (e) {}
    }

    useEffect(() => {
        if (auth.token) {
            getDostup();
        }
    }, [auth.token])

    useEffect(() => {
        getData();
    }, [update, auth.token]);


    return <DataContext.Provider
        value={{
            data,
            loader,
            updateHandler,
            getData,
            classic_menu,
            upload_classic_menu,
            dostup,
            getDostup
        }}
        {...props}
    >
        {children}
    </DataContext.Provider>
}
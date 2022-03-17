import React, {useState, useCallback, useEffect, useContext} from 'react';
import {
    AsyncStorage, 
    Platform, 
    View,
    Text,
    TouchableOpacity,
    Linking
} from 'react-native';
import { appVersion } from '../../const';
import { PopapContext } from '../context/PopapContext';
import {useHttp} from "./http.hook";
import {styles} from "./useStyles";
import GlobalStyle from "../components/GlobalStyle";

const storageName = 'JWT';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [ready, setReady] = useState(false);
    const [language, setLanguage] = useState(null);
    const [translations, setTranslations] = useState(null);
    const [version, setVersion] = useState(null);
    const [labelUpdate, setLabelUpdate] = useState(null);
    const {loading, request, error, clearError} = useHttp();

    const login = useCallback((jwtToken, email, password) => {
        setToken(jwtToken);
        AsyncStorage.setItem("JWT", jwtToken);
        AsyncStorage.setItem("email", email);
        AsyncStorage.setItem("password", password);
    }, []);

    const logout = useCallback(async()=> {
        setToken(null);

        await AsyncStorage.removeItem("JWT");
        await AsyncStorage.removeItem("email");
        await AsyncStorage.removeItem("password");
    }, []);

    const getTranslations = async (language_) => {
        try {
            const data = await request(`/api/profile/translation/${language_}`, 'GET', null, {
                Authorization: `${token}`
            });
            setTranslations(data);
        } catch (e) {}
    }

    const newLanguage = async (language_) => {
        setLanguage(language_);
        await AsyncStorage.setItem("language", language_);
        getTranslations(language_);
    }

    const getVersion = async () => {
        try {
            const data = await request(`/api/data/version`, 'GET', null, {});
            if (data && data.version && data.version.version !== appVersion) {
                setVersion(data.version.version);
                setLabelUpdate(data.version.label);
            }
        } catch (e) {
        }
        
    }

    const startFunc = async () => {
        const jwt = await AsyncStorage.getItem("JWT");
        const email = await AsyncStorage.getItem("email");
        const password = await AsyncStorage.getItem("password");
        const language_ = await AsyncStorage.getItem("language");
        newLanguage(language_ ? language_ : 'ru');
        getVersion();

        if (jwt && email && password) {
            login(jwt, email, password);
        }

        setTimeout(() => setReady(true), 2000);
    }

    useEffect(() => {
        startFunc();
    }, []);


    return { login, logout, token, ready, language, newLanguage, translations, version, labelUpdate };
}
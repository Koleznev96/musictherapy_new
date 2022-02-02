import {useState, useCallback, useEffect} from 'react';
import {AsyncStorage} from 'react-native';
import {useHttp} from "./http.hook";

const storageName = 'JWT';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [ready, setReady] = useState(false);
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

    const startFunc = async () => {
        const jwt = await AsyncStorage.getItem("JWT");
        const email = await AsyncStorage.getItem("email");
        const password = await AsyncStorage.getItem("password");

        if (jwt && email && password) {
            login(jwt, email, password);
        }

        setTimeout(() => setReady(true), 2000);
    }

    useEffect(() => {
        startFunc();
    }, [startFunc]);


    return { login, logout, token, ready };
}
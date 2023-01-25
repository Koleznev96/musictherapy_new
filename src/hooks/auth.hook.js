import React, {useState, useCallback, useEffect} from 'react';
import {appVersion} from '../../const';
import {useHttp} from './http.hook';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storageName = 'JWT';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [language, setLanguage] = useState(null);
  const [translations, setTranslations] = useState(null);
  const [version, setVersion] = useState(null);
  const [labelUpdate, setLabelUpdate] = useState(null);
  const {loading, request, error, clearError} = useHttp();
  const [languages_list, setLanguages_list] = useState([]);
  const [theme, setTheme] = useState(0);

  const updateTheme = useCallback(
    async newTheme => {
      setTheme(newTheme);
      const newTheme_ = JSON.stringify(newTheme);
      // await AsyncStorage.removeItem('theme');
      await AsyncStorage.setItem('theme', newTheme_);
    },
    [setTheme],
  );

  const login = useCallback(async (jwtToken, email, password) => {
    setToken(jwtToken);
    AsyncStorage.setItem('JWT', jwtToken);
    AsyncStorage.setItem('email', email);
    AsyncStorage.setItem('password', password);

    try {
      await request(`/api/log/auth`, 'POST', null, {
        Authorization: jwtToken,
      });
    } catch (e) {}
  }, []);

  const logout = useCallback(async () => {
    setToken(null);

    await AsyncStorage.removeItem('JWT');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('password');
  }, []);

  const getTranslations = async language_ => {
    try {
      const data = await request(
        `/api/data/translations/app/${language_}`,
        'GET',
        null,
        {
          Authorization: `${token}`,
        },
      );
      setTranslations(data);
    } catch (e) {}
  };

  const newLanguage = async language_ => {
    setLanguage(language_);
    await AsyncStorage.setItem('language', language_);
    getTranslations(language_);
  };

  const get_list_lengs = async () => {
    try {
      const data = await request(`/api/data/lengs`, 'GET', null, {
        Authorization: `${token}`,
      });
      setLanguages_list(data);
    } catch (e) {}
  };

  const getVersion = async () => {
    try {
      const data = await request(`/api/data/version`, 'GET', null, {});
      if (data && data.version && data.version.version !== appVersion) {
        setVersion(data.version.version);
        setLabelUpdate(data.version.label);
      }
    } catch (e) {}
  };

  const startFunc = async () => {
    get_list_lengs();
    const jwt = await AsyncStorage.getItem('JWT');
    const email = await AsyncStorage.getItem('email');
    const password = await AsyncStorage.getItem('password');
    const language_ = await AsyncStorage.getItem('language');
    const theme = await AsyncStorage.getItem('theme');
    newLanguage(language_ ? language_ : 'ru');
    getVersion();
    updateTheme(theme ? parseInt(theme) : 0);

    if (jwt && email && password) {
      login(jwt, email, password);
    }

    setTimeout(() => setReady(true), 2000);
  };

  useEffect(() => {
    startFunc();
  }, []);

  return {
    login,
    logout,
    token,
    ready,
    language,
    newLanguage,
    translations,
    version,
    labelUpdate,
    languages_list,
    get_list_lengs,
    theme,
    updateTheme,
  };
};

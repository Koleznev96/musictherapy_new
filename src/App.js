/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Routes } from  "./Routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/authContext";
import { Loader } from "./components/loader/Loader";
import { ColorsStyles } from "./constants/ColorsStyles";
import { Popap } from "./components/popap/Popap";
import {PopapProvider} from "./provider/PopapProvider";


const App = () => {
  const {token, login, logout, ready, language, newLanguage, translations, version, labelUpdate} = useAuth();

  if (!ready) {
    return <Loader />
  }

  const isAuth = !!token;
  const routes = Routes(isAuth, translations);

  // return <Loader />

  return (
    <SafeAreaProvider style={{backgroundColor: ColorsStyles.backgroundFooter,}}>
    <AuthContext.Provider value={{
      token, login, logout, ready, language, newLanguage, translations, version, labelUpdate
    }}>
      <PopapProvider>
          <Popap />
          {routes}
      </PopapProvider>
    </AuthContext.Provider>
    </SafeAreaProvider>
  );
};

export default App;

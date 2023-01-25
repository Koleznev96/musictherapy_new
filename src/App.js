/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Routes} from './Routes';
import {useAuth} from './hooks/auth.hook';
import {AuthContext} from './context/authContext';
import {Loader} from './components/loader/Loader';
import {Popap} from './components/popap/Popap';
import {PopapProvider} from './provider/PopapProvider';
import {DataProvider} from './provider/DataProvider';
import {CourseProvider} from './provider/CourseProvider';
import {settingsRoutes} from '../Settings/routes/settingsRoutes';

const App = () => {
  const {
    token,
    login,
    logout,
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
  } = useAuth();

  // return <Loader />;
  if (!ready) {
    return <Loader theme={theme} />;
  }

  const isAuth = !!token;
  const routes = Routes(isAuth, translations);

  // return <Loader />

  return (
    <SafeAreaProvider
      style={{
        backgroundColor: settingsRoutes[theme].ColorsStyles.backgroundFooter,
      }}>
      <AuthContext.Provider
        value={{
          token,
          login,
          logout,
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
        }}>
        <PopapProvider>
          <DataProvider>
            <CourseProvider>
              <Popap />
              {routes}
            </CourseProvider>
          </DataProvider>
        </PopapProvider>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
};

export default App;

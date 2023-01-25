import React, {useContext} from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import {styles} from './useStyles';
import GlobalStyle from '../GlobalStyle';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from '../../context/authContext';
import {checkLanguageConst} from '../../hooks/useLanguage';
import {settingsRoutes} from '../../../Settings/routes/settingsRoutes';

export const Loader = ({theme}) => {
  const auth = useContext(AuthContext);
  return (
    <ImageBackground
      source={settingsRoutes[auth.theme].backgroundSettings.img_splash}
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <ImageBackground
        source={settingsRoutes[auth.theme].backgroundSettings.img_logo}
        style={{
          width: '100%',
          height: '90%',
          marginTop: '15%',
          alignItems: 'center',
        }}>
        <SafeAreaView
          style={{width: '100%', height: '100%', alignItems: 'center'}}>
          {settingsRoutes[auth.theme].Splash({translations: auth.translations})}
        </SafeAreaView>
      </ImageBackground>
    </ImageBackground>
  );
};

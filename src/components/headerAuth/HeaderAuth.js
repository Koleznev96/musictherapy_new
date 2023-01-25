import React, {useContext} from 'react';
import {Text, View, Image} from 'react-native';
import {styles} from './useStyles';
import {AuthContext} from '../../context/authContext';
import {checkLanguageConst} from '../../hooks/useLanguage';
import {settingsRoutes} from '../../../Settings/routes/settingsRoutes';

export const HeaderAuth = () => {
  const auth = useContext(AuthContext);
  return (
    <View style={styles.body}>
      <View style={styles.block}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />

        <Text
          style={[
            settingsRoutes[auth.theme].GlobalStyle.BellotaFontBold,
            styles.text_glav,
          ]}>
          {checkLanguageConst('ApplicationName', auth.translations)}
        </Text>
      </View>
    </View>
  );
};

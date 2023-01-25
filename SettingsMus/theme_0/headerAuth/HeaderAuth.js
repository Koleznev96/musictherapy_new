import React from 'react';
import {Text, View, Image} from 'react-native';
import {styles} from './useStyles';
import {checkLanguageConst} from '../../../src/hooks/useLanguage';
import GlobalStyle from '../GlobalStyle';

export const HeaderAuth = ({translations, label}) => {
  return (
    <View style={styles.body}>
      <View style={styles.block}>
        <Image source={require('../images/logo.png')} style={styles.logo} />
        <Text style={[GlobalStyle.BellotaFontBold, styles.text_glav]}>
          {checkLanguageConst('ApplicationName', translations)}
        </Text>
      </View>
    </View>
  );
};

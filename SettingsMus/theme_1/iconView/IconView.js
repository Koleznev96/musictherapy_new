import React from 'react';
import {Text, Image} from 'react-native';
import {styles} from './useStyles';
import {checkLanguageConst} from '../../../src/hooks/useLanguage';
import GlobalStyle from '../GlobalStyle';

export const IconView = ({translations}) => {
  return (
    <>
      <Image source={require('../images/logo.png')} style={styles.logo} />

      <Text style={[GlobalStyle.BellotaFontRegular, styles.text_glav]}>
        {checkLanguageConst('ApplicationName', translations)}
      </Text>
    </>
  );
};

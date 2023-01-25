import React from 'react';
import {Text, View, Image} from 'react-native';
import {styles} from './useStyles';
import {checkLanguageConst} from '../../../src/hooks/useLanguage';
import GlobalStyle from '../GlobalStyle';
import {GlobalSvgSelector} from '../GlobalSvgSelector';

export const HeaderAuth = ({translations, label}) => {
  return (
    <View style={styles.body}>
      <View style={styles.block}>
        <GlobalSvgSelector id="logo_header_auth" />
      </View>
    </View>
  );
};

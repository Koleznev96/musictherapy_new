import React from 'react';
import {Text, Image, View} from 'react-native';
import {styles} from './useStyles';
import {checkLanguageConst} from '../../../src/hooks/useLanguage';
import GlobalStyle from '../GlobalStyle';
import {GlobalSvgSelector} from '../GlobalSvgSelector';

export const IconView = ({translations}) => {
  return (
    <>
      <View style={styles.logo}>
        <GlobalSvgSelector id="logo_root" />
      </View>

      {/* <Text style={[GlobalStyle.BellotaFontRegular, styles.text_glav]}>
        {checkLanguageConst('ApplicationName', translations)}
      </Text> */}
      <View style={styles.text_glav}>
        <GlobalSvgSelector id="logo_root_text" />
      </View>
    </>
  );
};

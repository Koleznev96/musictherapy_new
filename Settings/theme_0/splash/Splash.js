import React from 'react';
import {Text, View, Image} from 'react-native';
import {styles} from './useStyles';
import GlobalStyle from '../GlobalStyle';
import {checkLanguageConst} from '../../../src/hooks/useLanguage';
import {GlobalSvgSelector} from '../GlobalSvgSelector';

export const Splash = ({translations}) => {
  return (
    <>
      <View style={styles.block}>
        <GlobalSvgSelector id="splash_icon" />
      </View>
      {/* <Text
        // numberOfLines={1}
        // abjustsFontSizeToFit={true} // подбирает размер текста до того, как все содержимое будет влезать в область
        style={[GlobalStyle.BellotaFontRegular, styles.text_glav]}>
        {checkLanguageConst('ApplicationName', translations)}
      </Text>
      <Text style={[GlobalStyle.BellotaFontRegular, styles.text_foot]}>
        {checkLanguageConst('ApplicationDescriptionLoading', translations)}
      </Text> */}
    </>
  );
};

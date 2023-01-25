import React from 'react';
import {Text, View, Image} from 'react-native';
import {styles} from './useStyles';
import GlobalStyle from '../GlobalStyle';
import {checkLanguageConst} from '../../../src/hooks/useLanguage';

export const HeaderAuth = ({label, translations}) => {
  return (
    <View style={styles.body}>
      <View style={styles.grov} />
      <View style={styles.block}>
        {/* <Image source={require('../images/logo-min.png')} style={styles.logo} /> */}
        <Text style={[GlobalStyle.CustomFontExtraBold, styles.text_glav]}>
          {checkLanguageConst(label, translations).toUpperCase()}
        </Text>
      </View>
      {/* {data?.backHandler && (
        <TouchableOpacity
          style={styles.back_button}
          onPress={() => data?.backHandler()}>
          <GlobalSvgSelector id="back" />
        </TouchableOpacity>
      )} */}
    </View>
  );
};

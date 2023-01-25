import React from 'react';
import {Text, View, Image} from 'react-native';
import {styles} from './useStyles';
import GlobalStyle from '../GlobalStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {checkLanguageConst} from '../../../src/hooks/useLanguage';

export const HeaderRoot = ({data, translations}) => {
  return (
    <View style={styles.body}>
      <View style={styles.block}>
        <Image source={require('../images/logo-min.png')} style={styles.logo} />
        <Text style={[GlobalStyle.CustomFontBold, styles.text_glav]}>
          {data?.label?.toUpperCase()}
        </Text>
      </View>
      {data?.backHandler && (
        <TouchableOpacity
          style={styles.back_button}
          onPress={() => data?.backHandler()}>
          <Text
            style={[GlobalStyle.CustomFontRegular, styles.back_button_text]}>
            {checkLanguageConst('Back', translations)}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

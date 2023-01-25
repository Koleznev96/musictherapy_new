import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './useStyles';
import GlobalStyle from '../GlobalStyle';
import {checkLanguageConst} from '../../../src/hooks/useLanguage';

export const PlayListMenu = ({
  activeMenuHandler,
  menu_status,
  translations,
  label,
}) => {
  return (
    <View
      style={{width: '100%', flexDirection: 'column', alignItems: 'center'}}>
      <Text
        style={[
          GlobalStyle.CustomFontBold,
          {
            fontSize: 20,
            color: '#212224',
            marginTop: 14,
          },
        ]}>
        {label}
      </Text>
      <View style={styles.menu}>
        <TouchableOpacity
          style={menu_status ? styles.menu_el_active : styles.menu_el}
          onPress={() => activeMenuHandler(true)}>
          <Text
            style={[
              GlobalStyle.CustomFontMedium,
              menu_status ? styles.menu_el_text_active : styles.menu_el_text,
            ]}>
            {checkLanguageConst('Video', translations)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={!menu_status ? styles.menu_el_active : styles.menu_el}
          onPress={() => activeMenuHandler(false)}>
          <Text
            style={[
              GlobalStyle.CustomFontMedium,
              !menu_status ? styles.menu_el_text_active : styles.menu_el_text,
            ]}>
            {checkLanguageConst('Audio', translations)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './useStyles';
import GlobalStyle from '../GlobalStyle';
import {checkLanguageConst} from '../../../src/hooks/useLanguage';

export const PlayListMenu = ({
  activeMenuHandler,
  menu_status,
  translations,
}) => {
  return (
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
  );
};

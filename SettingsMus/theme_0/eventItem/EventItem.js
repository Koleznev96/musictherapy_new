import React from 'react';
import {Text, View, Image} from 'react-native';
import {styles} from './useStyles';
import GlobalStyle from '../GlobalStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {checkLanguageConst} from '../../../src/hooks/useLanguage';

export const EventItem = ({httpServer, item, translations, nextHandler}) => {
  return (
    <View style={styles.item_block}>
      <Image
        source={{uri: httpServer + '/' + item.img}}
        style={styles.item_img}
      />
      <TouchableOpacity
        style={[styles.item_button]}
        onPress={() => nextHandler(item.url)}>
        <Text style={[GlobalStyle.CustomFontRegular, styles.item_button_text]}>
          {checkLanguageConst('Купить билеты', translations)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

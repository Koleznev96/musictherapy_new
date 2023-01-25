import React from 'react';
import {Text, TouchableOpacity, ImageBackground} from 'react-native';
import {checkLanguageConst} from '../../../src/hooks/useLanguage';
import GlobalStyle from '../GlobalStyle';
import {styles} from './useStyles';

export const Card = ({item, onPress, translations, key}) => {
  return (
    <TouchableOpacity
      key={key}
      style={[styles.item_button]}
      onPress={() => onPress(item)}>
      <ImageBackground
        source={item.img}
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        imageStyle={{borderRadius: 16, backgroundColor: '#000'}}>
        <ImageBackground
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          imageStyle={{
            borderRadius: 16,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}>
          <Text style={[GlobalStyle.CustomFontMedium, styles.item_name]}>
            {checkLanguageConst(item.name, translations)?.toUpperCase()}
          </Text>
        </ImageBackground>
      </ImageBackground>
    </TouchableOpacity>
  );
};

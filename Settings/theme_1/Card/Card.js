import React from 'react';
import {Text, TouchableOpacity, ImageBackground, View} from 'react-native';
import {checkLanguageConst} from '../../../src/hooks/useLanguage';
import GlobalStyle from '../GlobalStyle';
import {GlobalSvgSelector} from '../GlobalSvgSelector';
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
          <View style={{position: 'absolute', top: 50, right: 18}}>
            <GlobalSvgSelector id="card_next" />
          </View>
          <View style={{position: 'absolute', bottom: 16, left: 16}}>
            <Text style={[GlobalStyle.CustomFontExtraBold, styles.item_name]}>
              {checkLanguageConst(item.name, translations)?.toUpperCase()}
            </Text>
            {/* <Text style={[GlobalStyle.CustomFontMedium, styles.item_des]}>
              {checkLanguageConst(item.name, translations)?.toUpperCase()}
            </Text> */}
          </View>
        </ImageBackground>
      </ImageBackground>
    </TouchableOpacity>
  );
};

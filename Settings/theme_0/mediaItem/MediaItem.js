import React from 'react';
import {Text, View, ImageBackground} from 'react-native';
import {styles} from './useStyles';
import GlobalStyle from '../GlobalStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {checkLanguage} from '../../../src/hooks/useLanguage';
import {GlobalSvgSelector} from '../GlobalSvgSelector';

export const MediaItem = ({
  language,
  itemHandler,
  activeIndex,
  index,
  httpServer,
  itemPlaylistHandler,
  item,
}) => {
  return (
    <View style={styles.item_block}>
      <TouchableOpacity
        style={[styles.item_button]}
        onPress={() => itemHandler(index)}>
        <Text
          style={[
            activeIndex === index
              ? GlobalStyle.CustomFontBold
              : GlobalStyle.CustomFontMedium,
            styles.item_name,
          ]}>
          {checkLanguage(item.label, language)}
        </Text>
        <GlobalSvgSelector
          id={activeIndex === index ? 'arrow_bottom' : 'arrow_top'}
        />
      </TouchableOpacity>
      {activeIndex === index ? (
        <Text style={[GlobalStyle.CustomFontRegular, styles.item_text]}>
          {checkLanguage(item.text, language)}
        </Text>
      ) : null}

      <TouchableOpacity
        onPress={() => {
          item.settings?.access ? itemPlaylistHandler(item) : null;
        }}
        style={{
          width: '100%',
          height: 200,
          borderRadiusBottomLeft: 6,
          borderRadiusBottomRight: 6,
          // marginTop: 10,
          backgroundColor: 'rgba(198, 198, 198, 0.54)',
        }}>
        <ImageBackground
          source={{
            uri: httpServer + '/' + item.poster,
          }}
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            borderRadiusBottomLeft: 6,
            borderRadiusBottomRight: 6,
          }}
          imageStyle={{borderRadiusBottomLeft: 6, borderRadiusBottomRight: 6}}>
          <ImageBackground
            style={{
              width: '100%',
              height: '100%',
              flexDirection: 'row',
              // alignItems: 'center',
              justifyContent: 'flex-end',
            }}
            imageStyle={{
              backgroundColor: item.settings?.access
                ? 'rgba(0, 0, 0, 0)'
                : 'rgba(0, 0, 0, 0.2)',
              borderRadiusBottomLeft: 6,
              borderRadiusBottomRight: 6,
            }}>
            {item.settings?.access ? null : (
              <TouchableOpacity
                onPress={() => itemPlaylistHandler(item)}
                style={styles.button_like}>
                <GlobalSvgSelector id="access" />
              </TouchableOpacity>
            )}
          </ImageBackground>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
  Image,
} from 'react-native';
import {GlobalSvgSelector} from '..//GlobalSvgSelector';
import {styles} from './useStyles';
import GlobalStyle from '../GlobalStyle';
import {httpServer} from '../../const';
import {
  checkLanguage,
  checkLanguageConst,
} from '../../../src/hooks/useLanguage';

export const VideoItem = ({
  item,
  translations,
  activeIndex,
  index,
  itemHandler,
  language,
  accessHandler,
  likeHandler,
  token,
  fullScreenHandler,
  dostup,
}) => {
  const arrayToString = array => {
    let new_array = array?.map(item =>
      checkLanguageConst(item, translations).toLowerCase(),
    );
    return new_array.join(', ');
  };

  return (
    <View style={styles.item_block_root}>
      <View
        style={
          activeIndex === index ? styles.item_block_active : styles.item_block
        }>
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
            {checkLanguage(item.label_, language)}
          </Text>
          <GlobalSvgSelector
            id={activeIndex === index ? 'arrow_bottom' : 'arrow_top'}
          />
        </TouchableOpacity>
        {activeIndex === index ? (
          <Text style={[GlobalStyle.CustomFontRegular, styles.item_text]}>
            {checkLanguage(item.text_, language)}
          </Text>
        ) : null}
        {item.instruments?.length ? (
          <Text style={[GlobalStyle.CustomFontMedium, styles.instruments]}>
            {arrayToString(item.instruments)}
          </Text>
        ) : null}
      </View>
      <View
        style={{
          width: '100%',
          height: 200,
          borderRadius: 16,
          marginTop: 10,
          backgroundColor: 'rgba(198, 198, 198, 0.54)',
        }}>
        <ImageBackground
          source={{
            uri: httpServer + '/' + checkLanguage(item.poster_, language),
          }}
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            borderRadius: 16,
          }}
          imageStyle={{borderRadius: 16}}>
          <ImageBackground
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            imageStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.38)',
              borderRadius: 16,
            }}>
            {dostup === 'view' ? null : (
              <TouchableOpacity
                onPress={() => accessHandler(dostup)}
                style={{
                  position: 'absolute',
                  left: 10,
                  top: 10,
                  opacity: 0.4,
                }}>
                <GlobalSvgSelector id="access" />
              </TouchableOpacity>
            )}

            {token ? (
              <TouchableOpacity
                style={styles.button_like}
                onPress={() => likeHandler(item, index)}>
                <GlobalSvgSelector
                  id={item.like === 1 ? 'like_active' : 'like'}
                />
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              onPress={() =>
                dostup === 'view' ? fullScreenHandler(item) : false
              }>
              <Image
                style={{width: 52, height: 52}}
                source={require('../AudioPlayerSlider/resources/ui_play.png')}
              />
            </TouchableOpacity>
          </ImageBackground>
        </ImageBackground>
      </View>
    </View>
  );
};

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
import {httpServer} from '../../../const';
import {GlobalSvgSelector} from '../../assets/GlobalSvgSelector';
import {checkLanguage, checkLanguageConst} from '../../hooks/useLanguage';
import {styles} from './useStyles';
import GlobalStyle from '../GlobalStyle';
import {settingsRoutes} from '../../../Settings/routes/settingsRoutes';

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
  theme,
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
                ? settingsRoutes[theme].GlobalStyle.CustomFontBold
                : settingsRoutes[theme].GlobalStyle.CustomFontMedium,
              styles.item_name,
            ]}>
            {checkLanguage(item.label_, language)}
          </Text>

          {settingsRoutes[theme].icons({
            id: activeIndex === index ? 'arrow_bottom' : 'arrow_top',
          })}
        </TouchableOpacity>
        {activeIndex === index ? (
          <Text
            style={[
              settingsRoutes[theme].GlobalStyle.CustomFontRegular,
              styles.item_text,
            ]}>
            {checkLanguage(item.text_, language)}
          </Text>
        ) : null}
        {item.instruments?.length ? (
          <Text
            style={[
              settingsRoutes[theme].GlobalStyle.CustomFontMedium,
              styles.instruments,
            ]}>
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
                {settingsRoutes[theme].icons({id: 'access'})}
              </TouchableOpacity>
            )}

            {token ? (
              <TouchableOpacity
                style={styles.button_like}
                onPress={() => likeHandler(item, index)}>
                {settingsRoutes[theme].icons({
                  id: item.like === 1 ? 'like_active' : 'like',
                })}
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              onPress={() =>
                dostup === 'view' ? fullScreenHandler(item) : false
              }>
              <Image
                style={{width: 52, height: 52}}
                source={require('../audioPlayer/resources/ui_play.png')}
              />
            </TouchableOpacity>
          </ImageBackground>
        </ImageBackground>
      </View>
    </View>
  );
};

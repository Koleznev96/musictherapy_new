import React from 'react';
import {Text, TouchableOpacity, View, Dimensions, Image} from 'react-native';
import {styles} from './useStyles';
import GlobalStyle from '../GlobalStyle';
import {checkLanguage, checkLanguageConst} from '../../hooks/useLanguage';
import {settingsRoutes} from '../../../Settings/routes/settingsRoutes';
const {width, height} = Dimensions.get('screen');

const img_pause = require('./resources/ui_pause.png');
const img_play = require('./resources/ui_play.png');

export const AudioItem = ({
  itemHandler,
  index,
  item,
  likeHandler,
  translations,
  activeIndex,
  token,
  language,
  theme,
}) => {
  const arrayToString = array => {
    let new_array = array?.map(item =>
      checkLanguageConst(item, translations).toLowerCase(),
    );
    return new_array.join(', ');
  };

  return (
    <View
      style={[
        {
          paddingLeft: 10,
          paddingRight: 10,
          justifyContent: 'center',
          backgroundColor: '#154073',
          width: '100%',
          minHeight: 80,
          paddingVertical: 8,
          borderBottomWidth: 1,
          borderBottomColor: '#969696',
          ...settingsRoutes[theme].audioItem.default,
        },
        activeIndex === index && settingsRoutes[theme].audioItem.active,
        index % 2 === 0 && settingsRoutes[theme].audioItem.honest,
      ]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => itemHandler(index, item)}
            style={{marginRight: 15}}>
            <Image
              source={activeIndex === index ? img_pause : img_play}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
          <View style={{width: width - 105}}>
            <Text
              style={[
                settingsRoutes[theme].GlobalStyle.CustomFontRegular,
                {color: 'white', fontSize: 14, width: width - 105},
              ]}>
              {checkLanguage(item.label, language)}
            </Text>
            {item.instruments?.length ? (
              <Text
                style={[
                  settingsRoutes[theme].GlobalStyle.CustomFontLite,
                  {
                    fontSize: 10,
                    color:
                      settingsRoutes[theme].ColorsStyles.textTwo || '#B9B9B9',
                  },
                ]}>
                {arrayToString(item.instruments)}
              </Text>
            ) : null}
          </View>
        </View>
        {token ? (
          <TouchableOpacity
            style={styles.button_like}
            onPress={() => likeHandler(item, index)}>
            {settingsRoutes[theme].icons({
              id: item.like === 1 ? 'like_active' : 'like',
            })}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

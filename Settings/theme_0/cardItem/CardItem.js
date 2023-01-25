import React from 'react';
import {Text, View, ImageBackground} from 'react-native';
import {styles} from './useStyles';
import GlobalStyle from '../GlobalStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {checkLanguage} from '../../../src/hooks/useLanguage';
import {GlobalSvgSelector} from '../GlobalSvgSelector';

export const CardItem = ({
  language,
  label,
  description,
  itemHandler,
  activeIndex,
  index,
  dostup = 'view',
  accessHandler = () => null,
  httpServer,
  poster,
  handler = undefined,
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
          {checkLanguage(label, language)}
        </Text>
        <GlobalSvgSelector
          id={activeIndex === index ? 'arrow_bottom' : 'arrow_top'}
        />
      </TouchableOpacity>
      {activeIndex === index ? (
        <Text style={[GlobalStyle.CustomFontRegular, styles.item_text]}>
          {checkLanguage(description, language)}
        </Text>
      ) : null}

      {handler ? (
        <TouchableOpacity
          onPress={() => handler(item)}
          style={{
            width: '100%',
            height: 200,
            borderRadiusBottomLeft: 6,
            borderRadiusBottomRight: 6,
            // marginTop: 10,
            backgroundColor: 'rgba(198, 198, 198, 0.54)',
          }}>
          <ImageBackground
            source={{uri: httpServer + '/' + poster}}
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              borderRadiusBottomLeft: 6,
              borderRadiusBottomRight: 6,
            }}
            imageStyle={{
              borderRadiusBottomLeft: 6,
              borderRadiusBottomRight: 6,
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
          </ImageBackground>
        </TouchableOpacity>
      ) : (
        <View
          style={{
            width: '100%',
            height: 200,
            borderRadiusBottomLeft: 6,
            borderRadiusBottomRight: 6,
            // marginTop: 10,
            backgroundColor: 'rgba(198, 198, 198, 0.54)',
          }}>
          <ImageBackground
            source={{uri: httpServer + '/' + poster}}
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              borderRadiusBottomLeft: 6,
              borderRadiusBottomRight: 6,
            }}
            imageStyle={{
              borderRadiusBottomLeft: 6,
              borderRadiusBottomRight: 6,
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
          </ImageBackground>
        </View>
      )}
    </View>
  );
};

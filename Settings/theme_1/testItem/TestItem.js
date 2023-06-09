import React from 'react';
import {Text, View, ImageBackground} from 'react-native';
import {styles} from './useStyles';
import GlobalStyle from '../GlobalStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  checkLanguage,
  checkLanguageConst,
} from '../../../src/hooks/useLanguage';
import {GlobalSvgSelector} from '../GlobalSvgSelector';

export const TestItem = ({
  item,
  activeIndex,
  index,
  itemHandler,
  language,
  httpServer,
  accessHandler,
  nextTestHandler,
  startTestHandler,
  viewResultTestHandler,
  translations
}) => {
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
            {checkLanguage(item.label, language)}
          </Text>
          <GlobalSvgSelector
            id={activeIndex === index ? 'arrow_bottom' : 'arrow_top'}
          />
        </TouchableOpacity>
        {activeIndex === index ? (
          <Text style={[GlobalStyle.CustomFontRegular, styles.item_text]}>
            {checkLanguage(item.description, language)}
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
          source={{uri: httpServer + '/' + item.poster}}
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            borderRadius: 16,
          }}
          imageStyle={{borderRadius: 16}}>
          {item.dostup === 'view' ? null : (
            <TouchableOpacity
              onPress={() => accessHandler(item.dostup)}
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
      {item.dostup === 'view' ? (
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          {item.status_start ? (
            <TouchableOpacity
              style={styles.button_start_test}
              onPress={() => nextTestHandler(item)}>
              <Text
                style={[
                  GlobalStyle.CustomFontRegular,
                  styles.button_start_test_text,
                ]}>
                {checkLanguageConst('ContinueTest', translations)}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button_start_test}
              onPress={() => startTestHandler(item)}>
              <Text
                style={[
                  GlobalStyle.CustomFontRegular,
                  styles.button_start_test_text,
                ]}>
                {checkLanguageConst('TakeTest', translations)}
              </Text>
            </TouchableOpacity>
          )}
          {item.status_end ? (
            <TouchableOpacity
              style={styles.button_view_test}
              onPress={() => viewResultTestHandler(item)}>
              <Text
                style={[
                  GlobalStyle.CustomFontRegular,
                  styles.button_view_test_text,
                ]}>
                {checkLanguageConst('ViewResults', translations)}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {styles} from './useStyles';
import GlobalStyle from '../GlobalStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {checkLanguageConst} from '../../../src/hooks/useLanguage';
import {GlobalSvgSelector} from '../GlobalSvgSelector';

export const ConsultantItem = ({
  item,
  translations,
  index,
  activeIndex,
  itemHandler,
}) => {
  return (
    <>
      {index === 0 ? (
        <Text style={[GlobalStyle.CustomFontRegular, styles.label]}>
          {checkLanguageConst('Application-is', translations)}
        </Text>
      ) : null}
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
            {item.label}
          </Text>
          <View style={[styles.icon_arrow]}>
            <GlobalSvgSelector
              id={activeIndex === index ? 'arrow_bottom' : 'arrow_top'}
            />
          </View>
        </TouchableOpacity>
        {activeIndex === index ? (
          <ScrollView style={styles.item_scroll}>
            <Text style={[GlobalStyle.CustomFontRegular, styles.item_text]}>
              {item.text}
            </Text>
          </ScrollView>
        ) : null}
      </View>
    </>
  );
};

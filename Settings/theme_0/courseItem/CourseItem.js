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

const dateToString = date => {
  date = new Date(date);

  let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  let month =
    date.getMonth() > 8 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  let year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export const CourseItem = ({
  item,
  activeIndex,
  index,
  itemHandler,
  language,
  translations,
  httpServer,
  startCourseHandler,
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
          imageStyle={{borderRadius: 16}}></ImageBackground>
      </View>
      <Text style={[GlobalStyle.CustomFontRegular, styles.item_desc_text]}>
        {item.avalibel
          ? `${checkLanguageConst(
              'XourseActivatedStartDate',
              translations,
            )} ${dateToString(
              item.object_date?.start_date,
            )} ${checkLanguageConst('To', translations)} ${dateToString(
              item.object_date?.end_date,
            )}`
          : checkLanguageConst('CourseActivationInformation', translations)}
      </Text>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <TouchableOpacity
          style={styles.button_start_test}
          onPress={() => startCourseHandler(item)}>
          <Text
            style={[
              GlobalStyle.CustomFontRegular,
              styles.button_start_test_text,
            ]}>
            {!item.avalibel
              ? checkLanguageConst('ActivateCourse', translations)
              : item.status
              ? checkLanguageConst('ContinueCourse', translations)
              : checkLanguageConst('StartCourse', translations)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

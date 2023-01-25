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
import {CardItem} from '../cardItem/CardItem';

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
      <CardItem
        language={language}
        httpServer={httpServer}
        label={item.label}
        description={item.description}
        poster={item.poster}
        activeIndex={activeIndex}
        index={index}
        itemHandler={itemHandler}
      />
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
          marginTop: 10,
        }}>
        <TouchableOpacity
          style={styles.button_start_test}
          onPress={() => startCourseHandler(item)}>
          <Text
            style={[GlobalStyle.CustomFontBold, styles.button_start_test_text]}>
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

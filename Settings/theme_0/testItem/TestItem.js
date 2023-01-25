import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './useStyles';
import GlobalStyle from '../GlobalStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {checkLanguageConst} from '../../../src/hooks/useLanguage';
import {CardItem} from '../cardItem/CardItem';

export const TestItem = ({
  item,
  activeIndex,
  index,
  itemHandler,
  language,
  translations,
  httpServer,
  accessHandler,
  nextTestHandler,
  startTestHandler,
  viewResultTestHandler,
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
        accessHandler={accessHandler}
        dostup={item.dostup}
      />
      {item.dostup === 'view' ? (
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            // flexDirection: 'row',
            // justifyContent: 'space-between',
            marginTop: 10,
          }}>
          {item.status_start ? (
            <TouchableOpacity
              style={styles.button_start_test}
              onPress={() => nextTestHandler(item)}>
              <Text
                style={[
                  GlobalStyle.CustomFontBold,
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
                  GlobalStyle.CustomFontBold,
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
                  GlobalStyle.CustomFontBold,
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

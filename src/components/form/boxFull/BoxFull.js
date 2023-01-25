import React, {useContext, useCallback, useEffect, useState} from 'react';
import {Text, View, Image, Pressable, TextInput} from 'react-native';
import {AuthContext} from '../../../context/authContext';
import {useHttp} from '../../../hooks/http.hook';
import {styles} from './useStyles';
import GlobalStyle from '../../GlobalStyle';
import {Colors} from '../../../utils/Colors';
import {settingsRoutes} from '../../../../Settings/routes/settingsRoutes';

export const BoxFull = ({
  label,
  name,
  change,
  value,
  theme,
  error,
  list_value,
  translations,
}) => {
  const boxHandler = data => {
    let arr_1 = value;
    if (arr_1.indexOf(data) !== -1) {
      arr_1.splice(arr_1.indexOf(data), 1);
    } else {
      arr_1 = [...arr_1, data];
      arr_1 = [...new Set(arr_1)];
    }
    change({name, value: arr_1});
  };

  return (
    <View style={styles.block}>
      <Text
        style={[
          settingsRoutes[theme].GlobalStyle.CustomFontLite,
          styles.label,
          {color: settingsRoutes[theme].ColorsStyles.text},
        ]}>
        {translations && translations[label] ? translations[label] : label}
      </Text>
      <View style={styles.root_click}>
        {list_value?.map((item, index) => (
          <Pressable
            style={styles.button_input}
            onPress={() => boxHandler(item.value)}>
            <View
              style={
                value.indexOf(item.value) !== -1
                  ? {
                      borderWidth: 2,
                      borderColor:
                        settingsRoutes[theme].ColorsStyles.colorButton,
                      minWidth: 18,
                      height: 18,
                      // borderRadius: 100,
                      backgroundColor:
                        settingsRoutes[theme].ColorsStyles.colorButton,
                    }
                  : {
                      borderWidth: 1,
                      borderColor:
                        settingsRoutes[theme].ColorsStyles.colorButton,
                      minWidth: 18,
                      height: 18,
                      // borderRadius: 100,
                      backgroundColor: '#E0E6F1',
                    }
              }
            />
            <Text
              style={[
                settingsRoutes[theme].GlobalStyle.CustomFontLite,
                styles.clip_text,
                {color: settingsRoutes[theme].ColorsStyles.text},
              ]}>
              {translations && translations[item.label]
                ? translations[item.label]
                : item.label}
            </Text>
          </Pressable>
        ))}
      </View>
      {error?.length ? (
        <Text
          style={[
            settingsRoutes[theme].GlobalStyle.CustomFontLite,
            styles.error_text,
          ]}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

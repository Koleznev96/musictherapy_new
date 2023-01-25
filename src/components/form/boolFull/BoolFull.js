import React, {useContext, useCallback, useEffect, useState} from 'react';
import {Text, View, Image, Pressable, TextInput} from 'react-native';
import {AuthContext} from '../../../context/authContext';
import {useHttp} from '../../../hooks/http.hook';
import {styles} from './useStyles';
import GlobalStyle from '../../GlobalStyle';
import {Colors} from '../../../utils/Colors';
import {settingsRoutes} from '../../../../Settings/routes/settingsRoutes';

export const BoolFull = ({
  label,
  name,
  change,
  value,
  theme,
  error,
  list_value,
  translations,
}) => {
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
            onPress={() => change({name, value: item.value})}>
            <View
              style={
                value === item.value
                  ? {
                      borderWidth: 2,
                      borderColor:
                        settingsRoutes[theme].ColorsStyles.colorButton,
                      minWidth: 18,
                      height: 18,
                      borderRadius: 100,
                      backgroundColor:
                        settingsRoutes[theme].ColorsStyles.colorButton,
                    }
                  : {
                      borderWidth: 1,
                      borderColor:
                        settingsRoutes[theme].ColorsStyles.colorButton,
                      minWidth: 18,
                      height: 18,
                      borderRadius: 100,
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

import React, {useContext, useCallback, useEffect, useState} from 'react';
import {Text, View, Image, Pressable, TextInput} from 'react-native';
import {AuthContext} from '../../../context/authContext';
import {useHttp} from '../../../hooks/http.hook';
import {styles} from './useStyles';
import GlobalStyle from '../../GlobalStyle';
import {settingsRoutes} from '../../../../Settings/routes/settingsRoutes';

export const InputFull = ({data, theme}) => {
  return (
    <>
      <TextInput
        onFocus={() => (data?.onFocus ? data.onFocus(data.valueFocus) : false)}
        secureTextEntry={data.secret ? true : false}
        value={data.value}
        placeholderTextColor={'#F3F3F3'}
        style={[
          {
            width: '100%',
            height: 46,
            borderRadius: 14,
            paddingHorizontal: 20,
            aliginItems: 'center',
            color: settingsRoutes[theme].ColorsStyles.text,
            marginTop: 10,
            textAlign: 'center',
            borderColor: settingsRoutes[theme].ColorsStyles.colorInput,
            borderWidth: 1,
            fontSize: 18,
          },
          data?.styles ? data.styles : null,
        ]}
        placeholder={data.placeholder}
        onChangeText={value => data.change({name: data?.name, value: value})}
        secureTextEntry={data.secret}
      />
      {data.error?.length ? (
        <Text
          style={[
            settingsRoutes[theme].GlobalStyle.CustomFontLite,
            styles.error_text,
          ]}>
          {data.error}
        </Text>
      ) : null}
    </>
  );
};

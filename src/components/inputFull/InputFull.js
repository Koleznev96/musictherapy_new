import React from 'react';
import {Text, TextInput} from 'react-native';
import {styles} from './useStyles';
import {checkLanguageConst} from '../../hooks/useLanguage';
import {settingsRoutes} from '../../../Settings/routes/settingsRoutes';

export const InputFull = ({data, translations, theme}) => {
  return (
    <>
      <TextInput
        onFocus={() => (data?.onFocus ? data.onFocus(data.valueFocus) : false)}
        secureTextEntry={data.secret ? true : false}
        value={data.value}
        placeholderTextColor={settingsRoutes[theme].ColorsStyles.text}
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
        onChangeText={value => data.change(value)}
        secureTextEntry={data.secret}
      />
      {data.error?.length ? (
        <Text
          style={[
            settingsRoutes[theme].GlobalStyle.CustomFontLite,
            styles.error_text,
            {color: settingsRoutes[theme].ColorsStyles.colorTextError},
          ]}>
          {checkLanguageConst(data.error, translations)}
        </Text>
      ) : null}
    </>
  );
};

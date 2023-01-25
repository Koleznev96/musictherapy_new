import React from 'react';
import {Text, View, TextInput} from 'react-native';
import {styles} from './useStyles';
import {settingsRoutes} from '../../../../Settings/routes/settingsRoutes';

export const InputForm = ({
  theme,
  label,
  name,
  change,
  value,
  styles_new,
  error,
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
      <TextInput
        value={value}
        placeholderTextColor={'#F3F3F3'}
        style={[
          {
            width: '100%',
            height: 46,
            borderRadius: 14,
            paddingHorizontal: 20,
            aliginItems: 'center',
            color: settingsRoutes[theme].ColorsStyles.text,
            marginTop: 4,
            textAlign: 'center',
            borderColor: settingsRoutes[theme].ColorsStyles.colorInput,
            borderWidth: 1,
            fontSize: 18,
          },
          styles_new ? styles_new : null,
        ]}
        // placeholder={label}
        onChangeText={value => change({name, value})}
      />
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

import React from 'react';
import {Text, ActivityIndicator, TouchableOpacity, View} from 'react-native';
import {styles} from './useStyles';
import GlobalStyle from '../GlobalStyle';
import {ColorsStyles} from '../ColorsStyles';

export const ButtonLogout = ({data}) => {
  return (
    <TouchableOpacity
      style={[styles.button, data?.styles ? data.styles : null]}
      onPress={() => data.change()}>
      {data.loading ? (
        <View style={styles.block_loader}>
          <ActivityIndicator
            size={40}
            color={ColorsStyles.colorTextError}
            style={styles.loader}
          />
        </View>
      ) : (
        <Text
          style={[
            GlobalStyle.CustomFontMedium,
            styles.button_text,
            data?.styles_text ? data.styles_text : null,
          ]}>
          {data.value}
        </Text>
      )}
    </TouchableOpacity>
  );
};

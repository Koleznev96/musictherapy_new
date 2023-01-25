import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from './useStyles';
import GlobalStyle from '../GlobalStyle';

export const ButtonMini = ({onPress, label, style}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={() => onPress()}>
      <Text style={[GlobalStyle.CustomFontRegular, styles.button_text]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

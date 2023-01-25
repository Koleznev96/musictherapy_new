import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from './useStyles';
import GlobalStyle from '../GlobalStyle';

export const ButtonInd = ({onPress, label}) => {
  return (
    <TouchableOpacity
      style={styles.button_audio_session}
      onPress={() => onPress()}>
      <Text
        style={[GlobalStyle.CustomFontBold, styles.button_audio_session_text]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

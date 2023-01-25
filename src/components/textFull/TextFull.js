import React, {useContext, useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {styles} from './useStyles';
import {settingsRoutes} from '../../../Settings/routes/settingsRoutes';

export const TextFull = ({data, theme}) => {
  return (
    <View style={styles.block}>
      <Text
        style={[
          settingsRoutes[theme].GlobalStyle.CustomFontRegular,
          styles.value,
        ]}>
        {data.value}
      </Text>
    </View>
  );
};

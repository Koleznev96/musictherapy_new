import React, {useContext} from 'react';
import {Text, View, Image} from 'react-native';
import {styles} from './useStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../../context/authContext';
import {checkLanguageConst} from '../../hooks/useLanguage';
import {settingsRoutes} from '../../../Settings/routes/settingsRoutes';

export const HeaderRoot = ({data, theme}) => {
  const auth = useContext(AuthContext);
  return (
    <View style={styles.body}>
      <View style={styles.block}>
        <Image
          source={require('../../assets/images/logo-min.png')}
          style={styles.logo}
        />

        <Text
          style={[
            settingsRoutes[theme].GlobalStyle.CustomFontBold,
            styles.text_glav,
          ]}>
          {checkLanguageConst(data?.label, auth.translations).toUpperCase()}
        </Text>
      </View>
      {data?.backHandler && (
        <TouchableOpacity
          style={styles.back_button}
          onPress={() => data?.backHandler()}>
          <Text
            style={[
              settingsRoutes[theme].GlobalStyle.CustomFontRegular,
              styles.back_button_text,
            ]}>
            {checkLanguageConst('Back', auth.translations)}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

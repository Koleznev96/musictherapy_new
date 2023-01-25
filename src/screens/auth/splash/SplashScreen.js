import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from '../../../context/authContext';
import {useHttp} from '../../../hooks/http.hook';
import {styles} from './useStyles';
import GlobalStyle from '../../../components/GlobalStyle';
import {ButtonFull} from '../../../components/buttonFull/ButtonFull';
import {settingsRoutes} from '../../../../Settings/routes/settingsRoutes';

function SplashScreen({navigation}) {
  const auth = useContext(AuthContext);
  const {loading, request, error, clearError} = useHttp();
  const [dataProfile, setDataProfile] = useState(null);

  const getProfile = async () => {
    try {
    } catch (e) {}
  };

  useEffect(() => {
    if (!!auth.token) {
      getProfile();
    }
  }, [auth.token]);

  const registerHandler = () => {
    navigation.navigate('Register');
  };

  const loginHandler = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={settingsRoutes[auth.theme].backgroundSettings.img_2}
      style={{flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
      <SafeAreaView
        style={{width: '100%', height: '100%', alignItems: 'center'}}>
        <View style={styles.block}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}
          />

          <Text
            style={[
              settingsRoutes[auth.theme].GlobalStyle.BellotaFontRegular,
              styles.text_glav,
            ]}>
            {checkLanguageConst('ApplicationName', auth.translations)}
          </Text>
          <Text
            style={[
              settingsRoutes[auth.theme].GlobalStyle.BellotaFontRegular,
              styles.text_foot,
            ]}>
            {checkLanguageConst('ApplicationDescription', auth.translations)}
          </Text>
          <View style={styles.block_buttons}>
            {settingsRoutes[auth.theme].ButtonFull({
              data: {
                value: checkLanguageConst('CreateAccount', auth.translations),
                change: registerHandler,
                styles: {marginTop: '25%'},
              },
            })}
            {settingsRoutes[auth.theme].ButtonFull({
              data: {
                value: checkLanguageConst('Login', auth.translations),
                change: loginHandler,
                styles: {marginTop: 25},
              },
            })}
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.button_footer]}
            onPress={() =>
              Linking.openURL('https://musictherapy.by/konsultant/').catch(
                err => console.error('An error occurred', err),
              )
            }>
            <Text
              style={[
                settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
                styles.button_footer_text,
              ]}>
              {checkLanguageConst('?', auth.translations)}
            </Text>
          </TouchableOpacity>
          <View style={styles.hr} />
          <TouchableOpacity
            style={[styles.button_footer]}
            onPress={() =>
              Linking.openURL('https://musictherapy.by/kontakty/').catch(err =>
                console.error('An error occurred', err),
              )
            }>
            <Text
              style={[
                settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
                styles.button_footer_text,
              ]}>
              {checkLanguageConst('Contacts', auth.translations)}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default SplashScreen;

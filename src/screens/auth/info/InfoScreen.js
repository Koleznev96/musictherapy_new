import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from '../../../context/authContext';
import {useHttp} from '../../../hooks/http.hook';
import {styles} from './useStyles';
import GlobalStyle from '../../../components/GlobalStyle';
import {HeaderAuth} from '../../../components/headerAuth/HeaderAuth';
import {ButtonFull} from '../../../components/buttonFull/ButtonFull';
import {InputFull} from '../../../components/inputFull/InputFull';
import {checkLanguageConst} from '../../../hooks/useLanguage';
import {settingsRoutes} from '../../../../Settings/routes/settingsRoutes';

function InfoScreen({navigation}) {
  const auth = useContext(AuthContext);
  const {loading, request, error, clearError} = useHttp();
  const [status, setStatus] = useState(false);
  const [email, setEmail] = useState('');
  const [errorField, setErrorField] = useState('');

  const AuthHandler = async () => {
    clearError();
    if (email.length === 0) {
      return setErrorField('Введите e-mail');
    }
    setErrorField('');
    try {
      const data = await request(`/api/auth/help_password`, 'POST', {email});
      if (data.errors) {
        setErrorField(data.errors[1]);
      } else {
        setStatus(true);
      }
    } catch (e) {}
  };

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
        {/* <HeaderAuth /> */}
        {settingsRoutes[auth.theme].HeaderAuth({
          translations: auth.translations,
          label: 'PasswordRecovery',
        })}
        {status ? (
          <>
            <View style={styles.block_active}>
              <Text
                style={[
                  settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
                  styles.text_foot,
                  {color: settingsRoutes[auth.theme].ColorsStyles.text},
                ]}>
                {checkLanguageConst('EmailWithPassword', auth.translations)}
              </Text>
              {settingsRoutes[auth.theme].ButtonFull({
                data: {
                  value: checkLanguageConst('LoginAccount', auth.translations),
                  change: loginHandler,
                  styles: {marginTop: '20%'},
                },
              })}
              <View style={styles.footer}>
                <TouchableOpacity
                  style={[styles.button_footer]}
                  onPress={() => registerHandler()}>
                  <Text
                    style={[
                      settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
                      styles.button_footer_text,
                      {color: settingsRoutes[auth.theme].ColorsStyles.text},
                    ]}>
                    {checkLanguageConst('CreateAccount', auth.translations)}
                  </Text>
                </TouchableOpacity>
                <View
                  style={[
                    styles.hr,
                    {
                      backgroundColor:
                        settingsRoutes[auth.theme].ColorsStyles.text,
                    },
                  ]}
                />
                <TouchableOpacity
                  style={[styles.button_footer]}
                  onPress={() => loginHandler()}>
                  <Text
                    style={[
                      settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
                      styles.button_footer_text,
                      {color: settingsRoutes[auth.theme].ColorsStyles.text},
                    ]}>
                    {checkLanguageConst('Login', auth.translations)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <>
            <Text
              style={[
                settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
                styles.text_foot,
                {color: settingsRoutes[auth.theme].ColorsStyles.text},
              ]}>
              {checkLanguageConst('EnterE-mailAccount', auth.translations)}
            </Text>
            <ScrollView
              style={styles.scroll}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollView}>
              <View style={styles.block}>
                <InputFull
                  translations={auth.translations}
                  data={{
                    value: email,
                    change: setEmail,
                    placeholder: checkLanguageConst(
                      'E-mail',
                      auth.translations,
                    ),
                    error: errorField,
                  }}
                  theme={auth.theme}
                />
                {settingsRoutes[auth.theme].ButtonFull({
                  data: {
                    value: checkLanguageConst(
                      'RestorePassword',
                      auth.translations,
                    ),
                    change: AuthHandler,
                    styles: {marginTop: '20%'},
                    loading: loading,
                  },
                })}
                <View style={styles.footer}>
                  <TouchableOpacity
                    style={[styles.button_footer]}
                    onPress={() => registerHandler()}>
                    <Text
                      style={[
                        settingsRoutes[auth.theme].GlobalStyle
                          .CustomFontRegular,
                        styles.button_footer_text,
                        {color: settingsRoutes[auth.theme].ColorsStyles.text},
                      ]}>
                      {checkLanguageConst('CreateAccount', auth.translations)}
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={[
                      styles.hr,
                      {
                        backgroundColor:
                          settingsRoutes[auth.theme].ColorsStyles.text,
                      },
                    ]}
                  />
                  <TouchableOpacity
                    style={[styles.button_footer]}
                    onPress={() => loginHandler()}>
                    <Text
                      style={[
                        settingsRoutes[auth.theme].GlobalStyle
                          .CustomFontRegular,
                        styles.button_footer_text,
                        {color: settingsRoutes[auth.theme].ColorsStyles.text},
                      ]}>
                      {checkLanguageConst('Login', auth.translations)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{height: 50, width: '100%'}} />
            </ScrollView>
          </>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

export default InfoScreen;

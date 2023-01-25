import React, {useContext, useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from '../../../context/authContext';
import {useHttp} from '../../../hooks/http.hook';
import {styles} from './useStyles';
import {InputFull} from '../../../components/inputFull/InputFull';
import {checkLanguageConst} from '../../../hooks/useLanguage';
import {settingsRoutes} from '../../../../Settings/routes/settingsRoutes';

function LoginScreen({navigation}) {
  const auth = useContext(AuthContext);
  const {loading, request, error, clearError} = useHttp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [errorField, setErrorField] = useState({
    email: '',
    password: '',
  });

  const AuthHandler = async () => {
    clearError();
    if (email.length === 0) {
      return setErrorField({
        name: '',
        fullName: '',
        telephone: '',
        email: 'E-mailError',
        password: '',
      });
    }
    if (password.length === 0) {
      return setErrorField({
        name: '',
        fullName: '',
        telephone: '',
        email: '',
        password: 'PasswordError',
      });
    }
    setErrorField({
      email: '',
      password: '',
    });

    try {
      const data = await request(`/api/auth/login`, 'POST', {email, password});
      if (data.errors) {
        setErrorField({...errorField, [data.errors[0][0]]: data.errors[0][1]});
      } else {
        navigation.navigate('Home');
        auth.login(data.token, email, password);
      }
    } catch (e) {}
  };

  const registerHandler = () => {
    navigation.navigate('Register');
  };

  const helpHandler = () => {
    navigation.navigate('Info');
  };

  // const onBlur = () => setFocused(false);
  const scrollRef = useRef();
  const onFocus = set => {
    // setFocused(true);
    // let gin = 0;
    // if (set === 1) gin = 50;
    // scrollRef.current?.scrollTo({
    //     y: gin,
    //     animated: true,
    // });
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <ImageBackground
      source={settingsRoutes[auth.theme].backgroundSettings.img_2}
      style={{flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
      <SafeAreaView
        style={{width: '100%', height: '100%', alignItems: 'center'}}>
        {/* <HeaderAuth /> */}
        {settingsRoutes[auth.theme].HeaderAuth({
          translations: auth.translations,
          label: 'Login',
        })}
        <Text
          style={[
            settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
            styles.text_foot,
            {color: settingsRoutes[auth.theme].ColorsStyles.text},
          ]}>
          {checkLanguageConst('EnterYourDetails', auth.translations)}
        </Text>
        <ScrollView
          style={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
          ref={scrollRef}>
          <View style={styles.block}>
            <InputFull
              translations={auth.translations}
              data={{
                value: email,
                change: setEmail,
                placeholder: checkLanguageConst('E-mail', auth.translations),
                error: errorField.email,
                onFocus: onFocus,
                valueFocus: 0,
              }}
              theme={auth.theme}
            />
            <InputFull
              translations={auth.translations}
              data={{
                value: password,
                change: setPassword,
                placeholder: checkLanguageConst('Password', auth.translations),
                error: errorField.password,
                secret: true,
                onFocus: onFocus,
                valueFocus: 1,
              }}
              theme={auth.theme}
            />
            {settingsRoutes[auth.theme].ButtonFull({
              data: {
                value: checkLanguageConst('LoginAccount', auth.translations),
                change: AuthHandler,
                styles: {marginTop: isKeyboardVisible ? '5%' : '30%'},
                loading: loading,
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
                onPress={() => helpHandler()}>
                <Text
                  style={[
                    settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
                    styles.button_footer_text,
                    {color: settingsRoutes[auth.theme].ColorsStyles.text},
                  ]}>
                  {checkLanguageConst('ForgotPassword?', auth.translations)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{height: 50, width: '100%'}} />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default LoginScreen;

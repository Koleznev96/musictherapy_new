import React, {useContext, useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  Linking,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
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

function RegisterScreen({navigation}) {
  const auth = useContext(AuthContext);
  const {loading, request, error, clearError} = useHttp();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [name, setName] = useState('');
  const [fullName, setFullName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorField, setErrorField] = useState({
    name: '',
    fullName: '',
    telephone: '',
    email: '',
    password: '',
  });

  const getProfile = async () => {
    try {
    } catch (e) {}
  };

  useEffect(() => {
    if (!!auth.token) {
      getProfile();
    }
  }, [auth.token]);

  const exitHandler = () => {
    navigation.goBack();
  };

  const AuthHandler = async () => {
    clearError();
    if (name.length === 0) {
      return setErrorField({
        name: 'NameError',
        fullName: '',
        telephone: '',
        email: '',
        password: '',
      });
    }
    if (fullName.length === 0) {
      return setErrorField({
        name: '',
        fullName: 'SurnameError',
        telephone: '',
        email: '',
        password: '',
      });
    }
    if (telephone.length === 0) {
      return setErrorField({
        name: '',
        fullName: '',
        telephone: 'PhoneError',
        email: '',
        password: '',
      });
    }
    if (email.length === 0) {
      return setErrorField({
        name: '',
        fullName: '',
        telephone: '',
        email: 'E-mailError',
        password: '',
      });
    }
    if (password.length < 6) {
      return setErrorField({
        name: '',
        fullName: '',
        telephone: '',
        email: '',
        password: 'PasswordErrorLength',
      });
    }
    setErrorField({
      name: '',
      fullName: '',
      telephone: '',
      email: '',
      password: '',
    });
    try {
      // const data = await request(`/api/auth/register_new`, 'POST', {name, fullName, telephone, email, password});
      // if (data.errors) {
      //     setErrorField({...errorField, [data.errors[0][0]]: data.errors[0][1]});
      // } else {
      //     navigation.navigate({
      //         name: 'CodeCheck',
      //         params: {data: {name, fullName, telephone, email, password}, tokenCode: data.tokenCode},
      //     });
      // }
      const data = await request(`/api/auth/register`, 'POST', {
        name,
        fullName,
        telephone,
        email,
        password,
      });
      if (data.errors) {
        setErrorField({...errorField, [data.errors[0][0]]: data.errors[0][1]});
      } else {
        const data_new = await request(`/api/auth/code_check`, 'POST', {
          name,
          fullName,
          telephone,
          email,
          password,
          tokenCode: data.tokenCode,
          code: '111111',
        });
        if (data_new.errors) {
          setErrorField({
            ...errorField,
            [data.errors[0][0]]: data.errors[0][1],
          });
        } else {
          navigation.navigate('Home');
          auth.login(data_new.token, email, password);
        }
      }

      // if (data.errors) {
      //     setErrorField({...errorField, [data.errors[0][0]]: data.errors[0][1]});
      // } else {
      //     navigation.navigate({
      //         name: 'CodeCheck',
      //         params: {data: {name, fullName, telephone, email, password}, tokenCode: data.tokenCode},
      //     });
      // }
    } catch (e) {}
  };

  const loginHandler = () => {
    navigation.navigate('Login');
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

  const scrollRef = useRef();
  const onFocus = set => {
    let gin = 0;
    if (set === 0) gin = 60;
    if (set === 1) gin = 120;
    if (set === 2) gin = 180;
    scrollRef.current?.scrollTo({
      y: gin,
      animated: true,
    });
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
          label: 'Registration',
        })}
        <Text
          style={[
            settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
            styles.text_foot,
            {color: settingsRoutes[auth.theme].ColorsStyles.text},
          ]}>
          {checkLanguageConst('CreateAccount', auth.translations)}
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
                value: name,
                change: setName,
                placeholder: checkLanguageConst('Name', auth.translations),
                error: errorField.name,
              }}
              theme={auth.theme}
            />
            <InputFull
              translations={auth.translations}
              data={{
                value: fullName,
                change: setFullName,
                placeholder: checkLanguageConst('Surname', auth.translations),
                error: errorField.fullName,
              }}
              theme={auth.theme}
            />
            <InputFull
              translations={auth.translations}
              data={{
                value: telephone,
                change: setTelephone,
                placeholder: checkLanguageConst('Phone', auth.translations),
                error: errorField.telephone,
                onFocus: onFocus,
                valueFocus: 0,
              }}
              theme={auth.theme}
            />
            <InputFull
              translations={auth.translations}
              data={{
                value: email,
                change: setEmail,
                placeholder: checkLanguageConst('E-mail', auth.translations),
                error: errorField.email,
                onFocus: onFocus,
                valueFocus: 1,
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
                valueFocus: 2,
              }}
              theme={auth.theme}
            />
            {settingsRoutes[auth.theme].ButtonFull({
              data: {
                value: checkLanguageConst('CreateAccount', auth.translations),
                change: AuthHandler,
                styles: {marginTop: 20},
                loading: loading,
              },
            })}
            <TouchableOpacity
              style={styles.buttonLog}
              onPress={() => loginHandler()}>
              <Text
                style={[
                  settingsRoutes[auth.theme].CustomFontRegular,
                  styles.buttonLog_text,
                  {color: settingsRoutes[auth.theme].ColorsStyles.text},
                ]}>
                {checkLanguageConst('LoginMyAccount', auth.translations)}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{height: 50, width: '100%'}} />
        </ScrollView>
        <View style={styles.footer}>
          {!isKeyboardVisible ? (
            <TouchableOpacity
              style={[styles.button_footer]}
              onPress={() =>
                Linking.openURL(
                  'https://musictherapy.by/politikakonfidentapp/',
                ).catch(err => console.error('An error occurred', err))
              }>
              <Text
                style={[
                  settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
                  styles.button_footer_text,
                  {color: settingsRoutes[auth.theme].ColorsStyles.text},
                ]}>
                {checkLanguageConst('TermsOfUse', auth.translations)}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default RegisterScreen;

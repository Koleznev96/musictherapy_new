import React, {useContext, useEffect, useState, useRef} from 'react';
import {
    Text,
    View,
    Linking,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Keyboard
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {AuthContext} from "../../../context/authContext";
import {useHttp} from "../../../hooks/http.hook";
import {styles} from "./useStyles";
import GlobalStyle from "../../../components/GlobalStyle";
import {HeaderAuth} from "../../../components/headerAuth/HeaderAuth";
import {ButtonFull} from '../../../components/buttonFull/ButtonFull';
import {InputFull} from '../../../components/inputFull/InputFull';


function RegisterScreen ({ navigation }) {
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
    }

    const AuthHandler = async () => {
        clearError();
        if (name.length === 0) {
            return setErrorField({
                name: 'Введите имя',
                fullName: '',
                telephone: '',
                email: '',
                password: '',
            });
        }
        if (fullName.length === 0) {
            return setErrorField({
                name: '',
                fullName: 'Введите фамилию',
                telephone: '',
                email: '',
                password: '',
            });
        }
        if (telephone.length === 0) {
            return setErrorField({
                name: '',
                fullName: '',
                telephone: 'Введите телефон',
                email: '',
                password: '',
            });
        }
        if (email.length === 0) {
            return setErrorField({
                name: '',
                fullName: '',
                telephone: '',
                email: 'Введите E-mail',
                password: '',
            });
        }
        if (password.length < 6) {
            return setErrorField({
                name: '',
                fullName: '',
                telephone: '',
                email: '',
                password: 'Пароль должен быть не меньше 6 символов',
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
            const data = await request(`/api/auth/register_new`, 'POST', {name, fullName, telephone, email, password});
            if (data.errors) {
                setErrorField({...errorField, [data.errors[0][0]]: data.errors[0][1]});
            } else {              
                navigation.navigate({
                    name: 'CodeCheck',
                    params: {data: {name, fullName, telephone, email, password}, tokenCode: data.tokenCode},
                });
            }
        } catch (e) {}
    };

    const loginHandler = () => {
        navigation.navigate('Login');
    }

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true); // or some other action
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false); // or some other action
        });
        
        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);
        
    const scrollRef = useRef();
    const onFocus = (set) => {
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
            source={require('../../../assets/images/background.jpg')}
            style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}
        > 
        <SafeAreaView
            style={{width: '100%', height: '100%', alignItems: 'center'}}
        >
                <HeaderAuth />
                <Text style={[GlobalStyle.CustomFontRegular, styles.text_foot]}>
                    {(auth.translations && auth.translations['Создать новый аккаунт']) ? auth.translations['Создать новый аккаунт'] : 'Создать новый аккаунт'}
                </Text>
                <ScrollView style={styles.scroll} 
                    keyboardShouldPersistTaps='handled' 
                    showsVerticalScrollIndicator={false} 
                    contentContainerStyle={styles.scrollView}
                    ref={scrollRef}
                >
                    <View style={styles.block}>
                        <InputFull data={{value: name, change: setName, placeholder: (auth.translations && auth.translations['Имя']) ? auth.translations['Имя'] : 'Имя', error: errorField.name}} />
                        <InputFull data={{value: fullName, change: setFullName, placeholder: (auth.translations && auth.translations['Фамилия']) ? auth.translations['Фамилия'] : 'Фамилия', error: errorField.fullName}} />
                        <InputFull data={{value: telephone, change: setTelephone, placeholder: (auth.translations && auth.translations['Телефон']) ? auth.translations['Телефон'] : 'Телефон', error: errorField.telephone, onFocus: onFocus, valueFocus: 0}} />
                        <InputFull data={{value: email, change: setEmail, placeholder: (auth.translations && auth.translations['E-mail']) ? auth.translations['E-mail'] : 'E-mail', error: errorField.email, onFocus: onFocus, valueFocus: 1}} />
                        <InputFull data={{value: password, change: setPassword, placeholder: (auth.translations && auth.translations['Пароль']) ? auth.translations['Пароль'] : 'Пароль', error: errorField.password, secret: true, onFocus: onFocus, valueFocus: 2}} />

                        <ButtonFull data={{value: (auth.translations && auth.translations['Создать новый аккаунт']) ? auth.translations['Создать новый аккаунт'] : 'Создать новый аккаунт', change: AuthHandler, styles: {marginTop: 20,}, loading: loading}} />
                        <TouchableOpacity
                            style={styles.buttonLog}
                            onPress={() => loginHandler()}
                        >
                            <Text style={[GlobalStyle.CustomFontRegular, styles.buttonLog_text]}>
                            {(auth.translations && auth.translations['Войти в существующий аккаунт']) ? auth.translations['Войти в существующий аккаунт'] : 'Войти в существующий аккаунт'}
                                
                            </Text>
                        </TouchableOpacity>  
                    </View>

                    <View style={{height: 50, width: '100%'}} />
                </ScrollView>
                <View style={styles.footer}>
                    {!isKeyboardVisible ? (
                    <TouchableOpacity
                    style={[styles.button_footer]}
                    onPress={() => Linking.openURL('https://musictherapy.by/politikakonfidentapp/').catch(err => console.error('An error occurred', err))}
                    >
                    <Text style={[GlobalStyle.CustomFontRegular, styles.button_footer_text]}>
                    {(auth.translations && auth.translations['Регестрируясь, принимаю условия использования и даю согласие на хранение и обработку персональных данных']) ? auth.translations['Регестрируясь, принимаю условия использования и даю согласие на хранение и обработку персональных данных'] : 'Регестрируясь, принимаю условия использования и даю согласие на хранение и обработку персональных данных'}
                         
                    </Text>
                    </TouchableOpacity>
                    ): null}
                </View>            
            </SafeAreaView>
        </ImageBackground>
    )
}

export default RegisterScreen;
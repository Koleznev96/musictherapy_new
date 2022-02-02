import React, {useContext, useState, useRef, useEffect} from 'react';
import {
    Text,
    View,
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
import { ButtonFull } from '../../../components/buttonFull/ButtonFull';
import {InputFull} from '../../../components/inputFull/InputFull';


function LoginScreen ({ navigation }) {
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
                email: 'Введите E-mail',
                password: '',
            });
        }
        if (password.length === 0) {
            return setErrorField({
                name: '',
                fullName: '',
                telephone: '',
                email: '',
                password: 'Введите пароль',
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
                auth.login(data.token, email, password);
            }
        } catch (e) {}
    };

    const registerHandler = () => {
        navigation.navigate('Register');
    }
      
    const helpHandler = () => {
        navigation.navigate('Info');
    }

    // const onBlur = () => setFocused(false);
    const scrollRef = useRef();
    const onFocus = (set) => {
        // setFocused(true);
        // let gin = 0;
        // if (set === 1) gin = 50;
        // scrollRef.current?.scrollTo({
        //     y: gin,
        //     animated: true,
        // });
    };

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
                    Введите ваши данные
                </Text>
                <ScrollView style={styles.scroll} 
                    keyboardShouldPersistTaps='handled' 
                    showsVerticalScrollIndicator={false} 
                    contentContainerStyle={styles.scrollView}
                    ref={scrollRef}
                >
                    <View style={styles.block}>
                        <InputFull data={{value: email, change: setEmail, placeholder: 'E-mail', error: errorField.email, onFocus: onFocus, valueFocus: 0}} />
                        <InputFull data={{value: password, change: setPassword, placeholder: 'Пароль', error: errorField.password, secret: true, onFocus: onFocus, valueFocus: 1}} />

                        <ButtonFull data={{value: 'Войти в аккаунт', change: AuthHandler, styles: {marginTop: isKeyboardVisible ? '5%' : '30%',}, loading: loading}} />
                        <View style={styles.footer}>
                            <TouchableOpacity
                                style={[styles.button_footer]}
                                onPress={() => registerHandler()}
                            >
                                <Text style={[GlobalStyle.CustomFontRegular, styles.button_footer_text]}>
                                    Создать новый аккаунт 
                                </Text>
                            </TouchableOpacity>  
                            <View style={styles.hr} />
                            <TouchableOpacity
                                style={[styles.button_footer]}
                                onPress={() => helpHandler()}
                            >
                                <Text style={[GlobalStyle.CustomFontRegular, styles.button_footer_text]}>
                                    Забыли пароль?
                                </Text>
                            </TouchableOpacity>  
                        </View>
                    </View>

                    <View style={{height: 50, width: '100%'}} />
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default LoginScreen;
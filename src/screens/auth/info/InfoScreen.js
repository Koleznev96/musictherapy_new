import React, {useContext, useState} from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {AuthContext} from "../../../context/authContext";
import {useHttp} from "../../../hooks/http.hook";
import {styles} from "./useStyles";
import GlobalStyle from "../../../components/GlobalStyle";
import {HeaderAuth} from "../../../components/headerAuth/HeaderAuth";
import {ButtonFull} from '../../../components/buttonFull/ButtonFull';
import {InputFull} from '../../../components/inputFull/InputFull';


function InfoScreen ({ navigation }) {
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
    }
      
    const loginHandler = () => {
        navigation.navigate('Login');
    }

    return (
        <ImageBackground
            source={require('../../../assets/images/background.jpg')}
            style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}
        >
            <SafeAreaView
                style={{width: '100%', height: '100%', alignItems: 'center'}}
            > 
                <HeaderAuth />
                {status ? (
                    <>
                    <View style={styles.block_active}>
                    <Text style={[GlobalStyle.CustomFontRegular, styles.text_foot]}>
                        На ваш e-mail было отправленно письмо с паролем
                    </Text>
                    <ButtonFull data={{value: 'Войти в аккаунт', change: loginHandler, styles: {marginTop: '20%',}}} />
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
                                onPress={() => loginHandler()}
                            >
                                <Text style={[GlobalStyle.CustomFontRegular, styles.button_footer_text]}>
                                    Войти
                                </Text>
                            </TouchableOpacity>  
                        </View>
                        </View>
                    </>
                ) : (
                <>
                <Text style={[GlobalStyle.CustomFontRegular, styles.text_foot]}>
                    Введите e-mail от своего аккаунта
                </Text>
                <ScrollView style={styles.scroll} 
                    keyboardShouldPersistTaps='handled' 
                    showsVerticalScrollIndicator={false} 
                    contentContainerStyle={styles.scrollView}
                >
                    <View style={styles.block}>
                        <InputFull data={{value: email, change: setEmail, placeholder: 'E-mail', error: errorField}} />

                        <ButtonFull data={{value: 'Востановить пароль', change: AuthHandler, styles: {marginTop: '20%',}, loading: loading}} />
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
                                onPress={() => loginHandler()}
                            >
                                <Text style={[GlobalStyle.CustomFontRegular, styles.button_footer_text]}>
                                    Войти
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
    )
}

export default InfoScreen;
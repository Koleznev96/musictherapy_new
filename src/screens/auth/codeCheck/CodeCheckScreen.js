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
import { checkLanguageConst } from '../../../hooks/useLanguage';


function CodeCheckScreen ({ navigation, route }) {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const reg_data = route.params.data;
    const [tokenCode, setTokenCode] = useState(route.params.tokenCode);
    const [code, setCode] = useState('');
    const [errorField, setErrorField] = useState('');
    const [status, setStatus] = useState(true);

    const AuthHandler = async () => {
        clearError();
        if (code.length === 0) {
            return setErrorField('Введите код');
        }
        setErrorField('');
        try {
            const data = await request(`/api/auth/code_check`, 'POST', {...reg_data, tokenCode, code});
            if (data.errors) {
                setErrorField(data.errors[0][1]);
            } else {
                navigation.navigate('Home');
                auth.login(data.token, reg_data.email, reg_data.password);
            }
        } catch (e) {}
    };

    const newCode = async () => {
        try {
            const data = await request(`/api/auth/register_new`, 'POST', {...reg_data});
            setTokenCode(data.tokenCode);
        } catch (e) {}
        setStatus(false);
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
                <Text style={[GlobalStyle.CustomFontRegular, styles.text_foot]}>
                    {checkLanguageConst('Для завершения регистрации введите код активации, который отправлен вам на e-mail', auth.translations)}                     
                </Text>
                <ScrollView style={styles.scroll} 
                    keyboardShouldPersistTaps='handled' 
                    showsVerticalScrollIndicator={false} 
                    contentContainerStyle={styles.scrollView}
                >
                    <View style={styles.block}>
                        <InputFull translations={auth.translations} data={{value: code, change: setCode, placeholder: checkLanguageConst('Код', auth.translations), error: errorField}} />

                        <View style={styles.block_reset}>
                            {status? (
                            <>
                            <Text style={[GlobalStyle.CustomFontRegular, styles.block_reset_text]}>
                                {checkLanguageConst('Не получили код?', auth.translations)}
                            </Text>
                            <TouchableOpacity
                                style={styles.button_reset}
                                onPress={() => newCode()}
                            >
                                <Text style={[GlobalStyle.CustomFontRegular, styles.button_reset_text]}>
                                    {checkLanguageConst('Отправить ещё раз', auth.translations)}
                                </Text>
                            </TouchableOpacity>  
                            </>
                            ) : (
                            <Text style={[GlobalStyle.CustomFontRegular, styles.block_reset_text]}>
                                {checkLanguageConst('Код отправлен', auth.translations)}                                
                            </Text>
                            )}
                        </View>

                        <ButtonFull data={{value: checkLanguageConst('Завершить регистрацию', auth.translations), change: AuthHandler, styles: {marginTop: 50,}, loading: loading}} />
                        <TouchableOpacity
                            style={styles.buttonLog}
                            onPress={() => loginHandler()}
                        >
                            <Text style={[GlobalStyle.CustomFontRegular, styles.buttonLog_text]}>
                                {checkLanguageConst('Войти в существующий аккаунт', auth.translations)}                                
                            </Text>
                        </TouchableOpacity>  
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default CodeCheckScreen;
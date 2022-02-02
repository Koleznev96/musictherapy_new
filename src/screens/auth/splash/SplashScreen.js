import React, {useContext, useEffect, useState} from 'react';
import {
    Text,
    View,
    ImageBackground,
    Image,
    Linking,
    TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {AuthContext} from "../../../context/authContext";
import {useHttp} from "../../../hooks/http.hook";
import {styles} from "./useStyles";
import GlobalStyle from "../../../components/GlobalStyle";
import { ButtonFull } from '../../../components/buttonFull/ButtonFull';


function SplashScreen ({ navigation }) {
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
                <View style={styles.block}>
                    <Image source={require('../../../assets/images/logo.png')} style={styles.logo}/>
                
                    <Text style={[GlobalStyle.BellotaFontRegular, styles.text_glav]}>
                        МУЗЫКОТЕРАПИЯ
                    </Text>
                    <Text style={[GlobalStyle.BellotaFontRegular, styles.text_foot]}>
                        Уникальные программы востановления и отдыха
                    </Text>
                    <View style={styles.block_buttons}>
                        <ButtonFull data={{value: 'Создать новый аккаунт', change: registerHandler, styles: {marginTop: '25%',}}} />
                        <ButtonFull data={{value: 'Войти', change: loginHandler, styles: {marginTop: 25,}}} />
                    </View>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[styles.button_footer]}
                        onPress={() => Linking.openURL('https://vk.com').catch(err => console.error('An error occurred', err))}
                    >
                        <Text style={[GlobalStyle.CustomFontRegular, styles.button_footer_text]}>
                            Консультант 
                        </Text>
                    </TouchableOpacity>  
                    <View style={styles.hr} />
                    <TouchableOpacity
                        style={[styles.button_footer]}
                        onPress={() => Linking.openURL('https://vk.com').catch(err => console.error('An error occurred', err))}
                    >
                        <Text style={[GlobalStyle.CustomFontRegular, styles.button_footer_text]}>
                            Связаться с нами
                        </Text>
                    </TouchableOpacity>  
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

export default SplashScreen;
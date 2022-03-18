import React, {useContext, useEffect, useState} from 'react';
import {
    Text,
    View,
    ScrollView,
    ImageBackground,
    Image,
    TouchableOpacity,
    RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {AuthContext} from "../../context/authContext";
import {useHttp} from "../../hooks/http.hook";
import {styles} from "./useStyles";
import GlobalStyle from "../../components/GlobalStyle";
import {HeaderRoot} from "../../components/headerRoot/HeaderRoot";
import { ButtonFull } from '../../components/buttonFull/ButtonFull';
import {optionQuestionnaire} from './components/options';
import { ColorsStyles } from '../../constants/ColorsStyles';
import { LoaderIn } from '../../components/loader/minLoader/LoaderIn';
import { ProfileData } from './components/ProfileData';
import { ProfileForm } from './components/ProfileForm';
import { useCallback } from 'react/cjs/react.production.min';

function ProfileScreen ({ navigation }) {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [Refreshing, setRefreshing] = useState(false);
    const [name, setName] = useState('');
    const [fullName, setFullName] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [language, setLanguage] = useState('');
    const [activeMenu, setActiveMenu] = useState(true);
    const [statusNewData, setStatusNewData] = useState(false);
    const [statusNewForm, setStatusNewForm] = useState(false);
    const [formNew, setFormNew] = useState(null);
    const [formAccNew, setFormAccNew] = useState(null);

    const createFields = (formAcc) => {
        let field = {};
        optionQuestionnaire?.fields?.forEach(item => {
            field[item.value] = formAcc ? formAcc[item.value] : item.default;
        });
        setFormAccNew(field);
    }

    const getProfile = async() => {
        try {
            const data = await request(`/api/profile/data`, 'GET', null, {
                Authorization: `${auth.token}`
            });
            // if (auth.language !== data.data.language) auth.newLanguage(data.data.language);
            setFormNew({name: data.data.name, fullName: data.data.fullName, telephone: data.data.telephone, email: data.data.email});
            createFields(data.questionnaire);
            setStatusNewData(false);
            setStatusNewForm(false);
        } catch (e) {}
    };

    useEffect(() => {
        if (auth.token && !formNew) getProfile();
    }, [auth.token]);

    const logoutHandler = () => {
        auth.logout();
    }

    const registerHandler = () => {
        navigation.navigate('Register');
    }

    const loginHandler = () => {
        navigation.navigate('Login');
    }

    const activeMenuHandler = (status) => {
        setActiveMenu(status)
    }

    const saveHandler = async () => {
        if (!statusNewData && !statusNewForm) return;
        try {
            const data = await request(`/api/profile/re_data`, 'POST', {data: statusNewData ? formNew : null, questionnaire: statusNewForm ? formAccNew : null}, {
                Authorization: `${auth.token}`
            });
            
            setFormNew({name: data.data.name, fullName: data.data.fullName, telephone: data.data.telephone, email: data.data.email});
            createFields(data.questionnaire);
            setStatusNewData(false);
            setStatusNewForm(false);
        } catch (e) {}
    }

    const setRoot = (data) => {
        setStatusNewData(true);
        let new_data = {...formNew};
        new_data[data.name] = data.value;
        setFormNew(new_data);
    }

    const setQuestionnaire = (data) => {
        setStatusNewForm(true);
        let new_data = {...formAccNew};
        new_data[data.name] = data.value;
        setFormAccNew(new_data);
    }

    const backHandler = () => {
        navigation.navigate('Home');
    }

    if (!auth.token)
    return (
        <ImageBackground
            source={require('../../assets/images/background.jpg')}
            style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}
        > 
            <SafeAreaView
                style={{width: '100%', height: '100%', alignItems: 'center'}}
            >
                <View style={styles.block}>
                    <Image source={require('../../assets/images/logo.png')} style={styles.logo}/>
                
                    <Text style={[GlobalStyle.BellotaFontRegular, styles.text_glav]}>
                        {(auth.translations && auth.translations['Музыкотерапия']) ? auth.translations['Музыкотерапия'].toUpperCase() : 'МУЗЫКОТЕРАПИЯ'}
                    </Text>
                    <Text style={[GlobalStyle.BellotaFontRegular, styles.text_foot]}>
                    {(auth.translations && auth.translations['Уникальные программы востановления и отдыха']) ? auth.translations['Уникальные программы востановления и отдыха'] : 'Уникальные программы востановления и отдыха'}
                    </Text>
                    <View style={styles.buttons_length}>
                        <TouchableOpacity
                            style={[styles.button_length]}
                            onPress={() => auth.newLanguage('ru')}
                        >
                            <Text style={[GlobalStyle.CustomFontRegular, auth.language === 'ru' ? styles.block_buttons_length_text : styles.block_buttons_length_text_active]}>
                                рус
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button_length]}
                            onPress={() => auth.newLanguage('com')}
                        >
                            <Text style={[GlobalStyle.CustomFontRegular, auth.language === 'com' ? styles.block_buttons_length_text : styles.block_buttons_length_text_active]}>
                                eng 
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.block_text}>
                        <Text style={[GlobalStyle.CustomFontRegular, styles.block_text_main]}>
                            {(auth.translations && auth.translations['Предлагаем зарегистрироваться для доступа к расширенным функциям приложения и персональному подбору плейлистов.']) ? auth.translations['Предлагаем зарегистрироваться для доступа к расширенным функциям приложения и персональному подбору плейлистов.'] : 'Предлагаем зарегистрироваться для доступа к расширенным функциям приложения и персональному подбору плейлистов.'}
                        </Text>
                    </View>
                    <View style={styles.block_buttons}>
                        <ButtonFull data={{value: (auth.translations && auth.translations['Создать новый аккаунт']) ? auth.translations['Создать новый аккаунт'] : 'Создать новый аккаунт', change: registerHandler, styles: {marginTop: 30,}}} />
                        <ButtonFull data={{value: (auth.translations && auth.translations['Войти']) ? auth.translations['Войти'] : 'Войти', change: loginHandler, styles: {marginTop: 25,}}} />
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );

    return (
        <ImageBackground
            source={require('../../assets/images/background.jpg')}
            style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}
        > 
            <View style={{width: '100%', height: 50, backgroundColor: ColorsStyles.backgroundFooter, position: 'absolute', top: 0}} />
            <SafeAreaView
            style={{width: '100%', height: '100%', alignItems: 'center'}}
            >
                <HeaderRoot data={{label: 'АККАУНТ', backHandler: backHandler}}/>
                    <View style={styles.header_block}>
                        <TouchableOpacity 
                        style={[styles.header_button, activeMenu ? styles.header_button_active : null]}
                        onPress={() => activeMenuHandler(true)}
                        >
                            <Text style={[GlobalStyle.CustomFontRegular, styles.header_button_text]}>
                                {(auth.translations && auth.translations['Ваши данные']) ? auth.translations['Ваши данные'] : 'Ваши данные'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={[styles.header_button, !activeMenu ? styles.header_button_active : null]}
                        onPress={() => activeMenuHandler(false)}
                        >
                            <Text style={[GlobalStyle.CustomFontRegular, styles.header_button_text]}>
                                {(auth.translations && auth.translations['Анкета']) ? auth.translations['Анкета'] : 'Анкета'}
                                
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {loading ? (
                        <LoaderIn />
                    ) : (
                    <ScrollView style={styles.scroll} 
                        keyboardShouldPersistTaps='handled' 
                        showsVerticalScrollIndicator={false} 
                        contentContainerStyle={styles.scrollView}
                        refreshControl={
                            <RefreshControl
                                refreshing={Refreshing}
                                onRefresh={() => getProfile()}
                                colors={[ColorsStyles.colorTextError]}
                            />
                        }
                    >
                        {activeMenu ? (
                            <>
                            <View style={styles.buttons_length}>
                                <TouchableOpacity
                                    style={[styles.button_length]}
                                    onPress={() => auth.newLanguage('ru')}
                                >
                                    <Text style={[GlobalStyle.CustomFontRegular, auth.language === 'ru' ? styles.block_buttons_length_text : styles.block_buttons_length_text_active]}>
                                        рус
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button_length]}
                                    onPress={() => auth.newLanguage('com')}
                                >
                                    <Text style={[GlobalStyle.CustomFontRegular, auth.language === 'com' ? styles.block_buttons_length_text : styles.block_buttons_length_text_active]}>
                                        eng 
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <ProfileData statusNewData={statusNewData} form={formNew} setRoot={setRoot} saveHandler={saveHandler} logoutHandler={logoutHandler} />
                            </>
                        ) : (
                            <ProfileForm statusNewData={statusNewForm} form={formAccNew} setRoot={setQuestionnaire} saveHandler={saveHandler} logoutHandler={logoutHandler} />
                        )}
                        <View style={{height: 50, width: '100%'}} />
                    </ScrollView>
                    )}
            </SafeAreaView>
        </ImageBackground>
    )
}

export default ProfileScreen;
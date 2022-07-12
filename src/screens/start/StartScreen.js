import React, {useContext, useCallback, useEffect, useState} from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Linking
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {AuthContext} from "../../context/authContext";
import {useHttp} from "../../hooks/http.hook";
import {styles} from "./useStyles";
import GlobalStyle from "../../components/GlobalStyle";
import { GlobalSvgSelector } from '../../assets/GlobalSvgSelector';
import {HeaderAuth} from "../../components/headerAuth/HeaderAuth";
import { ButtonFull } from '../../components/buttonFull/ButtonFull';
import {InputFull} from '../../components/inputFull/InputFull';
import { appVersion } from '../../../const';
import { PopapContext } from '../../context/PopapContext';
import { checkLanguage, checkLanguageConst } from '../../hooks/useLanguage';
import AsyncStorage from '@react-native-async-storage/async-storage';


function StartScreen ({ navigation }) {
    const auth = useContext(AuthContext);
    const popapRoot = useContext(PopapContext);
    const {loading, request, error, clearError} = useHttp();
    const [data, setData] = useState(false);
    const [data_list, set_data_list] = useState(data_list_not_auth);
    // const [active_menu, set_active_menu] = useState(0);

    // const upload_classic_menu = (value) => {
    //     value = value ? value : "0";
    //     AsyncStorage.setItem("classic_menu", value);
    //     set_active_menu(value);
    // }

    // const classic_menu_start = async () => {
    //     const classic_menu_new = await AsyncStorage.getItem("classic_menu");
    //     upload_classic_menu(classic_menu_new);
    // }

    // useEffect(() => {
    //     classic_menu_start();
    // }, [])

    const data_list_not_auth = [
        {
            name: (auth.translations && auth.translations['Классика HD']) ? auth.translations['Классика HD'] : 'Классика HD',
            router: 'Video',
            img: require('../../assets/images/classic.jpg'),
            url: '/api/data/v2/classic/',
            url_: '/api/data/v2/fusion/',
            url_like: '/api/data/video/',
        },
        {
            name: (auth.translations && auth.translations['Медитации']) ? auth.translations['Медитации'] : 'Медитации',
            router: 'Video',
            img: require('../../assets/images/meditation.jpg'),
            url: '/api/data/v2/meditation/',
            url_like: '/api/data/video/',
        },
        {
            name: (auth.translations && auth.translations['Живой звук']) ? auth.translations['Живой звук'] : 'Живой звук',
            router: 'Card',
            img: require('../../assets/images/sound.jpg'),
            url: '/api/data/v2/live_sound/',
            url_like: '/api/data/card/',
        }, 
        {
            name: (auth.translations && auth.translations['Инструменты']) ? auth.translations['Инструменты'] : 'Инструменты',
            router: 'Video',
            img: require('../../assets/images/instruments.jpg'),
            url: '/api/data/v2/tool/',
            url_like: '/api/data/video/',
        },
    ];
    
    
    const data_list_auth = [
        {
            name: (auth.translations && auth.translations['Классика HD']) ? auth.translations['Классика HD'] : 'Классика HD',
            router: 'Video',
            img: require('../../assets/images/classic.jpg'),
            url: '/api/data/v2/classic/',
            url_: '/api/data/v2/fusion/',
            url_like: '/api/data/video/',
        },
        {
            name: (auth.translations && auth.translations['Медитации']) ? auth.translations['Медитации'] : 'Медитации',
            router: 'Video',
            img: require('../../assets/images/meditation.jpg'),
            url: '/api/data/v2/meditation/',
            url_like: '/api/data/video/',
        },
        {
            name: (auth.translations && auth.translations['Живой звук']) ? auth.translations['Живой звук'] : 'Живой звук',
            router: 'Card',
            img: require('../../assets/images/sound.jpg'),
            url: '/api/data/v2/live_sound/',
            url_like: '/api/data/card/',
        }, 
        {
            name: (auth.translations && auth.translations['Инструменты']) ? auth.translations['Инструменты'] : 'Инструменты',
            router: 'Video',
            img: require('../../assets/images/instruments.jpg'),
            url: '/api/data/v2/tool/',
            url_like: '/api/data/video/',
        },
        {
            name: (auth.translations && auth.translations['Тесты']) ? auth.translations['Тесты'] : 'Тесты',
            router: 'Tests',
            img: require('../../assets/images/test.jpg'),
            url: '/api/data/get_list_test/',
            url_like: '/api/data/card/',
        }, 
        {
            name: (auth.translations && auth.translations['Онлайн курсы']) ? auth.translations['Онлайн курсы'] : 'Онлайн курсы',
            router: 'Courses',
            img: require('../../assets/images/course.jpg'),
            url: '/api/data/get_list_course/',
            url_like: '/api/data/video/',
        },
    ];

    useEffect(() => {
        if (auth.token) {
            set_data_list(data_list_auth);
        } else {
            set_data_list(data_list_not_auth);
        }
    }, [auth.token]);

    const nextHandler = (item) => {
        navigation.navigate({name: item.router, params: {data_root: item}});
    }

    const updateHandler = () => {
        if (Platform.OS === 'ios') 
        Linking.openURL('https://apps.apple.com/by/app/музыкотерапия/id1608306469').catch(err => console.error('An error occurred', err)) 
        else
        Linking.openURL('https://play.google.com/store/apps/details?id=by.musictherapy').catch(err => console.error('An error occurred', err))
    }

    const DataPopap = (label) =>(
        <View style={styles.block_dalate}>
            <Text style={[GlobalStyle.CustomFontBold, styles.label_root]}>Обновление приложения</Text>

            <Text style={[GlobalStyle.CustomFontRegular, styles.label]}>{checkLanguage(label, auth.language)}</Text>

            <TouchableOpacity
            style={styles.button_dalete}
            onPress={() => updateHandler()}
            >
                <Text style={[GlobalStyle.CustomFontRegular, styles.item_text]}>Обновить</Text>
            </TouchableOpacity>
        </View>
    );

    useEffect(() => {
        if (auth.version !== null && auth.version !== appVersion) {
            popapRoot.dataChange(DataPopap(auth.labelUpdate));
            popapRoot.openHandler();
        }
    }, [auth.version]);

    return (
        
        <ImageBackground
            source={require('../../assets/images/background-img.jpg')}
            style={{flex: 1, justifyContent: 'space-between', alignItems: 'center'}}
        > 
            <ImageBackground
                style={{width: '100%', height: '100%', alignItems: 'center'}}
                imageStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.38)'}}
            > 
                <SafeAreaView
                    style={{ width: '100%', height: '100%', paddingBottom: -35, }}
                >
                
                <HeaderAuth />
                <ScrollView style={styles.scroll} 
                    keyboardShouldPersistTaps='handled' 
                    showsVerticalScrollIndicator={false} 
                    contentContainerStyle={styles.scrollView}
                >
                    <View style={styles.block}>
                        {data_list?.map((item, index) => (
                            <TouchableOpacity
                            key={index}
                            style={[styles.item_button]}
                            onPress={() => nextHandler(item)}
                            >
                                <ImageBackground
                                    source={item.img}
                                    style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}
                                    imageStyle={{ borderRadius: 16, backgroundColor: '#000'}}
                                > 
                                    <ImageBackground
                                        style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}
                                        imageStyle={{ borderRadius: 16, backgroundColor: 'rgba(0, 0, 0, 0.3)'}}
                                    > 
                                        <Text style={[GlobalStyle.CustomFontMedium, styles.item_name]}>
                                            {item.name?.toUpperCase()}
                                        </Text>
                                    </ImageBackground>
                                </ImageBackground>
                            </TouchableOpacity> 
                        ))}
                        
                    </View>
                    <View style={{height: 50, width: '100%'}} />
                </ScrollView>
                
                </SafeAreaView>
            </ImageBackground>
        </ImageBackground>
    )
}

export default StartScreen;
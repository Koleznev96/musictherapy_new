import React, {useContext, useCallback, useEffect, useState} from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Keyboard
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
import ImgRelaxation from '../../assets/images/relaxation.jpg';
import ImgActivation from '../../assets/images/activation.jpg';
import ImgTherapy from '../../assets/images/therapy.jpg';


function GoalScreen ({ navigation }) {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [data, setData] = useState(false);

    const data_list = [
        {
            name: (auth.translations && auth.translations['Релакс']) ? auth.translations['Релакс'] : 'Релакс',
            router: 'Audio',
            img: ImgRelaxation,
            url: '/api/data/audio/Релакс/',
            url_like: '/api/data/audio/',
        },
        {
            name: (auth.translations && auth.translations['Активация']) ? auth.translations['Активация'] : 'Активация',
            router: 'Audio',
            img: ImgActivation,
            url: '/api/data/audio/Активация/',
            url_like: '/api/data/audio/',
        },
        {
            name: (auth.translations && auth.translations['Терапия']) ? auth.translations['Терапия'] : 'Терапия',
            router: 'Audio',
            img: ImgTherapy,
            url: '/api/data/audio/Терапия/',
            url_like: '/api/data/audio/',
        },
    ];

    const nextHandler = (item) => {
        navigation.navigate({name: item.router, params: {data_root: item}});
    }

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
                    style={{ width: '100%', height: '100%',  }}
                >
                
                <HeaderAuth />
                <ScrollView style={styles.scroll} 
                    keyboardShouldPersistTaps='handled' 
                    showsVerticalScrollIndicator={false} 
                    contentContainerStyle={styles.scrollView}
                >
                    <View style={styles.block}>
                        {data_list.map((item, index) => (
                            <TouchableOpacity
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
                                            {item.name}
                                        </Text>
                                    </ImageBackground>
                                </ImageBackground>
                            </TouchableOpacity> 
                        ))}
                        <Text style={[GlobalStyle.CustomFontRegular, styles.footer_text]}>

                            {(auth.translations && auth.translations['Рекомендуется прослушивать плейлисты по 30 минут в течение не менее 90 дней']) ? auth.translations['Рекомендуется прослушивать плейлисты по 30 минут в течение не менее 90 дней'] : 'Рекомендуется прослушивать плейлисты по 30 минут в течение не менее 90 дней'}
                        </Text>
                    </View>
                    <View style={{height: 50, width: '100%'}} />
                </ScrollView>
                
                </SafeAreaView>
            </ImageBackground>
        </ImageBackground>
    )
}

export default GoalScreen;
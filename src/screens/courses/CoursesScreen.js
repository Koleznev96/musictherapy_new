import React, {useContext, useEffect, useState} from 'react';
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    ImageBackground,
    RefreshControl,
    Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {AuthContext} from "../../context/authContext";
import {useHttp} from "../../hooks/http.hook";
import {styles} from "./useStyles";
import GlobalStyle from "../../components/GlobalStyle";
import { GlobalSvgSelector } from '../../assets/GlobalSvgSelector';
import {HeaderRoot} from "../../components/headerRoot/HeaderRoot";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
import { ColorsStyles } from '../../constants/ColorsStyles';
import { LoaderIn } from '../../components/loader/minLoader/LoaderIn';
import {httpServer} from '../../../const';
import { checkLanguage, checkLanguageConst } from '../../hooks/useLanguage';
import { PopapContext } from '../../context/PopapContext';
import { HeaderDop } from '../../components/headerDop/HeaderDop';
import { CourseContext } from '../../context/CourseContext';


const dateToString = (date) => {
    date = new Date(date);

    let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
    let month = date.getMonth() > 8 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
    let year = date.getFullYear();

    return `${day}.${month}.${year}`
}


function CoursesScreen ({ navigation, route }) {
    const {data_root} = route.params;
    const popapRoot = useContext(PopapContext);
    const courseRoot = useContext(CourseContext);
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [data, setData] = useState([]);
    const [Refreshing, setRefreshing] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [counterPage, setCounterPage] = useState(0);
    const [end_page, set_end_page] = useState(false);
    const [loader, setLoader] = useState(false);
    const [access, setAccess] = useState(null);
    const [loaderPaginashion, setLoaderPaginashion] = useState(false);

    const itemHandler = (index) => {
        if (index === activeIndex) setActiveIndex(-1);
        else setActiveIndex(index);
    }

    const backHandler = () => {
        navigation.goBack();
    }

    const DataPopap = (label) =>(
        <View style={styles.block_dalate}>
            <Text style={[GlobalStyle.CustomFontRegular, styles.label]}>{label}</Text>

            <TouchableOpacity
            style={styles.button_dalete}
            onPress={() => popapRoot.exitHandler()}
            >
                <Text style={[GlobalStyle.CustomFontRegular, styles.item_text]}>Ok</Text>
            </TouchableOpacity>
        </View>
    );

    const accessHandler = (dostup) => {
        let text = "";
        if (dostup === "auth") {
            text = auth.language === 'ru' ? 'Этот контент доступен только после входа в систему (через меню Аккаунт)' : 
            'This content is available only after sign in (via menu Account)';
        }
        else if (dostup === "premium") {
            text = auth.language === 'ru' ? 'Доступно для премиум аккаунтов' : 
            'Available for premium accounts';
        }
        popapRoot.dataChange(DataPopap(text));
        popapRoot.openHandler();
    }

    const startCourseHandler = (data) => {
        if (!data.avalibel) return null;
        if (data.status) {
            navigation.navigate({
                name: "LessonCourse", 
                params: {
                    data_root: data, 
                    number: data.status.current_lesson >= data.length_lessons - 1 ? data.status.current_lesson : data.status.current_lesson + 1, 
                    data_user_test: data.status
                }
            });
        } else {
            navigation.navigate({name: "InfoCourse", params: {data_root: data}});
        }
    }

    return (
        <ImageBackground
            source={require('../../assets/images/background-img.jpg')}
            style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}
        >
            <ImageBackground
                style={{width: '100%', height: '100%', alignItems: 'center'}}
                imageStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.38)'}}
            >  
                <View style={{width: '100%', height: 50, backgroundColor: ColorsStyles.backgroundFooter, position: 'absolute', top: 0}} />
                <SafeAreaView
                    style={{width: '100%', height: '100%', alignItems: 'center'}}
                >
                <HeaderDop data={{label: checkLanguageConst('Курсы', auth.translations), backHandler, back_text: ""}}/>
                {/* <HeaderRoot data={{label: (auth.translations && auth.translations['Курсы']) ? auth.translations['Курсы'] : 'Курсы', backHandler}}/> */}
                <View style={styles.block}>
                    {courseRoot?.loader ? (
                        <LoaderIn />
                    ) : (
                    <FlatList
                        style={{width: '100%'}}
                        contentContainerStyle={{paddingBottom: 100}}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={Refreshing}
                                onRefresh={() => courseRoot.getData()}
                                colors={[ColorsStyles.colorTextError]}
                            />
                        }
                        data={courseRoot?.data}
                        renderItem={({item, index}) => (
                            <View style={styles.item_block_root}>
                                <View style={activeIndex === index ? styles.item_block_active : styles.item_block}>
                                    <TouchableOpacity
                                    style={[styles.item_button]}
                                    onPress={() => itemHandler(index)}
                                    >
                                        <Text style={[activeIndex === index ? GlobalStyle.CustomFontBold : GlobalStyle.CustomFontMedium, styles.item_name]}>
                                            {checkLanguage(item.label, auth.language)}
                                        </Text>
                                        <GlobalSvgSelector id={activeIndex === index ? 'arrow_bottom' : 'arrow_top'} />
                                    </TouchableOpacity>
                                    {activeIndex === index ? (
                                        <Text style={[GlobalStyle.CustomFontRegular, styles.item_text]}>
                                            {checkLanguage(item.description, auth.language)}
                                        </Text> 
                                    ): null}
                                </View> 
                                <View style={{
                                    width: '100%',
                                    height: 200,
                                    borderRadius: 16,
                                    marginTop: 10,
                                    backgroundColor: 'rgba(198, 198, 198, 0.54)',
                                }}>
                                    
                                    <ImageBackground
                                        source={{uri: httpServer + '/' + item.poster}}
                                        style={{width: '100%', height: '100%', alignItems: 'center', borderRadius: 16,}}
                                        imageStyle={{ borderRadius: 16, }}
                                    >  
                                    {/* {item.dostup === "view" ? null : (
                                        <TouchableOpacity 
                                        onPress={() => accessHandler(item.dostup)}
                                        style={{position: 'absolute', left: 10, top: 10, opacity: 0.4}}
                                        >
                                            <GlobalSvgSelector id="access" />
                                        </TouchableOpacity>
                                    )} */}
                                    </ImageBackground>
                                </View>
                                <Text style={[GlobalStyle.CustomFontRegular, styles.item_desc_text]}>
                                    {item.avalibel ? 
                                        `${(auth.translations && auth.translations['Курс активирован на период с']) ? 
                                        auth.translations['Курс активирован на период с'] : 
                                        'Курс активирован на период с'} ${dateToString(item.object_date?.start_date)} ${(auth.translations && auth.translations['по']) ? 
                                        auth.translations['по'] : 
                                        'по'} ${dateToString(item.object_date?.end_date)}`
                                    : 
                                        (auth.translations && auth.translations['Для активации курса, пожалуйста, свяжитесь с администратором по телефону +375(44)464-73-47 или e-mail info@musictherapy.by']) ? 
                                        auth.translations['Для активации курса, пожалуйста, свяжитесь с администратором по телефону +375(44)464-73-47 или e-mail info@musictherapy.by'] : 
                                        'Для активации курса, пожалуйста, свяжитесь с администратором по телефону +375(44)464-73-47 или e-mail info@musictherapy.by'
                                    }
                                </Text> 
                                <View 
                                    style={{
                                        width: '100%', 
                                        alignItems: 'center', 
                                        flexDirection: 'row', 
                                        justifyContent: 'center',
                                        marginTop: 10,
                                    }} 
                                >
                                    <TouchableOpacity
                                        style={styles.button_start_test}
                                        onPress={() => startCourseHandler(item)}
                                    >
                                        <Text style={[GlobalStyle.CustomFontRegular, styles.button_start_test_text]}>
                                            {!item.avalibel ? 
                                                (auth.translations && auth.translations['Активировать курс']) ? 
                                                auth.translations['Активировать курс'] : 
                                                'Активировать курс'
                                            : 
                                                (auth.translations && auth.translations['Продолжить курс']) ? 
                                                auth.translations['Продолжить курс'] : 
                                                'Продолжить курс'
                                            }
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                    )}
                    </View>
                    <View style={{height: 50, width: '100%'}} />
                </SafeAreaView>
            </ImageBackground>
        </ImageBackground>
    )
}

export default CoursesScreen;
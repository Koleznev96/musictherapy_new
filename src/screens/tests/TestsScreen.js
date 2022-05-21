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
import { DataContext } from '../../context/DataContext';
import { HeaderDop } from '../../components/headerDop/HeaderDop';


function TestsScreen ({ navigation, route }) {
    const {data_root} = route.params;
    const popapRoot = useContext(PopapContext);
    const dataRoot = useContext(DataContext);
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

    // const getData = async () => {
    //     setLoader(true);
    //     try {
    //         const data = await request(`${data_root.url}`, 'GET', null, {
    //             Authorization: `${auth.token}`
    //         });
    //         console.log('mmm-', data.data[0].status, data.data[0].status?.status)
    //         setData(data.data);
    //         setAccess(data.access);
    //         setLoader(false);
    //     } catch (e) {}
    // };

    // useEffect(() => {
    //     getData();
    // }, [auth.token]);

    const fullScreenHandler = (data) => {
        navigation.navigate({
            name: 'FullVideo',
            params: data,
        });
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

    const nextTestHandler = (data) => {
        navigation.navigate({
            name: "QuestionTest", 
            params: {
                data_root: data, 
                number: data.status_start.current_question >= data.length_questions - 1 ? data.status_start.current_question : data.status_start.current_question + 1, 
                data_user_test: data.status_start
            }
        });
    }

    const startTestHandler = (data) => {
        navigation.navigate({name: "InfoTest", params: {data_root: data}});
    }

    const viewResultTestHandler = (data) => {
        navigation.navigate({name: "ResultTest", params: {user_test_id: data.status_end._id, test_id: data._id}});
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
                {/* <HeaderRoot data={{label: data_root.name, backHandler}}/> */}
                <HeaderDop data={{label: checkLanguageConst('Тесты', auth.translations), backHandler, back_text: ""}}/>
                <View style={styles.block}>
                    {dataRoot.loader ? (
                        <LoaderIn />
                    ) : (
                    <FlatList
                        style={{width: '100%'}}
                        contentContainerStyle={{paddingBottom: 100}}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={Refreshing}
                                onRefresh={() => dataRoot.getData()}
                                colors={[ColorsStyles.colorTextError]}
                            />
                        }
                        data={dataRoot.data}
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
                                    {item.dostup === "view" ? null : (
                                        <TouchableOpacity 
                                        onPress={() => accessHandler(item.dostup)}
                                        style={{position: 'absolute', left: 10, top: 10, opacity: 0.4}}
                                        >
                                            <GlobalSvgSelector id="access" />
                                        </TouchableOpacity>
                                    )}
                                    </ImageBackground>
                                </View>
                                {item.dostup === "view" ? (
                                <View
                                    style={{
                                        width: '100%',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginTop: 10,
                                    }}
                                >
                                    {(item.status_start) ? (
                                        <TouchableOpacity
                                            style={styles.button_start_test}
                                            onPress={() => nextTestHandler(item)}
                                        >
                                            <Text style={[GlobalStyle.CustomFontRegular, styles.button_start_test_text]}>
                                                {(auth.translations && auth.translations['Продолжить тест']) ? auth.translations['Продолжить тест'] : 'Продолжить тест'}
                                            </Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity
                                            style={styles.button_start_test}
                                            onPress={() => startTestHandler(item)}
                                        >
                                            <Text style={[GlobalStyle.CustomFontRegular, styles.button_start_test_text]}>
                                                {(auth.translations && auth.translations['Пройти тест']) ? auth.translations['Пройти тест'] : 'Пройти тест'}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                    {(item.status_end) ? (
                                        <TouchableOpacity
                                            style={styles.button_view_test}
                                            onPress={() => viewResultTestHandler(item)}
                                        >
                                            <Text style={[GlobalStyle.CustomFontRegular, styles.button_view_test_text]}>
                                                {(auth.translations && auth.translations['Посмотреть результаты']) ? auth.translations['Посмотреть результаты'] : 'Посмотреть результаты'}
                                            </Text>
                                        </TouchableOpacity>
                                    ): null}
                                </View>
                                ): null}
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

export default TestsScreen;
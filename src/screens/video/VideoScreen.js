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
import { checkLanguage } from '../../hooks/useLanguage';
import { PopapContext } from '../../context/PopapContext';


function VideoScreen ({ navigation, route }) {
    const {data_root} = route.params;
    const popapRoot = useContext(PopapContext);
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

    const getData = async () => {
        setLoader(true);
        try {
            const data = await request(`${data_root.url}ios/0`, 'GET', null, {
                Authorization: `${auth.token}`
            });
            let new_data = data.data;
            new_data.sort((prev, next) => {console.log('ffff-', prev.label, prev.dostup); return (next.like - prev.like)});
            setData(data.data);
            setCounterPage(data.data.length);
            set_end_page(data.end_page);
            setAccess(data.access);
            setLoader(false);
        } catch (e) {}
    };

    useEffect(() => {
        getData();
    }, [auth.token]);

    const fullScreenHandler = (data) => {
        navigation.navigate({
            name: 'FullVideo',
            params: data,
        });
    }

    const paginashion = async () => {
        if (end_page) {
            return 0;
        }

        try {
            setLoaderPaginashion(true);
            const answer = await request(`${data_root.url}ios/${counterPage}`, 'GET', null, {
                Authorization: `${auth.token}`
            });
            setData([...data, ...answer.data]);
            setCounterPage(counterPage + answer.data.length);
            set_end_page(answer.end_page);
            setLoaderPaginashion(false);
        } catch (e) {}
    }

    const backHandler = () => {
        navigation.goBack();
    }

    const likeHandler = async (item, index) => {
        let new_data = [...data];
        let url = data_root.url_like +  'like/';
        if (item.like) {
            new_data[index].like = 0;
            url += 'put';
        }
        else {
            new_data[index].like = 1;
            url += 'add';
        }
        setData(new_data);

        try {
            await request(url, 'POST', {id: item._id}, {
                Authorization: `${auth.token}`
            });
        } catch (e) {}
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
        console.log('kkk-', dostup)
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
                <HeaderRoot data={{label: data_root.name, backHandler}}/>
                <View style={styles.block}>
                    {loader ? (
                        <LoaderIn />
                    ) : (
                    <FlatList
                        // onEndReached={paginashion}
                        // onEndReachedThreshold={0.3}
                        style={{width: '100%'}}
                        contentContainerStyle={{paddingBottom: 100}}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={Refreshing}
                                onRefresh={() => getData()}
                                colors={[ColorsStyles.colorTextError]}
                            />
                        }
                        data={data}
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
                                            {checkLanguage(item.text, auth.language)}
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
                                        source={{uri: httpServer + '/' + checkLanguage(item.poster, auth.language)}}
                                        style={{width: '100%', height: '100%', alignItems: 'center', borderRadius: 16,}}
                                        imageStyle={{ borderRadius: 16, }}
                                    >  
                                    <ImageBackground
                                        style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}
                                        imageStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.38)', borderRadius: 16,}}
                                    > 
                                    {/* {item.access ? (item.access.indexOf(access) !== -1 ? null : (
                                        <TouchableOpacity 
                                        onPress={() => accessHandler()}
                                        style={{position: 'absolute', left: 10, top: 10, opacity: 0.4}}
                                        >
                                            <GlobalSvgSelector id="access" />
                                        </TouchableOpacity>
                                    )) : null} */}
                                    {item.dostup === "view" ? null : (
                                        <TouchableOpacity 
                                        onPress={() => accessHandler(item.dostup)}
                                        style={{position: 'absolute', left: 10, top: 10, opacity: 0.4}}
                                        >
                                            <GlobalSvgSelector id="access" />
                                        </TouchableOpacity>
                                    )}

                                    {auth.token ? (
                                        <TouchableOpacity 
                                        style={styles.button_like}
                                        onPress={() => likeHandler(item, index)}
                                        >
                                            <GlobalSvgSelector id={item.like === 1 ? "like_active" : "like"} />
                                        </TouchableOpacity>
                                    ) : null}
                                    
                                    <TouchableOpacity
                                    
                                    onPress={() => 
                                        // item.access ? (item.access.indexOf(access) !== -1 ? fullScreenHandler(item) : false) : fullScreenHandler(item)
                                        item.dostup === "view" ? fullScreenHandler(item) : false
                                    }
                                    >
                                        {/* <GlobalSvgSelector id="play" /> */}
                                        <Image style={{width: 52, height: 52,}} source={require('../../components/audioPlayer/resources/ui_play.png')} />
                                    </TouchableOpacity>
                                    </ImageBackground>
                                    </ImageBackground>
                                    {/* <VideoPlayer 
                                        isFullscreen={true}
                                        poster={httpServer + '/' + item.poster}
                                        paused={true}
                                        pictureInPicture={true}
                                        toggleResizeModeOnFullscreen={false}
                                        disableBack={true}
                                        showOnStart={true}
                                        access={item.access ? (item.access.indexOf(access) !== -1 ? true : false) : true}
                                        onEnterFullscreen={() => fullScreenHandler(item)}
                                        style={{
                                            borderRadius: 16,
                                            height: 200,
                                            width: '100%',
                                        }}
                                        videoStyle={{
                                            width: '100%',
                                            height: 200,
                                        }}
                                        source={{uri: httpServer + '/' + item.video}} 
                                    /> */}
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

export default VideoScreen;
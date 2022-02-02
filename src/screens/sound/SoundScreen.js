import React, {useContext, useEffect, useState} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    Image,
    Linking,
    RefreshControl,
    FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {AuthContext} from "../../context/authContext";
import {useHttp} from "../../hooks/http.hook";
import {styles} from "./useStyles";
import GlobalStyle from "../../components/GlobalStyle";
import {HeaderRoot} from "../../components/headerRoot/HeaderRoot";
import { ColorsStyles } from '../../constants/ColorsStyles';
import { LoaderIn } from '../../components/loader/minLoader/LoaderIn';
import {httpServer} from '../../../const';


function SoundScreen ({ navigation }) {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [Refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState([]);
    const [counterPage, setCounterPage] = useState(0);
    const [end_page, set_end_page] = useState(false);
    const [loader, setLoader] = useState(false);
    const [loaderPaginashion, setLoaderPaginashion] = useState(false);

    const getData = async () => {
        setLoader(true);
        try {
            const data = await request(`/api/data/live_sound/0`, 'GET', null, {
                Authorization: `${auth.token}`
            });
            setData(data.data);
            setCounterPage(data.data.length);
            set_end_page(data.end_page);
            setLoader(false);
        } catch (e) {}
    };

    useEffect(() => {
        getData();
    }, [auth.token]);

    const paginashion = async () => {
        if (end_page) {
            return 0;
        }

        try {
            setLoaderPaginashion(true);
            const answer = await request(`/api/data/live_sound/${counterPage}`, 'GET', null, {
                Authorization: `${auth.token}`
            });
            setData([...data, ...answer.data]);
            setCounterPage(counterPage + answer.data.length);
            set_end_page(answer.end_page);
            setLoaderPaginashion(false);
        } catch (e) {}
    }

    const nextHandler = (url) => {
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }

    return (
        <ImageBackground
            style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}
            source={require('../../assets/images/background-img.jpg')}
        > 
            <ImageBackground
                style={{width: '100%', height: '100%', alignItems: 'center'}}
                imageStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.38)'}}
            > 
                <View style={{width: '100%', height: 50, backgroundColor: ColorsStyles.backgroundFooter, position: 'absolute', top: 0}} />
                <SafeAreaView            
                    style={{width: '100%', height: '100%', alignItems: 'center'}}
                >
            
                <HeaderRoot data={{label: 'ЖИВОЙ ЗВУК'}}/>
                    <View style={styles.block}>
                        <Text style={[GlobalStyle.CustomFontRegular, styles.label]}>
                            Приглашаем на ЖИВЫЕ концерты!
                        </Text>
                        {loader ? (
                            <LoaderIn />
                        ) : (
                        <FlatList
                            onEndReached={paginashion}
                            onEndReachedThreshold={0.3}
                            showsVerticalScrollIndicator={false}
                            style={{width: '100%'}}
                            contentContainerStyle={{paddingBottom: 100}}
                            refreshControl={
                                <RefreshControl
                                    refreshing={Refreshing}
                                    onRefresh={() => getData()}
                                    colors={[ColorsStyles.colorTextError]}
                                />
                            }
                            data={data}
                            renderItem={({item, index}) => (
                                <View style={styles.item_block}>
                                <Image
                                    source={{uri: httpServer + '/' + item.img}}
                                    style={styles.item_img}
                                />
                                <TouchableOpacity
                                style={[styles.item_button]}
                                onPress={() => nextHandler(item.url)}
                                >
                                    <Text style={[GlobalStyle.CustomFontRegular, styles.item_button_text]}>
                                        Купить билеты
                                    </Text>
                                </TouchableOpacity>
                                </View>
                            )}
                        />
                        )}
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </ImageBackground>
    )
}

export default SoundScreen;
import React, {useContext, useEffect, useState} from 'react';
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {styles} from "./useStyles";
import { HeaderDop } from '../../../components/headerDop/HeaderDop';
import { AuthContext } from '../../../context/authContext';
import { useHttp } from '../../../hooks/http.hook';
import { ColorsStyles } from '../../../constants/ColorsStyles';
import { LoaderIn } from '../../../components/loader/minLoader/LoaderIn';
import GlobalStyle from '../../../components/GlobalStyle';
import { checkLanguage, checkLanguageConst } from '../../../hooks/useLanguage';
import { DataContext } from '../../../context/DataContext';
import { GlobalSvgSelector } from '../../../assets/GlobalSvgSelector';


const dateToString = (date) => {
    date = new Date(date);

    let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
    let month = date.getMonth() > 8 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
    let year = date.getFullYear();

    return `${day}.${month}.${year}`
}


function ResultTestScreen ({ navigation, route }) {
    const {user_test_id, test_id} = route.params;
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState(null);
    const dataRoot = useContext(DataContext);
    const [activeIndex, setActiveIndex] = useState([0]);

    const viewHandler = (index) => {
        let list_index = [...activeIndex];
        const delete_index = activeIndex?.indexOf(index);
        if (delete_index !== -1) {
            list_index.splice(delete_index, 1);
        }
        else {
            list_index.push(index);
        }
        setActiveIndex([...list_index]);
    }

    const backHandler = () => {
        dataRoot.updateHandler();
        navigation.navigate('Tests');
    }

    const getData = async () => {
        setLoader(true);
        try {
            let result = await request(`/api/data/test_return_result/${test_id}/${user_test_id}`, 'GET', null, {
                Authorization: `${auth.token}`
            });
            // console.log('mmnnn-', result)
            result.result = result.result?.reverse();
            setData(result);
        } catch (e) {
            // console.log('err-', e)
        }
        setLoader(false);
    }

    useEffect(() => {
        getData();
    }, []);
 
    return (
        <ImageBackground
            source={require('../../../assets/images/background-img.jpg')}
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
                <HeaderDop data={{label: checkLanguageConst('Тесты', auth.translations), backHandler, back_text: "Все тесты"}}/>
                <View style={styles.block}>
                    {loader ? (
                        <LoaderIn />
                    ) : (
                        <ScrollView style={styles.scroll} 
                            keyboardShouldPersistTaps='handled' 
                            showsVerticalScrollIndicator={false} 
                            contentContainerStyle={styles.scrollView}
                        >
                            <Text style={[GlobalStyle.CustomFontBold, styles.label]}>
                                {checkLanguage(data?.test?.label, auth.language)}
                            </Text>
                            {/* <Text style={[GlobalStyle.CustomFontBold, styles.label_two]}>
                                {checkLanguageConst('Инструкции:', auth.translations)}
                            </Text> */}
                            {data?.result?.map((result, index_r) => (
                                <>
                            <View 
                                style={{
                                    width: '100%', 
                                    paddingHorizontal: 6, 
                                    paddingVertical: 4,
                                    borderRadius: 12, 
                                    backgroundColor: '#FFFFFF',
                                    marginBottom: 14,
                                    marginTop: 15,
                                }}
                            >
                                <Text style={[GlobalStyle.CustomFontRegular, styles.text_result]}>
                                    {checkLanguageConst('Дата', auth.translations)}: {dateToString(result?.date_end)}
                                </Text>
                                <Text style={[GlobalStyle.CustomFontRegular, styles.text_result]}>
                                    {checkLanguageConst('Количество набранных баллов', auth.translations)}: {result?.result?.balls}
                                </Text>
                                <Text style={[GlobalStyle.CustomFontRegular, styles.text_result]}>
                                    {`${checkLanguageConst('Ваш результат', auth.translations)}: ${checkLanguage(result?.result?.description, auth.language)}`}
                                </Text>
                            </View>
                            <View style={activeIndex?.indexOf(index_r) !== -1 ? styles.item_block_active : styles.item_block}>
                                <TouchableOpacity
                                style={[styles.item_button]}
                                onPress={() => viewHandler(index_r)}
                                >
                                    <Text style={[activeIndex?.indexOf(index_r) !== -1 ? GlobalStyle.CustomFontBold : GlobalStyle.CustomFontMedium, styles.item_name]}>
                                        {checkLanguageConst('Ваши ответы', auth.translations)}
                                    </Text>
                                    <GlobalSvgSelector id={activeIndex?.indexOf(index_r) !== -1 ? 'arrow_bottom' : 'arrow_top'} />
                                </TouchableOpacity>
                                {activeIndex?.indexOf(index_r) !== -1 ? result?.data?.map((item, index) => (
                                    <>
                                    <Text style={[GlobalStyle.CustomFontRegular, styles.item_text]}>
                                        {`Вопрос ${index + 1}. ${checkLanguage(item.question, auth.language)}`}
                                    </Text> 
                                    <Text style={[GlobalStyle.CustomFontRegular, styles.item_text]}>
                                        {`Ответ ${index + 1}. ${item.answer?.answer ? item.answer?.answer : '-'}`}
                                    </Text> 
                                    </>
                                )): null}
                            </View> 
                            </>
                            ))}
                            <View style={{width: '100%', height: 100}} />
                        </ScrollView>
                    )}
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </ImageBackground>
    )
}

export default ResultTestScreen;
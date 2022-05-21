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
import { PopapContext } from '../../../context/PopapContext';
import { DataContext } from '../../../context/DataContext';
import { httpServer } from '../../../../const';
import { GlobalSvgSelector } from '../../../assets/GlobalSvgSelector';


function QuestionTestScreen ({ navigation, route }) {
    const {data_root, number, data_user_test} = route.params;
    const dataRoot = useContext(DataContext);
    const auth = useContext(AuthContext);
    const popapRoot = useContext(PopapContext);
    const {loading, request, error, clearError} = useHttp();
    const [loader, setLoader] = useState(false);
    const [question_data, set_question_data] = useState(null);
    const [answer_question, set_answer_question] = useState(null);
    const [status_next, set_status_next] = useState(true);
    const [status_prev, set_status_prev] = useState(false);
    const [curent_number, set_curent_number] = useState(0);
    const [curent_answer, set_curent_answer] = useState(null);
    const [status_ok_answer, set_status_ok_answer] = useState(false);

    const backHandler = () => {
        dataRoot.updateHandler();
        navigation.navigate('Tests');
        // navigation.goBack();
    }

    const getData = async (number) => {
        setLoader(true);
        set_curent_number(number);
        try {
            const data = await request(`/api/data/get_question_test/${data_root._id}/${data_user_test._id}/${number}`, 'GET', null, {
                Authorization: `${auth.token}`
            });
            set_question_data(data.question_data);
            set_answer_question(data.answer_question);
            set_status_next(data.question_data.length_questions - 1 > number);
            set_status_prev(number !== 0);
            set_status_ok_answer(data.question_data?.answers?.findIndex((item) => item.is_status === true) !== -1)
        } catch (e) {
            console.log('err-', e)
        }
        set_curent_answer(null);
        setLoader(false);
    };

    useEffect(() => {
        getData(number);
    }, []);

    const menuQuestionsHandler = (status) => {
        if (status === 'next') getData(curent_number + 1);
        if (status === 'prev') getData(curent_number - 1);
    }

    const answerHandler = (data) => {
        if (!answer_question) set_curent_answer(data);
    }

    const replyHandler = async () => {
        if (answer_question) return null;
        try {
            const data = await request(`/api/data/answer_question_test`, 'POST', {
                "id": data_root._id,
                "number": curent_number,
                "answer": curent_answer,
                "user_test_id": data_user_test._id,
            }, {
                Authorization: `${auth.token}`
            });
            set_answer_question(data);
        } catch (e) {
            console.log('err-', e)
        }
    }
    
    const completeHandler = async (status_ans) => {
        setLoader(true);
        try {
            const data = await request(`/api/data/complete_test`, 'POST', {
                "id": data_root._id,
                "user_test_id": data_user_test._id,
                "status_return": status_ans ? true : false
            }, {
                Authorization: `${auth.token}`
            });
            if (data.status) {
                // Перекидываем на результат
                navigation.navigate({name: "ResultTest", params: {user_test_id: data_user_test._id, test_id: data_root._id}});
            } else {
                // Попа с подтверждением
                popapRoot.dataChange(DataPopap(checkLanguageConst('Вы ответили не на все вопросы, хотите ли вы перейти к результату теста?', auth.translations)));
                popapRoot.openHandler();
                setLoader(false);
            }
            // set_answer_question(data);
        } catch (e) {
            console.log('err-', e)
        }
        setLoader(false);
    }

    const DataPopap = (label) =>(
        <View style={styles.block_dalate}>
            <Text style={[GlobalStyle.CustomFontRegular, styles.label]}>{label}</Text>

            <TouchableOpacity
            style={styles.button_dalete}
            onPress={() => {popapRoot.exitHandler(); completeHandler(true)}}
            >
                <Text style={[GlobalStyle.CustomFontRegular, styles.item_text]}>
                    {(auth.translations && auth.translations['Да']) ? auth.translations['Да'] : 'Да'}
                </Text>
            </TouchableOpacity>
        </View>
    );

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
                                    {checkLanguage(question_data?.label, auth.language).toUpperCase()}
                                </Text>
                                <ImageBackground
                                    source={{uri: httpServer + '/' + question_data?.img}}
                                    style={{width: '100%', height: 160, alignItems: 'center', borderRadius: 16,}}
                                    imageStyle={{ borderRadius: 16, }}
                                >
                                    <Text style={[GlobalStyle.CustomFontMedium, styles.curent_number]}>
                                        {`${curent_number + 1} / ${question_data?.length_questions}`}
                                    </Text>
                                </ImageBackground>
                                <View style={styles.block_text}>
                                    <Text style={[GlobalStyle.CustomFontMedium, styles.block_text_text]}>
                                        {checkLanguage(question_data?.question, auth.language)}
                                    </Text>
                                </View>

                                <View style={styles.block_answers}>
                                    {
                                        status_ok_answer ? 
                                        question_data?.answers?.map((item, index) => (
                                            <TouchableOpacity
                                                style={
                                                    (answer_question && answer_question.answer === item.label) ? 
                                                    (answer_question.status ? 
                                                        styles.button_answer_ok : 
                                                        styles.button_answer_error
                                                    ) : 
                                                    (curent_answer?.label === item?.label ? 
                                                        styles.button_answer_current : 
                                                        styles.button_answer
                                                    )
                                                }
                                                onPress={() => answerHandler(item)}
                                            >
                                                <Text 
                                                    style={[
                                                        (answer_question && answer_question.answer === item.label) ? 
                                                        {
                                                            ...GlobalStyle.CustomFontBold,
                                                            color: '#FFFFFF',
                                                        } : 
                                                        (curent_answer?.label === item?.label ? 
                                                            {
                                                                ...GlobalStyle.CustomFontBold,
                                                                color: '#000000',
                                                            }
                                                            : 
                                                            {
                                                                ...GlobalStyle.CustomFontMedium,
                                                                color: '#000000',
                                                            }
                                                        )  
                                                    ]}
                                                >
                                                    {item?.label}
                                                </Text>
                                            </TouchableOpacity>
                                        ))
                                        : question_data?.answers?.map((item, index) => (
                                            <TouchableOpacity
                                                style={
                                                    ((answer_question && answer_question.answer === item.label) || curent_answer?.label === item?.label)
                                                    ? styles.button_answer_current 
                                                    : styles.button_answer
                                                }
                                                onPress={() => answerHandler(item)}
                                            >
                                                <Text style={[GlobalStyle.CustomFontMedium, styles.button_answer_text]}>
                                                    {item?.label}
                                                </Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </View>
                            </ScrollView>
                        )}
                    </View>
                    <View style={{height: 50, width: '100%'}} />
                    <View style={styles.block_futer}>
                        <TouchableOpacity
                            style={styles.button_trev}
                            onPress={() => {status_prev ? menuQuestionsHandler('prev') : backHandler()}}
                        >
                            <View style={styles.wrapper_bl}>
                                <GlobalSvgSelector id="arrow_left_t" />
                                <Text style={[GlobalStyle.CustomFontRegular, styles.button_menu_item]}>
                                    {checkLanguageConst('Назад', auth.translations)}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        {!status_ok_answer ? (
                            <TouchableOpacity
                                style={answer_question ? styles.button_ok_def : styles.button_ok}
                                onPress={() => replyHandler()}
                            >
                                <View style={styles.border_button}>
                                    <Text style={[GlobalStyle.CustomFontRegular, styles.button_ok_text]}>
                                        {checkLanguageConst('Ответить', auth.translations)}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={answer_question ? (
                                    answer_question.status ? styles.button_ok_ok : styles.button_ok_error
                                ) : styles.button_ok}
                                onPress={() => replyHandler()}
                            >
                                <View style={answer_question ? styles.border_button_ans : styles.border_button}>
                                    <Text 
                                        style={[answer_question ? {
                                            ...GlobalStyle.CustomFontMedium, 
                                            ...styles.button_ok_text_ans
                                        } : {
                                            ...GlobalStyle.CustomFontRegular, 
                                            ...styles.button_ok_text
                                        }]}
                                    >{}
                                        {answer_question ? (answer_question.status ? checkLanguageConst('Верно', auth.translations) : checkLanguageConst('Не верно', auth.translations)) : checkLanguageConst('Ответить', auth.translations)}
                                        
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        {status_next ? (
                            <TouchableOpacity
                                style={styles.button_trev}
                                onPress={() => menuQuestionsHandler('next')}
                            >
                                <View style={styles.wrapper_bl}>
                                    <GlobalSvgSelector id="arrow_rigth_t" />
                                    <Text style={[GlobalStyle.CustomFontRegular, styles.button_menu_item]}>
                                        {checkLanguageConst('Вперед', auth.translations)}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={styles.button_trev}
                                onPress={() => completeHandler()}
                            >
                                <Text style={[GlobalStyle.CustomFontRegular, styles.button_return_text]}>
                                    {checkLanguageConst('Завершить', auth.translations)}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </ImageBackground>
    )
}

export default QuestionTestScreen;
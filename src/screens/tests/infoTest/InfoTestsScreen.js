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


function InfoTestsScreen ({ navigation, route }) {
    const {data_root} = route.params;
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState(false);

    const backHandler = () => {
        navigation.goBack();
    }

    const startTestHandler = async () => {
        setLoader(true);
        try {
            const data = await request(`/api/data/start_test`, 'POST', {
                _id: data_root._id
            }, {
                Authorization: `${auth.token}`
            });
            setData(data);
            if (data.status) {
                navigation.navigate({
                    name: "QuestionTest", 
                    params: {
                        data_root: data_root, 
                        number: 0, 
                        data_user_test: data.data_user_test
                    }
                });
            }
        } catch (e) {
            console.log('err-', e)
        }
        setLoader(false);
    }

    // console.log('333333333')

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
                                {checkLanguage(data_root?.label, auth.language)}
                            </Text>
                            {/* <Text style={[GlobalStyle.CustomFontBold, styles.label_two]}>
                                {checkLanguageConst('Инструкции:', auth.translations)}
                            </Text> */}
                            <View 
                                style={{
                                    width: '100%', 
                                    paddingHorizontal: 16, 
                                    paddingVertical: 12,
                                    borderRadius: 12, 
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                    marginBottom: 20,
                                    marginTop: 15,
                                }}
                            >
                                <Text style={[GlobalStyle.CustomFontRegular, styles.instruction]}>
                                    {checkLanguage(data_root?.instruction, auth.language)}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.button_start_test}
                                onPress={() => startTestHandler()}
                            >
                                <Text style={[GlobalStyle.CustomFontRegular, styles.button_start_test_text]}>
                                    {checkLanguageConst('Начать тест', auth.translations)}
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
                    )}
                    </View>
                    <View style={{height: 50, width: '100%'}} />
                </SafeAreaView>
            </ImageBackground>
        </ImageBackground>
    )
}

export default InfoTestsScreen;
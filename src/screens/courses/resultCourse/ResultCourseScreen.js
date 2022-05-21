import React, {useContext, useEffect, useState} from 'react';
import {
    Text,
    View,
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


function ResultCourseScreen ({ navigation, route }) {
    const {user_course, data_root} = route.params;
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState(false);
    const dataRoot = useContext(DataContext);
    const [activeIndex, setActiveIndex] = useState(true);

    const backHandler = () => {
        dataRoot.updateHandler();
        navigation.navigate('Courses');
    }
 
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
                <HeaderDop data={{label: checkLanguageConst('Курсы', auth.translations), backHandler, back_text: "Все курсы"}}/>
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
                            <Text style={[GlobalStyle.CustomFontBold, styles.label_two]}>
                                {checkLanguageConst('Инструкции:', auth.translations)}
                            </Text>
                            <View 
                                style={{
                                    width: '100%', 
                                    paddingHorizontal: 6, 
                                    paddingVertical: 4,
                                    borderRadius: 12, 
                                    backgroundColor: '#FFFFFF',
                                    marginBottom: 14,
                                }}
                            >
                                <Text style={[GlobalStyle.CustomFontRegular, styles.text_result]}>
                                    {checkLanguage(user_course?.result_description, auth.language)}
                                </Text>
                            </View>
                        </ScrollView>
                    )}
                    </View>
                    <View style={{height: 50, width: '100%'}} />
                </SafeAreaView>
            </ImageBackground>
        </ImageBackground>
    )
}

export default ResultCourseScreen;
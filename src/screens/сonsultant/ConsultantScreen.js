import React, {useContext, useState} from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {AuthContext} from "../../context/authContext";
import {useHttp} from "../../hooks/http.hook";
import {styles} from "./useStyles";
import GlobalStyle from "../../components/GlobalStyle";
import { GlobalSvgSelector } from '../../assets/GlobalSvgSelector';
import {HeaderRoot} from "../../components/headerRoot/HeaderRoot";
import { ColorsStyles } from '../../constants/ColorsStyles';


const data_list = [
    {
        label: 'Зачем мне это приложение?',
        text: 'Текст текст текст текст3 текст текст текст текст текст текст0 текст текст текст текст ',
    },
    {
        label: 'Как работает приложение?',
        text: 'Текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст ',
    },
    {
        label: 'Как часто слушать музыку?',
        text: 'Текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст ',
    },
    {
        label: 'Индивидуальный подбор плейлистов',
        text: 'Текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст ',
    },
    {
        label: 'Связь с нами',
        text: 'Текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст ',
    },
];

function ConsultantScreen ({ navigation }) {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [activeIndex, setActiveIndex] = useState(-1);

    const itemHandler = (index) => {
        if (index === activeIndex) setActiveIndex(-1);
        else setActiveIndex(index);
    }

    return (
        <ImageBackground
            source={require('../../assets/images/background.jpg')}
            style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}
        >
            <View style={{width: '100%', height: 50, backgroundColor: ColorsStyles.backgroundFooter, position: 'absolute', top: 0,}}/>
            <SafeAreaView
                style={{width: '100%', height: '100%', alignItems: 'center'}}
            > 
                <HeaderRoot data={{label: 'КОНСУЛЬТАНТ'}}/>
                <View style={styles.block}>
                <FlatList
                style={{width: '100%', height: '95%'}}
                contentContainerStyle={{paddingBottom: 100}}
                showsVerticalScrollIndicator={false}
                data={data_list}
                renderItem={({item, index}) => (
                    <>
                    {index === 0 ? (<Text style={[GlobalStyle.CustomFontRegular, styles.label]}>
                        Музыкотерапия - это эффуктивная методика коррекции 
                        психо- эмоционального состояния. Рекомендуем использовать 
                        приложение минимум 15 минут в день в течении 90 дней для 
                        стабильного эффекта
                    </Text>): null}
                        <View style={activeIndex === index ? styles.item_block_active : styles.item_block}>
                            <TouchableOpacity
                            style={[styles.item_button]}
                            onPress={() => itemHandler(index)}
                            >
                                <Text style={[activeIndex === index ? GlobalStyle.CustomFontBold : GlobalStyle.CustomFontMedium, styles.item_name]}>
                                    {item.label}
                                </Text>
                                <View style={[styles.icon_arrow]}>
                                <GlobalSvgSelector id={activeIndex === index ? 'arrow_bottom' : 'arrow_top'} />
                                </View>
                            </TouchableOpacity>
                            {activeIndex === index ? (
                            <ScrollView
                            style={styles.item_scroll}
                            >
                                <Text style={[GlobalStyle.CustomFontRegular, styles.item_text]}>
                                    {item.text}
                                </Text> 
                            </ScrollView>
                            ): null}
                        </View> 
                    </>
                    )}/>
                </View>
                <View style={styles.footer}> 
                    <Text style={[GlobalStyle.CustomFontRegular, styles.button_footer_text]}>
                    © www.MusicTherapy.by
                    </Text>
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default ConsultantScreen;
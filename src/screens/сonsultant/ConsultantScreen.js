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
        text: `Приложение «Музыкотерапия» станет важным шагом на пути к себе, к гармоничной и наполненной жизни, привнесёт в ваши дни больше расслабленности, наслаждения и новых смыслов!

Благодаря приложению вы сможете перезагрузиться, снять напряжение, а также получить заряд позитивных мыслей и эмоций под специально подобранную музыку.`,
    },
    {
        label: 'Как работает приложение?',
        text: `В приложении доступны 3 раздела: «Медитации», «Классика HD», «Живой звук». 
        
        •	«Медитации» – синтез музыки, звуков природы, психологических установок и природных пейзажей для вхождения в состояния радости, легкости и уверенности, а также улучшения собственного самочувствия.
        •	«Классика HD» – учеными не раз был доказан положительный эффект, который оказывает прослушивание классической музыки на состояние и здоровье человека. Шедевры популярной классической музыки в сочетании с медиаэффектами отправят вас в путешествие в ваш внутренний мир, привнесут состоянии гармонии и полноты в вашу жизнь.
        •	«Живой звук» – информация о «живых» программах музыкотерапии, на которых вы сможете ощутить на себе воздействие акустического звука со всеми его целительными обертонами в сочетании классики и звукотерапевтических инструментов – тибетских поющих чаш, колокольчиков Коши, чакрофонов, звуков природы и других!

Сочетание всех этих трех вариаций благотворно влияет на весь организм: как на психику, так и на физику человека, увеличивает эффект в несколько раз. `,
    },
    {
        label: 'Как часто слушать музыку?',
        text: `Рекомендуем слушать музыку минимум 15 минут на протяжении 90 дней. Так удастся достичь стабильного эффекта. Но если ваше время ограничено, даже 5 минут использования приложения в день могут качественно поменять ваше состояние и самочувствие.`,
    },
    {
        label: 'Индивидуальный подбор плейлистов',
        text: `Данная функция пока недоступна.`,
    },
    {
        label: 'Связь с нами',
        text: `Для связи с нами вы можете писать на нашу почту info@musictherapy.by.
Еще больше актуальной информации о нашем проекте в нашем Instagram https://www.instagram.com/music.therapy.by/.`,
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
                        Музыкотерапия - это эффективная методика коррекции 
                        психо- эмоционального состояния. Рекомендуем использовать 
                        приложение минимум 15 минут в день в течение 90 дней для 
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
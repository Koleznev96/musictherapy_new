import React, {useContext, useEffect, useState} from 'react';
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    ImageBackground,
    ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {AuthContext} from "../../context/authContext";
import {useHttp} from "../../hooks/http.hook";
import {styles} from "./useStyles";
import GlobalStyle from "../../components/GlobalStyle";
import {HeaderRoot} from "../../components/headerRoot/HeaderRoot";
import { ColorsStyles } from '../../constants/ColorsStyles';
import { checkLanguage, checkLanguageConst } from '../../hooks/useLanguage';
import { ButtonFull } from '../../components/buttonFull/ButtonFull';


const filter_data = [
    {
        label: 'Чего хотелось бы?',
        value: 'goal',
        function_name: 'bool',
        list: [
            {
                label: 'Релакс, снятие напряжения / стресса / тревожности, глубокий отдых',
                value: 1
            },
            {
                label: 'Активация, поднятие энергетики',
                value: 2
            },
            {
                label: 'Уменьшение боли, анальгетик во время/после операций, при болезненных состояниях',
                value: 3
            },
            {
                label: 'Снижение агрессии',
                value: 4
            },
            {
                label: 'Развитие',
                value: 5
            },
        ]
    },
    {
        label: 'Какие инструменты хотите включить?',
        value: 'instruments',
        function_name: 'box',
        list: [{label: 'Рояль', value: 'Рояль'}, {label: 'Флейта', value: 'Флейта'}, {label: 'Виолончель', value: 'Виолончель'}, {label: 'Скрипка', value: 'Скрипка'},
        {label: 'Вокал', value: 'Вокал'}, {label: 'Арфа', value: 'Арфа'}, {label: 'Клавесин', value: 'Клавесин'}, {label: 'Орган', value: 'Орган'},
        {label: 'Гонг', value: 'Гонг'}, {label: 'Тибетские поющие чаши', value: 'Тибетские поющие чаши'}, {label: 'Караталы', value: 'Караталы'}, {label: 'Чакрофоны', value: 'Чакрофоны'},
        {label: 'Шум дождя', value: 'Шум дождя'}, {label: 'Шум ручья', value: 'Шум ручья'}, {label: 'Шум океана', value: 'Шум океана'}, {label: 'Калимба', value: 'Калимба'},
        {label: 'Глюкофон', value: 'Глюкофон'}, {label: 'Барчаймс', value: 'Барчаймс'}, {label: 'Колокольчики Коши', value: 'Колокольчики Коши'}, {label: 'Колокольчики Нада', value: 'Колокольчики Нада'},
        {label: 'Валдайские колокольчики', value: 'Валдайские колокольчики'}, {label: 'Этническая погремушка', value: 'Этническая погремушка'}, {label: 'Гитара', value: 'Гитара'}, {label: 'Контрабас', value: 'Контрабас'}]
    }
]


function ConstructorScreen ({ navigation, route }) {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [data, setData] = useState({goal: 0, instruments: []});

    const backHandler = () => {
        navigation.goBack();
    }

    const individualPlaylist = () => {
        navigation.navigate({name: 'IndividualPlaylist', params: {data_root: data}});
    }

    const boolEditData = (name, value) => {
        setData({...data, [name]: value});
    }

    const boxEditData = (name, value) => {
        let new_data = {...data};
        if (!new_data[name]) {
            new_data[name] = [];
        }
        const remove_index = new_data[name].findIndex(item => item === value);
        if (remove_index !== -1) {
            new_data[name].splice(remove_index, 1);
        } else {
            new_data[name].push(value);
        }
        setData({...new_data});
    }

    const editData = (function_name, name, value, index) => {
        switch (function_name) {
            case 'bool':
                boolEditData(name, index);
                return null;
            case 'box':
                boxEditData(name, value);
                return null;
            default:
                return null;
        }
    }

    const FieldFunction = (function_name, name, value, data, index) => {
        switch (function_name) {
            case 'bool':
                return (
                    <View style={data[name] === index ? styles.bool_clip_active : styles.bool_clip}/>
                );
            case 'box':
                return (
                    <View style={data[name].indexOf(value) !== -1 ? styles.box_clip_active : styles.box_clip}/>
                );
            default:
                return null;
        }
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
                <HeaderRoot data={{label: checkLanguageConst('Конструктор', auth.translations), backHandler}}/>
                <ScrollView 
                    style={styles.scroll} 
                    keyboardShouldPersistTaps='handled' 
                    showsVerticalScrollIndicator={false} 
                    contentContainerStyle={styles.scrollView}
                > 
                    <View style={styles.block}>
                        {filter_data?.map((item, index) => (
                            <View key={index} style={{width: '100%'}}>
                                <Text style={[GlobalStyle.CustomFontRegular, styles.label]}>
                                    {item.label}
                                </Text>
                                {item?.list?.map((list_item, list_index) => (
                                    <TouchableOpacity
                                        style={styles.button_filter}
                                        onPress={() => editData(item.function_name, item.value, list_item.value, list_index + 1)}
                                        key={list_index}
                                    >
                                        {FieldFunction(item.function_name, item.value, list_item.value, data, list_index + 1)}
                                        <Text style={[GlobalStyle.CustomFontRegular, styles.value]}>
                                            {list_item.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ))}
                    </View>
                </ScrollView>

                <View style={{height: 60, width: '100%'}} />
                <View style={styles.futter_plyer}>
                    <ButtonFull data={{value: checkLanguageConst('Сформировать плейлист', auth.translations), change: individualPlaylist}} />
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default ConstructorScreen;
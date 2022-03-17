import React, {useState} from 'react';
import {
    Text,
    View,
    Pressable,
    Platform
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../../GlobalStyle";
import DateTimePicker from '@react-native-community/datetimepicker';


export const DateFull = ({ label, name, change, value, styles_new, error, translations }) => {
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || new Date();
        setShow(Platform.OS === 'ios');
        change({name, value: currentDate.toString()})
    };
    
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    
    const showDatepicker = () => {
        showMode('date');
    };

    const stringDate = (date) => {
        date = new Date(date);
        const year = date.getFullYear().toString();
        const month = (Number(date.getMonth()) + 1).toString().length <= 1 ? '0' + (Number(date.getMonth()) + 1).toString() : (Number(date.getMonth()) + 1).toString();
        const day = date.getDate().toString().length <= 1 ? '0' + date.getDate().toString() : date.getDate().toString();

        return `${day}-${month}-${year}`;
    }

    return (
        <View style={styles.block}>
        <Text style={[GlobalStyle.CustomFontLite, styles.label]}>
            {(translations && translations[label]) ? translations[label] : label}
        </Text>
        <Pressable 
        style={[styles.input, styles_new ? styles_new : null ]} 
        onPress={() => showDatepicker()}
        >
            <Text style={[GlobalStyle.CustomFontRegular, styles.value]}>
                {value ? stringDate(value) : ''}
            </Text>
            {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={value ? (value.length ? new Date(value) : new Date()): new Date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                />
            )}
        </Pressable>
        {error?.length ? <Text style={[GlobalStyle.CustomFontLite, styles.error_text]}>
                {error}
        </Text> : null}
        </View>
    );
}


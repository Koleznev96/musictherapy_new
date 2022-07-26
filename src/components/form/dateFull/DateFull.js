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
import DateTimePickerModal from "react-native-modal-datetime-picker";


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
        console.log('aaaaaddd')
        showMode('date');
    };

    const stringDate = (date) => {
        date = new Date(date);
        const year = date.getFullYear().toString();
        const month = (Number(date.getMonth()) + 1).toString().length <= 1 ? '0' + (Number(date.getMonth()) + 1).toString() : (Number(date.getMonth()) + 1).toString();
        const day = date.getDate().toString().length <= 1 ? '0' + date.getDate().toString() : date.getDate().toString();

        return `${day}-${month}-${year}`;
    }

    const hideDatePicker = () => {
        setShow(false);
    };
    
    const handleConfirm = (date) => {
        change({name, value: date.toString()})
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };

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
            <DateTimePickerModal
                isVisible={show}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            {/* {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={value ? (value.length ? new Date(value) : new Date()): new Date}
                mode={mode}
                is24Hour={true}
                // display="default"
                onChange={onChange}
                style={{justifyContent: 'center',
                alignItems: 'flex-start',
                width: 320,
                height: 260,
                display: 'flex',}}
                // style={{position: 'absolute', zIndex: 4000}}

                // mode={'date'}
                // display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                />
            )} */}
        </Pressable>
        {error?.length ? <Text style={[GlobalStyle.CustomFontLite, styles.error_text]}>
                {error}
        </Text> : null}
        </View>
    );
}


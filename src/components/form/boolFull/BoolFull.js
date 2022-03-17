import React, {useContext, useCallback, useEffect, useState} from 'react';
import {
    Text,
    View,
    Image,
    Pressable,
    TextInput
} from 'react-native';
import {AuthContext} from "../../../context/authContext";
import {useHttp} from "../../../hooks/http.hook";
import {styles} from "./useStyles";
import GlobalStyle from "../../GlobalStyle";
import {Colors} from "../../../utils/Colors";


export const BoolFull = ({ label, name, change, value, styles_new, error, list_value, translations }) => {
    return (
        <View style={styles.block}>
        <Text style={[GlobalStyle.CustomFontLite, styles.label]}>
        {(translations && translations[label]) ? translations[label] : label}
        </Text>
        <View style={styles.root_click}>
            {list_value?.map((item, index) => (
                <Pressable style={styles.button_input} onPress={() => change({name, value: item.value})}>
                    <View style={value === item.value ? styles.clip_active : styles.clip}/>
                    <Text style={[GlobalStyle.CustomFontLite, styles.clip_text]}>
                    {(translations && translations[item.label]) ? translations[item.label] : item.label}
                    </Text>
                </Pressable>
            ))}
        </View>
        {error?.length ? <Text style={[GlobalStyle.CustomFontLite, styles.error_text]}>
                {error}
        </Text> : null}
        </View>
    );
}


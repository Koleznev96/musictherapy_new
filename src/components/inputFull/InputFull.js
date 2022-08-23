import React, {useContext, useCallback, useEffect, useState} from 'react';
import {
    Text,
    View,
    Image,
    Pressable,
    TextInput
} from 'react-native';
import {AuthContext} from "../../context/authContext";
import {useHttp} from "../../hooks/http.hook";
import {styles} from "./useStyles";
import GlobalStyle from "../GlobalStyle";
import {Colors} from "../../utils/Colors";
import { checkLanguageConst } from '../../hooks/useLanguage';


export const InputFull = ({ data, translations }) => {
    return (
        <>
        <TextInput 
        onFocus={() => data?.onFocus ? data.onFocus(data.valueFocus) : false}
        secureTextEntry={data.secret ? true : false} 
        value={data.value} 
        placeholderTextColor={'#F3F3F3'} 
        style={[styles.input, data?.styles ? data.styles : null ]} 
        placeholder={data.placeholder} 
        onChangeText={(value) => data.change(value)} 
        secureTextEntry={data.secret}
        />
        {data.error?.length ? <Text style={[GlobalStyle.CustomFontLite, styles.error_text]}>
                {/* {data.error} */}
                {checkLanguageConst(data.error, translations)}
        </Text> : null}
        </>
    );
}


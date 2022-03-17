import React, {useContext, useCallback, useEffect, useState} from 'react';
import {
    Text,
    View,
    Image,
    Pressable,
    TextInput
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../../GlobalStyle";


export const InputForm = ({label, name, change, value, styles_new, error, translations}) => {
    return (
        <View style={styles.block}>
        <Text style={[GlobalStyle.CustomFontLite, styles.label]}>
        {(translations && translations[label]) ? translations[label] : label}
        </Text>
        <TextInput 
        value={value} 
        placeholderTextColor={'#F3F3F3'} 
        style={[styles.input, styles_new ? styles_new : null ]} 
        // placeholder={label} 
        onChangeText={(value) => change({name, value})} 
        />
        {error?.length ? <Text style={[GlobalStyle.CustomFontLite, styles.error_text]}>
                {error}
        </Text> : null}
        </View>
    );
}


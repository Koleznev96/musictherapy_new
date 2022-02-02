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


export const TextFull = ({ data }) => {
    return (
        <View style={styles.block}>
            <Text style={[GlobalStyle.CustomFontRegular, styles.value]}>
                {data.value}
            </Text>
        </View>
    );
}


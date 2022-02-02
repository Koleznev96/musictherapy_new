import React from 'react';
import {
    Text,
    View,
    Image,
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../GlobalStyle";
import { GlobalSvgSelector } from '../../assets/GlobalSvgSelector';


export const HeaderRoot = ({ data }) => {
    return (
        <View style={styles.body}>
            <View style={styles.block}>
            <Image source={require('../../assets/images/logo-min.png')} style={styles.logo}/>
                
            <Text style={[GlobalStyle.CustomFontBold, styles.text_glav]}>
                {data?.label}
            </Text>
            </View>
        </View>
    );
}


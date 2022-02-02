import React from 'react';
import {
    Text,
    View,
    Image,
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../GlobalStyle";
import { GlobalSvgSelector } from '../../assets/GlobalSvgSelector';


export const HeaderAuth = () => {
    return (
        <View style={styles.body}>
            <View style={styles.block}>
            <Image source={require('../../assets/images/logo.png')} style={styles.logo}/>
                
            <Text style={[GlobalStyle.BellotaFontBold, styles.text_glav]}>
                Музыкотерапия
            </Text>
            </View>
        </View>
    );
}


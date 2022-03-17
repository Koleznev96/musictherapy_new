import React, {useContext} from 'react';
import {
    Text,
    View,
    Image,
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../GlobalStyle";
import { GlobalSvgSelector } from '../../assets/GlobalSvgSelector';
import {AuthContext} from "../../context/authContext";


export const HeaderAuth = () => {
    const auth = useContext(AuthContext);
    return (
        <View style={styles.body}>
            <View style={styles.block}>
            <Image source={require('../../assets/images/logo.png')} style={styles.logo}/>
                
            <Text style={[GlobalStyle.BellotaFontBold, styles.text_glav]}>
                {(auth.translations && auth.translations['Музыкотерапия']) ? auth.translations['Музыкотерапия'] : 'МУЗЫКОТЕРАПИЯ'}
            </Text>
            </View>
        </View>
    );
}


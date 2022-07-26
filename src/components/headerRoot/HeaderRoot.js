import React, { useContext } from 'react';
import {
    Text,
    View,
    Image,
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../GlobalStyle";
import { GlobalSvgSelector } from '../../assets/GlobalSvgSelector';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../../context/authContext';
import { checkLanguageConst } from '../../hooks/useLanguage';


export const HeaderRoot = ({ data }) => {
    const auth = useContext(AuthContext);
    return (
        <View style={styles.body}>
            <View style={styles.block}>
            <Image source={require('../../assets/images/logo-min.png')} style={styles.logo}/>
                
            <Text style={[GlobalStyle.CustomFontBold, styles.text_glav]}>
                {data?.label?.toUpperCase()}
            </Text>
            </View>
            {data?.backHandler && <TouchableOpacity
            style={styles.back_button}
            onPress={() => data?.backHandler()}
            >
                <Text style={[GlobalStyle.CustomFontRegular, styles.back_button_text]}>
                    {checkLanguageConst('Назад', auth.translations)} 
                </Text>
            </TouchableOpacity>}
        </View>
    );
}


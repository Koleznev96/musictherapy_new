import React, {useContext} from 'react';
import {
    View, 
    Text, 
    Image,
    ImageBackground
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../GlobalStyle";
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../context/authContext';
import { checkLanguageConst } from '../../hooks/useLanguage';

export const Loader = () => {
    const auth = useContext(AuthContext);
    return (
        <ImageBackground
            source={require('../../assets/images/background.jpg')}
            style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', justifyContent: 'space-between' }}
        > 
            <ImageBackground
                source={require('../../assets/images/background-logo.png')}
                style={{width: '100%', height: '90%', marginTop: '15%', alignItems: 'center'}}
            > 
                <SafeAreaView
                    style={{width: '100%', height: '100%', alignItems: 'center'}}
                >
                    <View style={styles.block}>
                        <Image source={require('../../assets/images/logo.png')} style={styles.logo}/>
                    </View>
                    <Text 
                        // numberOfLines={1}
                        // abjustsFontSizeToFit={true} // подбирает размер текста до того, как все содержимое будет влезать в область
                        style={[GlobalStyle.BellotaFontRegular, styles.text_glav]}
                    >
                        {checkLanguageConst('Музыкотерапия', auth.translations)} 
                    </Text>
                    <Text style={[GlobalStyle.BellotaFontRegular, styles.text_foot]}>
                        {checkLanguageConst('Гармония и совершенство', auth.translations)} 
                    </Text>
                </SafeAreaView>
            </ImageBackground>
        </ImageBackground>
    );
}



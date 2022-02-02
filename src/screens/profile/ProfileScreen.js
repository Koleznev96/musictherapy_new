import React, {useContext, useEffect, useState} from 'react';
import {
    Text,
    View,
    ScrollView,
    ImageBackground,
    RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {AuthContext} from "../../context/authContext";
import {useHttp} from "../../hooks/http.hook";
import {styles} from "./useStyles";
import GlobalStyle from "../../components/GlobalStyle";
import {HeaderRoot} from "../../components/headerRoot/HeaderRoot";
import { ButtonFull } from '../../components/buttonFull/ButtonFull';
import {TextFull} from '../../components/textFull/TextFull';
import { ColorsStyles } from '../../constants/ColorsStyles';
import { LoaderIn } from '../../components/loader/minLoader/LoaderIn';

function ProfileScreen ({ navigation }) {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [Refreshing, setRefreshing] = useState(false);
    const [name, setName] = useState('');
    const [fullName, setFullName] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');

    const getProfile = async () => {
        try {
            const data = await request(`/api/profile/data`, 'GET', null, {
                Authorization: `${auth.token}`
            });

            setName(data.name);
            setFullName(data.fullName);
            setTelephone(data.telephone);
            setEmail(data.email);
        } catch (e) {}
    };

    useEffect(() => {
        getProfile();
    }, [auth.token]);

    const logoutHandler = () => {
        auth.logout();
    }
        

    return (
        <ImageBackground
            source={require('../../assets/images/background.jpg')}
            style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}
        > 
            <View style={{width: '100%', height: 50, backgroundColor: ColorsStyles.backgroundFooter, position: 'absolute', top: 0}} />
            <SafeAreaView
            style={{width: '100%', height: '100%', alignItems: 'center'}}
            >
                <HeaderRoot data={{label: 'АККАУНТ'}}/>
                    <Text style={[GlobalStyle.CustomFontRegular, styles.text_foot]}>
                        Ваши данные
                    </Text>
                    {loading ? (
                        <LoaderIn />
                    ) : (
                    <ScrollView style={styles.scroll} 
                        keyboardShouldPersistTaps='handled' 
                        showsVerticalScrollIndicator={false} 
                        contentContainerStyle={styles.scrollView}
                        // refreshControl={
                        //     <RefreshControl
                        //         refreshing={Refreshing}
                        //         onRefresh={() => getProfile()}
                        //         colors={[ColorsStyles.colorTextError]}
                        //     />
                        // }
                    >
                        <View style={styles.block}>
                            <TextFull data={{value: name}} />
                            <TextFull data={{value: fullName}} />
                            <TextFull data={{value: telephone}} />
                            <TextFull data={{value: email}} />
                        
                            <ButtonFull data={{value: 'Выйти из аккаунта', change: logoutHandler, styles: {marginTop: 40,}}} />
                        </View>

                        <View style={{height: 50, width: '100%'}} />
                    </ScrollView>
                    )}
            </SafeAreaView>
        </ImageBackground>
    )
}

export default ProfileScreen;
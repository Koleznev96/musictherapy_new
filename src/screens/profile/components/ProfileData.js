import React, { useContext } from 'react';
import {
    Text,
    ActivityIndicator,
    TouchableOpacity,
    View
} from 'react-native';
import {styles} from "../useStyles";
import GlobalStyle from "../../../components/GlobalStyle";
import { ColorsStyles } from '../../../constants/ColorsStyles';
import { ButtonFull } from '../../../components/buttonFull/ButtonFull';
import {TextFull} from '../../../components/textFull/TextFull';
import { InputFull } from '../../../components/form/inputFull/InputFull';
import { AuthContext } from '../../../context/authContext';


export const ProfileData = ({ form, setRoot, errorField, statusNewData, saveHandler, logoutHandler }) => {
    const auth = useContext(AuthContext);
    return (
        <View style={styles.block_l}>
            <InputFull data={{value: form?.name, name: "name", change: setRoot, placeholder: (auth.translations && auth.translations['Имя']) ? auth.translations['Имя'] : 'Имя', error: errorField?.name}} />
            <InputFull data={{value: form?.fullName, name: "fullName", change: setRoot, placeholder: (auth.translations && auth.translations['Фамилия']) ? auth.translations['Фамилия'] : 'Фамилия', error: errorField?.fullName}} />
            <InputFull data={{value: form?.telephone, name: "telephone", change: setRoot, placeholder: (auth.translations && auth.translations['Телефон']) ? auth.translations['Телефон'] : 'Телефон', error: errorField?.telephone}} />
            <InputFull data={{value: form?.email, name: "email", change: setRoot, placeholder: (auth.translations && auth.translations['E-mail']) ? auth.translations['E-mail'] : 'E-mail', error: errorField?.email}} />
        
            <ButtonFull data={{value: (auth.translations && auth.translations['Сохранить изменения']) ? auth.translations['Сохранить изменения'] : 'Сохранить изменения', change: saveHandler, styles_text: {color: !statusNewData ? ColorsStyles.colorHr : '#FFF'}, styles: !statusNewData ? {marginTop: 30, backgroundColor: 'rgba(0, 0, 0, 0)', borderWidth: 1, borderColor: ColorsStyles.colorHr} : {marginTop: 40,}}} />
            <ButtonFull data={{value: (auth.translations && auth.translations['Выйти из аккаунта']) ? auth.translations['Выйти из аккаунта'] : 'Выйти из аккаунта', change: logoutHandler, styles: {marginTop: 10}}} />
        </View>   
    );
}


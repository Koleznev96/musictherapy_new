import { StyleSheet, Platform } from 'react-native';
import { ColorsStyles } from '../../constants/ColorsStyles';
import {Colors} from "../../utils/Colors";

export const styles = StyleSheet.create({
    block: {
        width: '100%',
        height: 46,
        borderRadius: 14,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        borderColor: ColorsStyles.colorButton,
        borderWidth: 1,
    },
    value: {
        color: '#fff',
        textAlign: 'center',
    },
});
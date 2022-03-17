import { StyleSheet, Platform } from 'react-native';
import { ColorsStyles } from '../../../constants/ColorsStyles';

export const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 46,
        borderRadius: 14,
        // paddingHorizontal: 10,
        // aliginItems: 'center',
        color: '#fff',
        marginTop: 4,
        // textAlign: 'center',
        borderColor: ColorsStyles.colorButton,
        borderWidth: 1,
        // paddingVertical: 20, 
        // paddingTop: 10,
        alignItems: 'center', 
        justifyContent: 'center'
    },
    value: {

    },
    error_text: {
        color: ColorsStyles.colorTextError,
        fontSize: 12,
        width: '100%',
        paddingLeft: 4,
        textAlign: 'left',
        marginTop: 4,
    },
    block: {
        marginTop: 10,
        width: '100%',
    },
    label: {
        fontSize: 14,
    },
});
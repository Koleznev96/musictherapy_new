import { StyleSheet, Platform } from 'react-native';
import { ColorsStyles } from "../../constants/ColorsStyles";

export const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 46,
        backgroundColor: ColorsStyles.colorButton,
        borderRadius: 14,
        aliginItems: 'center',
        justifyContent: 'center',
    },
    button_text: {
        width: '100%',
        textAlign: 'center',
    },
    block_loader: {
        width: '100%',
        height: 46,
        flexDirection: 'row',
        aliginItems: 'center',
        justifyContent: 'center',
    },
    loader: {
        marginTop: 3,
        width: 40,
        height: 40,
    },
});
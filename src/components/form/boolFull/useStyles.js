import { StyleSheet, Platform } from 'react-native';
import { ColorsStyles } from '../../../constants/ColorsStyles';

export const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 46,
        borderRadius: 14,
        paddingHorizontal: 20,
        aliginItems: 'center',
        color: '#fff',
        marginTop: 4,
        textAlign: 'center',
        borderColor: ColorsStyles.colorButton,
        borderWidth: 1,
        fontSize: 18,
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
        marginBottom: 4,
    },
    root_click: {
        width: '100%',
    },
    button_input: {
        flexDirection: 'row',
        marginRight: 10,
        marginTop: 2,
        alignItems: 'center',
        minHeight: 32,
    },
    clip: {
        borderWidth: 1,
        borderColor: ColorsStyles.colorButton,
        minWidth: 18,
        height: 18,
        borderRadius: 100,
        backgroundColor: '#E0E6F1',
    },
    clip_active: {
        borderWidth: 2,
        borderColor: ColorsStyles.colorButton,
        minWidth: 18,
        height: 18,
        borderRadius: 100,
        backgroundColor: ColorsStyles.colorButton,
    }, 
    clip_text: {
        fontSize: 14,
        color: '#E0E6F1',
        marginLeft: 10,
    }
});
import { StyleSheet, Platform } from 'react-native';
import { ColorsStyles } from "../../../constants/ColorsStyles";

export const styles = StyleSheet.create({
    scroll: {
        marginTop: 10,
        width: '100%',
    },
    scrollView: {
        marginTop: 10,
        alignItems: 'center',
    },
    block: {
        alignItems: 'center',
        width: '75%',
    },
    block_reset: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    button_reset_text: {
        marginLeft: 6,
        fontSize: 13,
        borderBottomWidth: 0.7,
        borderColor: '#fff',
    },
    button_reset: {
        height: 30,
        alignItems: 'center',
        flexDirection: 'row',
    },
    block_reset_text: {
        fontSize: 13,
    },
    text_foot: {
        marginTop: '20%',
        fontSize: 18,
        textAlign: 'center',
        width: 300,
    },
    buttonLog: {
        marginTop: 20, 
        width: '100%',
        height: 32,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonLog_text: {
        width: '100%',
        textAlign: 'center',
        fontSize: 14,
    },
});
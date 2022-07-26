import { StyleSheet, Platform, Dimensions } from 'react-native';
import { ColorsStyles } from "../../constants/ColorsStyles";
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
    scroll: {
        marginTop: 10,
        width: '100%',
    },
    button_audio_session: {
        width: '100%',
        backgroundColor: '#FCB900',
        borderRadius: 8,
        paddingVertical: 10,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_audio_session_text: {
        fontSize: width > 345 ? 16 : 14,
    },
    scrollView: {
        marginTop: 10,
        alignItems: 'center',
    },
    block: {
        alignItems: 'center',
        width: '90%',
    },
    item_button: {
        marginTop: 10,
        width: '100%',
        height: 150,
        borderRadius: 16,
    },
    item_name: {
        fontSize: 24,
    },
    footer_text: {
        marginTop: 15,
        fontSize: 15,
        width: '100%',
    },
    text_auth_block: {
        marginTop: 12,
        width: '100%',
        fontSize: 13.5,
        color: 'red',
        lineHeight: 20,
        // alignItems: 'center',
        // flexDirection: 'row',
    },
    text_auth_button: {
        fontSize: 13.5,
        color: 'red',
        textDecorationLine: 'underline',
    },
    button_text: {
        marginTop: 100,
        paddingTop: 10,
    },
});
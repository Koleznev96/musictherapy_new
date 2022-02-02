import { StyleSheet, Platform, Dimensions } from 'react-native';
import { ColorsStyles } from "../../../constants/ColorsStyles";

export const styles = StyleSheet.create({
    block: {
        marginTop: '20%',
        alignItems: 'center',
        width: '100%',
    },
    block_buttons: {
        alignItems: 'center',
        width: '75%',
    },
    logo: {
        width: 95,
        height: 109,
    },
    text_glav: {
        marginTop: 25,
        fontSize: Dimensions.get('window').width > 350 ? 32 : 28,
    },
    text_foot: {
        letterSpacing: 2,
        marginTop: 8,
        fontSize: 14,
        textAlign: 'center',
        width: 300,
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    hr: {
        width: 1,
        height: 15,
        backgroundColor: '#fff',
        marginLeft: 10,
        marginRight: 10,
    },
    button_footer: {
        height: 32,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button_footer_text: {
        fontSize: 12,
        letterSpacing: 1,
    },
});
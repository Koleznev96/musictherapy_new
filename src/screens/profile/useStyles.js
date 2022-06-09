import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ColorsStyles } from "../../constants/ColorsStyles";
const {width, height} = Dimensions.get('screen');


export const styles = StyleSheet.create({
    scroll: {
        marginTop: 10,
        width: '100%',
    },
    scrollView: {
        marginTop: 0,
        alignItems: 'center',
    },
    block_l: {
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 40,
        
    },
    logo: {
        width: 95,
        height: 109,
    },
    text_glav: {
        marginTop: 25,
        fontSize: 32,
    },
    text_foot: {
        marginTop: '16%',
        fontSize: 18,
        textAlign: 'center',
        width: 300,
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button_footer_text: {
        fontSize: 12,
        letterSpacing: 1,
        width: '86%',
        textAlign: 'center',
        letterSpacing: 1,
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
    

    block: {
        marginTop: '20%',
        alignItems: 'center',
        width: '100%',
    },
    block_buttons: {
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
    },
    logo: {
        width: 95,
        height: 109,
    },
    text_glav: {
        marginTop: 25,
        fontSize: width > 340 ? 32 : (width > 300 ? 28 : 26),
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
    buttons_length: {
        marginTop: 10,
        width: 130,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button_length: {
        width: 32,
        height: 32,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    block_buttons_length_text: {
        fontSize: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    block_buttons_length_text_active: {
        fontSize: 14,
    },
    block_text: {
        width: '100%',
        paddingHorizontal: 20,
        marginTop: '10%',
    },
    block_text_main: {
        textAlign: 'center',
        fontSize: 14,
    },
    header_block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    header_button: {
        width: '50%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0)'
    },
    header_button_active: {
        borderBottomWidth: 1,
        borderBottomColor: ColorsStyles.colorButton,
    },
    header_button_text: {
        letterSpacing: 2,
        fontSize: 14,
    },
});
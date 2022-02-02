import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        paddingTop: 15,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    block: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 48,
        height: 55,
    },
    text_glav: {
        marginLeft: 20,
        fontSize: 32,
    },
});
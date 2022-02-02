import { StyleSheet, Platform } from 'react-native';
import { ColorsStyles } from "../../constants/ColorsStyles";

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
        width: '90%',
    },
    item_button: {
        marginTop: 25,
        width: '100%',
        height: 150,
        borderRadius: 16,
    },
    item_name: {
        fontSize: 24,
    },
});
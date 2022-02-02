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
        width: '90%',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        paddingLeft: 10,
        marginTop: 20,
    },
    item_block: {
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    item_block_active: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 14,
        // maxHeight: 150,
        position: 'relative',
        flexGrow: 1,
        // height: 130,
    },
    item_button: {
        width: '100%',
        paddingTop: 3,
        paddingBottom: 3,
        flexDirection: 'row',
        // alignItems: 'center',
    },
    icon_arrow: {
        marginTop: 8,
    },
    item_name: {
        fontSize: 18,
        marginRight: 10,
    },
    item_text: {
        fontSize: 16,
    },
    item_scroll: {
        width: '100%',
    },
    footer: {
        position: 'absolute',
        bottom: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button_footer_text: {
        fontSize: 14,
        letterSpacing: 1,
        width: '100%',
        textAlign: 'center',
    },
});
import { StyleSheet, Platform } from 'react-native';
import { ColorsStyles } from '../../constants/ColorsStyles';

export const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: 63,
        flexDirection: 'row',
        paddingTop: 0,
        alignItems: 'center',
        alignContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: ColorsStyles.backgroundFooter,
        borderBottomWidth: 3,
        borderColor: ColorsStyles.colorHr,
    },
    logo: {
    },
    block: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text_glav: {
        marginLeft: 15,
        fontSize: 22,
    },
});
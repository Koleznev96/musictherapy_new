import { StyleSheet, Platform, Dimensions } from 'react-native';
import { scaleModerate } from '../../provider/SizeFont';
const {width, height} = Dimensions.get('screen');
const width_logo = width * 0.88;

export const styles = StyleSheet.create({
    block: {
        marginTop: '50%',
    },
    logo: {
        width: 95,
        height: 109,
    },
    text_glav: {
        marginTop: 25,
        fontSize: scaleModerate(32, 1.8),
    },
    text_foot: {
        letterSpacing: 2,
        marginTop: 8,
        fontSize: 14,
    },
});
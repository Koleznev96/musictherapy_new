import { StyleSheet, Platform, Dimensions } from 'react-native';
import { ColorsStyles } from "../../constants/ColorsStyles";

export const styles = StyleSheet.create({
    scroll: {
        // marginTop: 10,
        width: '100%',
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        marginTop: 25,
    },
    value: {
        fontSize: 15,
        marginLeft: 10,
    },
    button_filter: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
    },
    box_clip: {
        borderWidth: 1,
        borderColor: ColorsStyles.colorButton,
        width: 18,
        height: 18,
        // borderRadius: 100,
        backgroundColor: '#E0E6F1',
    },
    box_clip_active: {
        borderWidth: 2,
        borderColor: ColorsStyles.colorButton,
        width: 18,
        height: 18,
        // borderRadius: 100,
        backgroundColor: ColorsStyles.colorButton,
    },
    bool_clip: {
        borderWidth: 1,
        borderColor: ColorsStyles.colorButton,
        width: 18,
        height: 18,
        borderRadius: 100,
        backgroundColor: '#E0E6F1',
    },
    bool_clip_active: {
        borderWidth: 2,
        borderColor: ColorsStyles.colorButton,
        width: 18,
        height: 18,
        borderRadius: 100,
        backgroundColor: ColorsStyles.colorButton,
    },
    instruments: {
        fontSize: 10,
        color: '#B9B9B9',
    },
    button_like: {
        opacity: 0.8,
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    futter_plyer: {
        position: 'absolute',
        bottom: 10,
        width: '86%',
    },
    scrollView: {
        // marginTop: 10,
        alignItems: 'center',
        paddingBottom: 30,
    },
    block_root_v: {
        width: '100%',
        height: 200,
        borderRadius: 16,
        marginTop: 10,
        backgroundColor: 'rgba(198, 198, 198, 0.54)',
    },
    block_root_v_active: {
        zIndex: 3000,
        position: 'relative',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        // height: 600,
    },
    video_false: {
        borderRadius: 16,
        height: 200,
        width: '100%',
    },
    video_false_v: {
        width: '100%',
        height: 200,
    },
    video_true: {
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    item_video: {
        width: Dimensions.get('window').width - 40,
        height: 200,
        borderRadius: 16,
        marginTop: 10,
        backgroundColor: 'rgba(198, 198, 198, 0.54)'
    },
    block: {
        alignItems: 'center',
        width: '86%',
    },
    item_block_root: {
        marginBottom: 15,
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
        // height: 130,
    },
    item_button: {
        width: '100%',
        paddingTop: 3,
        paddingBottom: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    item_name: {
        fontSize: 17,
        marginRight: 10,
    },
    item_text: {
        fontSize: 14,
    },
    item_scroll: {
        maxHeight: 80,
    },
});
import { StyleSheet, Platform, Dimensions } from 'react-native';
import { ColorsStyles } from "../../constants/ColorsStyles";

export const styles = StyleSheet.create({
    scroll: {
        marginTop: 10,
        width: '100%',
    },
    button_like: {
        position: 'absolute', 
        right: 10,
        top: 10, 
        opacity: 0.8,
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        marginTop: 10,
        alignItems: 'center',
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
        width: '90%',
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
    block_dalate: {
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 15,
        alignItems: 'center',
    },
    label_root: {
        fontSize: 16,
        marginBottom: 15,
    },
    label: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 30,
    },
    button_dalete: {
        width: '60%',
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ColorsStyles.colorButton,
        borderRadius: 20,
    },
    button_start_test: {
        width: '43%',
        height: 27,
        borderRadius: 6,
        backgroundColor: '#FCB900',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_view_test: {
        width: '55%',
        height: 27,
        borderRadius: 6,
        backgroundColor: '#C4C4C4',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_start_test_text: {
        fontSize: 12,
        color: '#000000',
    },
    button_view_test_text: {
        fontSize: 12,
        color: '#000000',
    },
});
import { StyleSheet, Platform, Dimensions } from 'react-native';
import { ColorsStyles } from "../../../constants/ColorsStyles";
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
    scroll: {
        marginTop: 10,
        width: '100%',
    },
    curent_number: {
        fontSize: 24,
        color: '#000000',
        position: 'absolute',
        top: 4,
        right: 8,
    },
    block_futer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button_answer: {
        width: '100%',
        paddingVertical: 6,
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        marginBottom: 11,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_answer_current: {
        width: '100%',
        paddingVertical: 6,
        backgroundColor: '#FCB900',
        borderRadius: 6,
        marginBottom: 11,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_answer_ok: {
        width: '100%',
        paddingVertical: 6,
        backgroundColor: '#3F8A02',
        borderRadius: 6,
        marginBottom: 11,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_answer_error: {
        width: '100%',
        paddingVertical: 6,
        backgroundColor: '#B7241B',
        borderRadius: 6,
        marginBottom: 11,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_answer_text: {
        fontSize: 15,
        color: '#000000',
    },
    wrapper_bl: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button_trev: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 92,
        backgroundColor: '#021F2D',
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#FCB900',
        height: 34,
    },
    button_menu_item: {
        fontSize: 12,
        marginLeft: 7,
    },
    button_ok: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 102,
        backgroundColor: '#FCB900',
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#FCB900',
        height: 34,
        padding: 0.5,
    },
    button_ok_ok: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 102,
        backgroundColor: '#3F8A02',
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#3F8A02',
        height: 34,
        padding: 0.5,
    },
    button_ok_error: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 102,
        backgroundColor: '#B7241B',
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#B7241B',
        height: 34,
        padding: 0.5,
    },
    button_ok_def: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 102,
        backgroundColor: '#C4C4C4',
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#C4C4C4',
        height: 34,
        padding: 0.5,
    },
    border_button: {
        width: '100%',
        height: '100%',
        borderWidth: 1,
        borderColor: '#021F2D',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
    },
    border_button_ans: {
        width: '100%',
        height: '100%',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
    },
    button_ok_text: {
        fontSize: 12,
        color: '#021F2D',
    },
    button_ok_text_ans: {
        fontSize: 14,
        color: '#FFFFFF',
    },
    button_return_text: {
        fontSize: 12,
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
        paddingHorizontal: 6,
        paddingBottom: 140,
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
        width: '100%',
        marginTop: 10,
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 14,
    },
    item_block_active: {
        width: '100%',
        marginTop: 10,
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 14,
        minHeight: 160,
        // height: 130,
    },
    item_button: {
        width: '100%',
        paddingTop: 3,
        paddingBottom: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    item_name: {
        fontSize: 17,
        marginRight: 10,
        width: width - 100,
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
        marginBottom: 13,
    },
    block_text: {
        width: '100%',
        paddingHorizontal: 12,
        paddingVertical: 2,
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        marginTop: 14,
        marginBottom: 19,
        minHeight: 62,
    },
    block_text_text: {
        fontSize: 14,
        color: '#000000',
    },
    block_answers: {
        width: '100%',
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
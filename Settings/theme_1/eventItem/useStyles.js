import {StyleSheet, Platform} from 'react-native';
import {ColorsStyles} from '../ColorsStyles';

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
  label: {
    width: '100%',
    paddingLeft: 10,
    marginBottom: 10,
    fontSize: 18,
    marginTop: 10,
  },
  item_block: {
    width: '100%',
    alignItems: 'center',
    // height: 420,
    marginBottom: 30,
  },
  item_img: {
    width: '100%',
    height: 450,
    // backgroundColor: 'red',
    // flex: 1,
    // width: null,
    // height: null,
    resizeMode: 'contain',
    borderRadius: 16,
    // backgroundColor: 'rgba(198, 198, 198, 0.54)'
  },
  item_button: {
    marginTop: 20,
    minWidth: '80%',
    backgroundColor: '#FEB801',
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  item_button_text: {
    fontSize: 22,
    color: '#000',
    // textAlign: 'center',
    // width: '100%',
  },
});

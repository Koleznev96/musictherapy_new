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
    resizeMode: 'contain',
    borderRadius: 3,
  },
  item_button: {
    marginTop: 20,
    minWidth: '80%',
    backgroundColor: '#C38310',
    height: 36,
    borderRadius: 3,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  item_button_text: {
    fontSize: 15,
    color: '#FFF',
    // textAlign: 'center',
    // width: '100%',
  },
});

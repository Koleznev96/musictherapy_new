import {StyleSheet, Platform, Dimensions} from 'react-native';
import {ColorsStyles} from '..//ColorsStyles';
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 46,
    backgroundColor: ColorsStyles.colorButton,
    borderRadius: 14,
    aliginItems: 'center',
    justifyContent: 'center',
  },
  button_text: {
    width: '100%',
    textAlign: 'center',
    fontSize: width > 340 ? 18 : 16,
  },
  block_loader: {
    width: '100%',
    height: 46,
    flexDirection: 'row',
    aliginItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    marginTop: 3,
    width: 40,
    height: 40,
  },
});

import {StyleSheet, Platform, Dimensions} from 'react-native';
import {ColorsStyles} from '..//ColorsStyles';
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 46,
    backgroundColor: '#070905',
    borderRadius: 8,
    aliginItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E9E9E9',
  },
  button_text: {
    width: '100%',
    textAlign: 'center',
    fontSize: width > 340 ? 16 : 16,
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

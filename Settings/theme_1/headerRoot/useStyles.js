import {StyleSheet, Dimensions} from 'react-native';
import {ColorsStyles} from '../ColorsStyles';
const {width, height} = Dimensions.get('screen');

const oval1Width = width * 0.5,
  oval2Width = width * 0.7;

export const styles = StyleSheet.create({
  body: {
    width: '100%',
    height: 82,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 19,
    paddingHorizontal: 20,
    borderBottomWidth: 3,
    borderColor: ColorsStyles.colorHr,
  },
  grov: {
    backgroundColor: ColorsStyles.colorHeader,
    position: 'absolute',
    width: width,
    height: width,
    borderRadius: width / 2.2,
    transform: [{scaleX: 2}],
    bottom: 0,
  },
  logo: {},
  block: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text_glav: {
    marginLeft: 15,
    fontSize: 22,
  },
  back_button: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12,
  },
  back_button_text: {
    fontSize: 16,
  },
});

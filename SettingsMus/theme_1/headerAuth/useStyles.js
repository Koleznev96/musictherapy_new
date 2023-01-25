import {StyleSheet, Dimensions} from 'react-native';
import {ColorsStyles} from '../ColorsStyles';
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  body: {
    width: '100%',
    height: 82,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 3,
    borderColor: ColorsStyles.colorHr,
    alignItems: 'center',
    justifyContent: 'center',
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
  block: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_glav: {
    fontSize: 26,
  },
});

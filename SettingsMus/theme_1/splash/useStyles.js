import {StyleSheet, Platform, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');
const width_logo = width * 0.88;

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const scale = (size, width_def = width) =>
  (width_def / guidelineBaseWidth) * size;
const scaleModerate = (size, factor = 0.5, width_def = width) =>
  size + (scale(size, width_def) - size) * factor;

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

import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  logo: {
    width: 95,
    height: 109,
  },
  text_glav: {
    marginTop: 25,
    fontSize: width > 340 ? 32 : width > 300 ? 28 : 26,
  },
});

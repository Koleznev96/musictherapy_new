import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  body: {
    width: '100%',
    // height: 60,
    flexDirection: 'row',
    paddingTop: 25,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: -15,
  },
  block: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 48,
    height: 55,
  },
  text_glav: {
    marginLeft: 20,
    fontSize: width > 340 ? 32 : width > 300 ? 28 : 26,
  },
});

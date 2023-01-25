import {StyleSheet} from 'react-native';
import {ColorsStyles} from '../ColorsStyles';

export const styles = StyleSheet.create({
  body: {
    width: '100%',
    height: 63,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 0,
    alignItems: 'center',
    alignContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: ColorsStyles.backgroundFooter,
    borderBottomWidth: 3,
    borderColor: ColorsStyles.colorHr,
  },
  logo: {},
  block: {
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
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#FCB900',
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  back_button_text: {
    fontSize: 16,
    marginLeft: 6,
  },
});

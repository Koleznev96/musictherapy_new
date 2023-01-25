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
    backgroundColor: ColorsStyles.colorHeader,
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
    fontSize: 20,
  },
  back_button: {
    paddingHorizontal: 20,
    paddingVertical: 3,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: '#C59251',
    marginTop: 2,
  },
  back_button_text: {
    fontSize: 15,
  },
});

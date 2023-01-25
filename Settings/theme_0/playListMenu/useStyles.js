import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  menu: {
    // width: '100%',
    paddingHorizontal: 8,
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menu_el: {
    width: 90,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: '#212224',
  },
  menu_el_active: {
    width: 90,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: '#C38310',
  },
  menu_el_text: {
    fontSize: 13,
    color: '#212224',
    // borderBottomColor: 'rgba(0, 0, 0, 0)',
    // borderBottomWidth: 1,
  },
  menu_el_text_active: {
    // borderBottomColor: '#FFFFFF',
    // borderBottomWidth: 1,
    fontSize: 13,
    color: '#212224',
  },
});

import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  menu: {
    width: '100%',
    paddingHorizontal: 8,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menu_el: {
    width: '49%',
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
  },
  menu_el_active: {
    width: '49%',
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
  },
  menu_el_text: {
    fontSize: 15,
    borderBottomColor: 'rgba(0, 0, 0, 0)',
    borderBottomWidth: 1,
  },
  menu_el_text_active: {
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 1,
    fontSize: 15,
  },
});

import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  button_audio_session: {
    width: '100%',
    backgroundColor: '#FCB900',
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_audio_session_text: {
    fontSize: width > 345 ? 16 : 14,
  },
});

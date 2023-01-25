import React, {useState} from 'react';
import {Text, View, Pressable} from 'react-native';
import {styles} from './useStyles';
import GlobalStyle from '../../GlobalStyle';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {settingsRoutes} from '../../../../Settings/routes/settingsRoutes';

export const DateFull = ({
  label,
  name,
  change,
  value,
  styles_new,
  error,
  translations,
  theme,
}) => {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const stringDate = date => {
    date = new Date(date);
    const year = date.getFullYear().toString();
    const month =
      (Number(date.getMonth()) + 1).toString().length <= 1
        ? '0' + (Number(date.getMonth()) + 1).toString()
        : (Number(date.getMonth()) + 1).toString();
    const day =
      date.getDate().toString().length <= 1
        ? '0' + date.getDate().toString()
        : date.getDate().toString();

    return `${day}-${month}-${year}`;
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  const handleConfirm = date => {
    change({name, value: date.toString()});
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  return (
    <View style={styles.block}>
      <Text
        style={[
          settingsRoutes[theme].GlobalStyle.CustomFontLite,
          styles.label,
          {color: settingsRoutes[theme].ColorsStyles.text},
        ]}>
        {translations && translations[label] ? translations[label] : label}
      </Text>
      <Pressable
        style={[
          {
            width: '100%',
            height: 46,
            borderRadius: 14,
            // paddingHorizontal: 10,
            // aliginItems: 'center',
            color: settingsRoutes[theme].ColorsStyles.text,
            marginTop: 4,
            // textAlign: 'center',
            borderColor: settingsRoutes[theme].ColorsStyles.colorInput,
            borderWidth: 1,
            // paddingVertical: 20,
            // paddingTop: 10,
            alignItems: 'center',
            justifyContent: 'center',
          },
          styles_new ? styles_new : null,
        ]}
        onPress={() => showDatepicker()}>
        <Text
          style={[
            settingsRoutes[theme].GlobalStyle.CustomFontRegular,
            styles.value,
            {color: settingsRoutes[theme].ColorsStyles.text},
          ]}>
          {value ? stringDate(value) : ''}
        </Text>
        <DateTimePickerModal
          isVisible={show}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </Pressable>
      {error?.length ? (
        <Text
          style={[
            settingsRoutes[theme].GlobalStyle.CustomFontLite,
            styles.error_text,
          ]}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

import React, {useContext} from 'react';
import {Text, ActivityIndicator, TouchableOpacity, View} from 'react-native';
import {styles} from '../useStyles';
import GlobalStyle from '../../../components/GlobalStyle';
import {ColorsStyles} from '../../../constants/ColorsStyles';
import {ButtonFull} from '../../../components/buttonFull/ButtonFull';
import {TextFull} from '../../../components/textFull/TextFull';
import {InputFull} from '../../../components/form/inputFull/InputFull';
import {AuthContext} from '../../../context/authContext';
import {checkLanguageConst} from '../../../hooks/useLanguage';

export const ProfileData = ({
  form,
  setRoot,
  errorField,
  statusNewData,
  saveHandler,
  logoutHandler,
  deleteHandler,
}) => {
  const auth = useContext(AuthContext);
  return (
    <View style={styles.block_l}>
      <InputFull
        translations={auth.translations}
        data={{
          value: form?.name,
          name: 'name',
          change: setRoot,
          placeholder: checkLanguageConst('Имя', auth.translations),
          error: errorField?.name,
        }}
      />
      <InputFull
        translations={auth.translations}
        data={{
          value: form?.fullName,
          name: 'fullName',
          change: setRoot,
          placeholder: checkLanguageConst('Фамилия', auth.translations),
          error: errorField?.fullName,
        }}
      />
      <InputFull
        translations={auth.translations}
        data={{
          value: form?.telephone,
          name: 'telephone',
          change: setRoot,
          placeholder: checkLanguageConst('Телефон', auth.translations),
          error: errorField?.telephone,
        }}
      />
      <InputFull
        translations={auth.translations}
        data={{
          value: form?.email,
          name: 'email',
          change: setRoot,
          placeholder: checkLanguageConst('E-mail', auth.translations),
          error: errorField?.email,
        }}
      />

      <ButtonFull
        data={{
          value: checkLanguageConst('Сохранить изменения', auth.translations),
          change: saveHandler,
          styles_text: {color: !statusNewData ? ColorsStyles.colorHr : '#FFF'},
          styles: !statusNewData
            ? {
                marginTop: 30,
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderWidth: 1,
                borderColor: ColorsStyles.colorHr,
              }
            : {marginTop: 40},
        }}
      />
      <ButtonFull
        data={{
          value: checkLanguageConst('Выйти из аккаунта', auth.translations),
          change: logoutHandler,
          styles: {marginTop: 10},
        }}
      />

      <ButtonFull
        data={{
          value: checkLanguageConst('Удалить аккаунт', auth.translations),
          change: deleteHandler,
          styles_text: {color: ColorsStyles.colorHr},
          styles: {
            marginTop: 30,
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderWidth: 1,
            borderColor: ColorsStyles.colorHr,
          },
        }}
      />
    </View>
  );
};

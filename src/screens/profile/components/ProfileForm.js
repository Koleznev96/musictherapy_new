import React, {useContext} from 'react';
import {Text, ActivityIndicator, TouchableOpacity, View} from 'react-native';
import {styles} from '../useStyles';
import {optionQuestionnaire} from './options';
import {ColorsStyles} from '../../../constants/ColorsStyles';
import {ButtonFull} from '../../../components/buttonFull/ButtonFull';
import {InputFull} from '../../../components/form/inputFull/InputFull';
import {BoxFull} from '../../../components/form/boxFull/BoxFull';
import {BoolFull} from '../../../components/form/boolFull/BoolFull';
import {DateFull} from '../../../components/form/dateFull/DateFull';
import {InputForm} from '../../../components/form/inputForm/InputForm';
import {AuthContext} from '../../../context/authContext';
import {checkLanguageConst} from '../../../hooks/useLanguage';
import {settingsRoutes} from '../../../../Settings/routes/settingsRoutes';

export const ProfileForm = ({
  form,
  setRoot,
  errorField,
  statusNewData,
  saveHandler,
  logoutHandler,
}) => {
  const auth = useContext(AuthContext);

  const listField = (item, change, value) => {
    if (item.type === 'input')
      return (
        <InputForm
          theme={auth.theme}
          label={item.label}
          name={item.value}
          change={change}
          value={value[item.value]}
          translations={auth.translations}
        />
      );
    if (item.type === 'bool')
      return (
        <BoolFull
          theme={auth.theme}
          label={item.label}
          name={item.value}
          change={change}
          value={value[item.value]}
          list_value={item.list_value}
          translations={auth.translations}
        />
      );
    if (item.type === 'box')
      return (
        <BoxFull
          theme={auth.theme}
          label={item.label}
          name={item.value}
          change={change}
          value={value[item.value]}
          list_value={item.list_value}
          translations={auth.translations}
        />
      );
    if (item.type === 'date')
      return (
        <DateFull
          theme={auth.theme}
          label={item.label}
          name={item.value}
          change={change}
          value={value[item.value]}
          translations={auth.translations}
        />
      );
    return null;
  };

  return (
    <View style={styles.block_l}>
      {form
        ? optionQuestionnaire?.fields?.map(item => {
            return listField(item, setRoot, form);
          })
        : null}
      {settingsRoutes[auth.theme].ButtonFull({
        data: {
          value: checkLanguageConst('SaveChanges', auth.translations),
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
        },
      })}
    </View>
  );
};

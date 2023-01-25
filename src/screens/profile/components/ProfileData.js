import React, {useContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../useStyles';
import {ColorsStyles} from '../../../constants/ColorsStyles';
import {ButtonFull} from '../../../components/buttonFull/ButtonFull';
import {InputFull} from '../../../components/form/inputFull/InputFull';
import {AuthContext} from '../../../context/authContext';
import {checkLanguageConst} from '../../../hooks/useLanguage';
import {settingsRoutes} from '../../../../Settings/routes/settingsRoutes';

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
    <>
      <View style={styles.block_l}>
        <InputFull
          translations={auth.translations}
          data={{
            value: form?.name,
            name: 'name',
            change: setRoot,
            placeholder: checkLanguageConst('Name', auth.translations),
            error: errorField?.name,
          }}
          theme={auth.theme}
        />
        <InputFull
          translations={auth.translations}
          data={{
            value: form?.fullName,
            name: 'fullName',
            change: setRoot,
            placeholder: checkLanguageConst('Surname', auth.translations),
            error: errorField?.fullName,
          }}
          theme={auth.theme}
        />
        <InputFull
          translations={auth.translations}
          data={{
            value: form?.telephone,
            name: 'telephone',
            change: setRoot,
            placeholder: checkLanguageConst('Phone', auth.translations),
            error: errorField?.telephone,
          }}
          theme={auth.theme}
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
          theme={auth.theme}
        />
        {settingsRoutes[auth.theme].ButtonFull({
          data: {
            value: checkLanguageConst('SaveChanges', auth.translations),
            change: saveHandler,
            styles_text: {
              color: !statusNewData ? ColorsStyles.colorHr : '#FFF',
            },
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
        {settingsRoutes[auth.theme].ButtonLogout({
          data: {
            value: checkLanguageConst('Logout', auth.translations),
            change: logoutHandler,
            styles: {marginTop: 10, marginBottom: 60},
          },
        })}
      </View>
      <View
        style={{
          // width: '100%',
          position: 'absolute',
          zIndex: 1000,
          bottom: -10,
          left: 0,
          right: 0,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => deleteHandler()}
          style={{
            paddingBottom: 22,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 12,
            backgroundColor: '#1D293C',
            zIndex: 1001,
            backgroundColor: 'red',
          }}>
          <Text
            style={[
              settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
              styles.button_text_delete_ac,
            ]}>
            {checkLanguageConst(
              'DeleteAccount',
              auth.translations,
            ).toLowerCase()}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from '../../context/authContext';
import {useHttp} from '../../hooks/http.hook';
import {styles} from './useStyles';
import GlobalStyle from '../../components/GlobalStyle';
import {HeaderRoot} from '../../components/headerRoot/HeaderRoot';
import {ButtonFull} from '../../components/buttonFull/ButtonFull';
import {optionQuestionnaire} from './components/options';
import {ColorsStyles} from '../../constants/ColorsStyles';
import {LoaderIn} from '../../components/loader/minLoader/LoaderIn';
import {ProfileData} from './components/ProfileData';
import {ProfileForm} from './components/ProfileForm';
import {useCallback} from 'react/cjs/react.production.min';
import {checkLanguageConst} from '../../hooks/useLanguage';
import {PopapContext} from '../../context/PopapContext';
import {settingsRoutes} from '../../../Settings/routes/settingsRoutes';

function ProfileScreen({navigation}) {
  const auth = useContext(AuthContext);
  const {loading, request, error, clearError} = useHttp();
  const [Refreshing, setRefreshing] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [statusNewData, setStatusNewData] = useState(false);
  const [statusNewForm, setStatusNewForm] = useState(false);
  const [formNew, setFormNew] = useState({});
  const [formAccNew, setFormAccNew] = useState(null);
  const popapRoot = useContext(PopapContext);

  const createFields = formAcc => {
    let field = {};
    optionQuestionnaire?.fields?.forEach(item => {
      field[item.value] = formAcc ? formAcc[item.value] : item.default;
    });
    setFormAccNew(field);
  };

  const getProfile = async () => {
    try {
      const data = await request(`/api/profile/data`, 'GET', null, {
        Authorization: `${auth.token}`,
      });
      if (settingsRoutes[auth.theme].isQuestionnaire) {
        setFormNew({
          name: data.data.name,
          fullName: data.data.fullName,
          telephone: data.data.telephone,
          email: data.data.email,
        });
        createFields(data.questionnaire);
      }
      setStatusNewData(false);
      setStatusNewForm(false);
    } catch (e) {}
  };

  useEffect(() => {
    if (auth.token && !Object.keys(formNew).length) {
      getProfile();
    }
  }, [auth.token]);

  const logoutHandler = () => {
    auth.logout();
  };

  const deleteRootHandler = async () => {
    try {
      popapRoot.exitHandler();
      await request(`/api/profile/delete_account`, 'GET', null, {
        Authorization: `${auth.token}`,
      });
      logoutHandler();
    } catch (e) {}
  };

  const DataPopap = () => (
    <View style={styles.block_dalate}>
      <Text
        style={[
          settingsRoutes[auth.theme].GlobalStyle.CustomFontBold,
          styles.label_root,
        ]}>
        {checkLanguageConst('DeleteAccountWarning', auth.translations)}
      </Text>

      <View style={styles.block_btn}>
        <TouchableOpacity
          style={styles.button_dalete}
          onPress={() => deleteRootHandler()}>
          <Text
            style={[
              settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
              styles.button_dalete_text,
            ]}>
            {checkLanguageConst('Confirm', auth.translations)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button_exit}
          onPress={() => popapRoot.exitHandler()}>
          <Text
            style={[
              settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
              styles.button_exit_text,
            ]}>
            {checkLanguageConst('Cancel', auth.translations)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const deleteHandler = () => {
    popapRoot.dataChange(DataPopap());
    popapRoot.openHandler();
  };

  const registerHandler = () => {
    navigation.navigate('Register');
  };

  const loginHandler = () => {
    navigation.navigate('Login');
  };

  const selectLengHandler = () => {
    navigation.navigate({
      name: 'Select',
      params: {
        title: 'SelectLanguage',
        data: auth.languages_list,
        value_code: 'code',
        label_code: 'name',
        select_handler: auth.newLanguage,
        selectedValue: auth.language,
      },
    });
  };

  const selectThemeHandler = () => {
    navigation.navigate({
      name: 'Select',
      params: {
        title: 'SelectTheme',
        data: settingsRoutes.themes,
        value_code: 'id',
        label_code: 'name',
        select_handler: auth.updateTheme,
        selectedValue: auth.theme,
      },
    });
  };

  const activeMenuHandler = status => {
    setActiveMenu(status);
  };

  const saveHandler = async () => {
    if (!statusNewData && !statusNewForm) return;
    try {
      const data = await request(
        `/api/profile/re_data`,
        'POST',
        {
          data: statusNewData ? formNew : null,
          questionnaire: statusNewForm ? formAccNew : null,
        },
        {
          Authorization: `${auth.token}`,
        },
      );
      if (settingsRoutes[auth.theme].isQuestionnaire) {
        setFormNew({
          name: data.data.name,
          fullName: data.data.fullName,
          telephone: data.data.telephone,
          email: data.data.email,
        });
        createFields(data.questionnaire);
      }
      setStatusNewData(false);
      setStatusNewForm(false);
    } catch (e) {}
  };

  const setRoot = data => {
    setStatusNewData(true);
    let new_data = {...formNew};
    new_data[data.name] = data.value;
    setFormNew(new_data);
  };

  const setQuestionnaire = data => {
    setStatusNewForm(true);
    let new_data = {...formAccNew};
    new_data[data.name] = data.value;
    setFormAccNew(new_data);
  };

  const backHandler = () => {
    navigation.navigate('Home');
  };

  if (!auth.token)
    return (
      <ImageBackground
        source={settingsRoutes[auth.theme].backgroundSettings.img_2}
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <SafeAreaView
          style={{width: '100%', height: '100%', alignItems: 'center'}}>
          <View style={styles.block}>
            {settingsRoutes[auth.theme].IconView({
              translations: auth.translations,
            })}
            <Text
              style={[
                settingsRoutes[auth.theme].GlobalStyle.BellotaFontRegular,
                styles.text_foot,
                {color: settingsRoutes[auth.theme].ColorsStyles.text},
              ]}>
              {checkLanguageConst('ApplicationDescription', auth.translations)}
            </Text>
            <View style={styles.buttons_length}>
              <TouchableOpacity
                style={[
                  styles.button_length,
                  {
                    borderBottomColor:
                      settingsRoutes[auth.theme].ColorsStyles.text,
                  },
                ]}
                onPress={() => selectLengHandler('ru')}>
                <Text
                  style={[
                    settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
                    styles.block_buttons_length_text,
                    {color: settingsRoutes[auth.theme].ColorsStyles.text},
                  ]}>
                  {checkLanguageConst('Language', auth.translations)}:{' '}
                  {auth.languages_list?.find(
                    item => item.code === auth.language,
                  )
                    ? checkLanguageConst(
                        auth.languages_list?.find(
                          item => item.code === auth.language,
                        ).name,
                        auth.translations,
                      )
                    : ''}
                </Text>
                {settingsRoutes[auth.theme].icons({id: 'edit_mini'})}
              </TouchableOpacity>
              {settingsRoutes.isEnabledSwitcherTheme && (
                <>
                  <View style={{width: 10}} />
                  <TouchableOpacity
                    style={[styles.button_length]}
                    onPress={() => selectThemeHandler()}>
                    <Text
                      style={[
                        settingsRoutes[auth.theme].GlobalStyle
                          .CustomFontRegular,
                        styles.block_buttons_length_text,
                      ]}>
                      {checkLanguageConst('Theme', auth.translations)}:{' '}
                      {checkLanguageConst(
                        settingsRoutes.themes?.find(
                          item => item.id === auth.theme,
                        ).name,
                        auth.translations,
                      )}
                    </Text>
                    {settingsRoutes[auth.theme].icons({id: 'edit_mini'})}
                  </TouchableOpacity>
                </>
              )}
            </View>
            <View style={styles.block_text}>
              <Text
                style={[
                  settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
                  styles.block_text_main,
                  {color: settingsRoutes[auth.theme].ColorsStyles.text},
                ]}>
                {checkLanguageConst(
                  'RegistrationDescription',
                  auth.translations,
                )}
              </Text>
            </View>
            <View style={styles.block_buttons}>
              {settingsRoutes[auth.theme].ButtonFull({
                data: {
                  value: checkLanguageConst('CreateAccount', auth.translations),
                  change: registerHandler,
                  styles: {marginTop: 30},
                },
              })}
              {settingsRoutes[auth.theme].ButtonFull({
                data: {
                  value: checkLanguageConst('Login', auth.translations),
                  change: loginHandler,
                  styles: {marginTop: 25},
                },
              })}
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );

  return (
    <ImageBackground
      source={settingsRoutes[auth.theme].backgroundSettings.img_2}
      style={{flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
      <View
        style={{
          width: '100%',
          height: 50,
          backgroundColor: ColorsStyles.backgroundFooter,
          position: 'absolute',
          top: 0,
        }}
      />
      <SafeAreaView
        style={{width: '100%', height: '100%', alignItems: 'center'}}>
        {settingsRoutes[auth.theme].HeaderRoot({
          translations: auth.translations,
          data: {
            label: checkLanguageConst('Account', auth.translations),
            backHandler,
          },
        })}
        {settingsRoutes[auth.theme].isQuestionnaire && (
          <View style={styles.header_block}>
            <TouchableOpacity
              style={[
                styles.header_button,
                activeMenu
                  ? {
                      borderBottomWidth: 1,
                      borderBottomColor:
                        settingsRoutes[auth.theme].ColorsStyles.colorButton,
                    }
                  : null,
              ]}
              onPress={() => activeMenuHandler(true)}>
              <Text
                style={[
                  settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
                  styles.header_button_text,
                  {color: settingsRoutes[auth.theme].ColorsStyles.text},
                ]}>
                {checkLanguageConst('YourData', auth.translations)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.header_button,
                !activeMenu
                  ? {
                      borderBottomWidth: 1,
                      borderBottomColor:
                        settingsRoutes[auth.theme].ColorsStyles.colorButton,
                    }
                  : null,
              ]}
              onPress={() => activeMenuHandler(false)}>
              <Text
                style={[
                  settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
                  styles.header_button_text,
                  {color: settingsRoutes[auth.theme].ColorsStyles.text},
                ]}>
                {checkLanguageConst('Questionnaire', auth.translations)}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {loading ? (
          <LoaderIn />
        ) : (
          <ScrollView
            style={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl
                refreshing={Refreshing}
                onRefresh={() => getProfile()}
                colors={[ColorsStyles.colorTextError]}
              />
            }>
            {activeMenu ? (
              <>
                <View style={styles.buttons_length}>
                  <TouchableOpacity
                    style={[
                      styles.button_length,
                      {
                        borderBottomColor:
                          settingsRoutes[auth.theme].ColorsStyles.text,
                      },
                    ]}
                    onPress={() => selectLengHandler('ru')}>
                    <Text
                      style={[
                        settingsRoutes[auth.theme].GlobalStyle
                          .CustomFontRegular,
                        styles.block_buttons_length_text,
                        {color: settingsRoutes[auth.theme].ColorsStyles.text},
                      ]}>
                      {checkLanguageConst('Language', auth.translations)}:{' '}
                      {auth.languages_list?.find(
                        item => item.code === auth.language,
                      )
                        ? checkLanguageConst(
                            auth.languages_list?.find(
                              item => item.code === auth.language,
                            ).name,
                            auth.translations,
                          )
                        : ''}
                    </Text>
                    {settingsRoutes[auth.theme].icons({id: 'edit_mini'})}
                  </TouchableOpacity>
                  {settingsRoutes.isEnabledSwitcherTheme && (
                    <>
                      <View style={{width: 10}} />
                      <TouchableOpacity
                        style={[styles.button_length]}
                        onPress={() => selectThemeHandler()}>
                        <Text
                          style={[
                            settingsRoutes[auth.theme].GlobalStyle
                              .CustomFontRegular,
                            styles.block_buttons_length_text,
                          ]}>
                          {checkLanguageConst('Theme', auth.translations)}:{' '}
                          {checkLanguageConst(
                            settingsRoutes.themes?.find(
                              item => item.id === auth.theme,
                            ).name,
                            auth.translations,
                          )}
                        </Text>
                        {settingsRoutes[auth.theme].icons({id: 'edit_mini'})}
                      </TouchableOpacity>
                    </>
                  )}
                </View>
                <ProfileData
                  statusNewData={statusNewData}
                  form={formNew}
                  setRoot={setRoot}
                  saveHandler={saveHandler}
                  logoutHandler={logoutHandler}
                  deleteHandler={deleteHandler}
                />
              </>
            ) : (
              <ProfileForm
                statusNewData={statusNewForm}
                form={formAccNew}
                setRoot={setQuestionnaire}
                saveHandler={saveHandler}
                logoutHandler={logoutHandler}
              />
            )}
            <View style={{height: 50, width: '100%'}} />
          </ScrollView>
        )}
        {/* <View
          style={{
            // width: '100%',
            position: 'absolute',
            bottom: 0,
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
        </View> */}
      </SafeAreaView>
    </ImageBackground>
  );
}

export default ProfileScreen;

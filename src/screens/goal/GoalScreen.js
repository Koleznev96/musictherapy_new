import React, {useContext, useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from '../../context/authContext';
import {useHttp} from '../../hooks/http.hook';
import {styles} from './useStyles';
import {HeaderAuth} from '../../components/headerAuth/HeaderAuth';
import ImgRelaxation from '../../assets/images/relaxation.jpg';
import ImgActivation from '../../assets/images/activation.jpg';
import ImgTherapy from '../../assets/images/therapy.jpg';
import {checkLanguageConst} from '../../hooks/useLanguage';
import {DataContext} from '../../context/DataContext';
import {ColorsStyles} from '../../constants/ColorsStyles';
import {settingsRoutes} from '../../../Settings/routes/settingsRoutes';

function GoalScreen({navigation}) {
  const auth = useContext(AuthContext);
  const rootData = useContext(DataContext);
  const {loading, request, error, clearError} = useHttp();
  const [data, setData] = useState(false);
  const [Refreshing, setRefreshing] = useState(false);

  const data_list = [
    {
      name: 'AudioCategory1',
      router: 'Audio',
      img: ImgRelaxation,
      url: '/api/data/audio/Релакс/',
      url_like: '/api/data/audio/',
    },
    {
      name: 'AudioCategory2',
      router: 'Audio',
      img: ImgActivation,
      url: '/api/data/audio/Активация/',
      url_like: '/api/data/audio/',
    },
    {
      name: 'AudioCategory3',
      router: 'Audio',
      img: ImgTherapy,
      url: '/api/data/audio/Терапия/',
      url_like: '/api/data/audio/',
    },
  ];

  const nextHandler = item => {
    navigation.navigate({name: item.router, params: {data_root: item}});
  };

  const audioSessionHandler = () => {
    navigation.navigate('Constructor');
  };

  return (
    <ImageBackground
      source={settingsRoutes[auth.theme].backgroundSettings.img_1}
      style={{flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
      <ImageBackground
        style={{width: '100%', height: '100%', alignItems: 'center'}}
        imageStyle={{
          backgroundColor:
            settingsRoutes[auth.theme].backgroundSettings.backgroundColor,
        }}>
        <SafeAreaView style={{width: '100%', height: '100%'}}>
          {/* <HeaderAuth /> */}
          {settingsRoutes[auth.theme].HeaderAuth({
            translations: auth.translations,
            label: 'Goal',
          })}
          <ScrollView
            style={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl
                refreshing={Refreshing}
                onRefresh={() => rootData.getDostup()}
                colors={[ColorsStyles.colorTextError]}
              />
            }>
            <View style={styles.block}>
              {data_list.map((item, index) =>
                settingsRoutes[auth.theme].card({
                  item,
                  onPress: nextHandler,
                  translations: auth.translations,
                  key: index,
                }),
              )}
              <Text
                style={[
                  settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
                  styles.footer_text,
                ]}>
                {checkLanguageConst(
                  'DescriptionListeningMusic',
                  auth.translations,
                )}
              </Text>
              {auth.token
                ? settingsRoutes[auth.theme].ButtonInd({
                    onPress: audioSessionHandler,
                    label: checkLanguageConst(
                      'IndividualAudioSession',
                      auth.translations,
                    ).toUpperCase(),
                  })
                : null}
              {!auth.token ? (
                <Text
                  style={[
                    settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
                    styles.text_auth_block,
                  ]}>
                  <Text
                    style={[
                      settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
                      styles.text_auth_button,
                    ]}
                    onPress={() => navigation.navigate('Register')}>
                    {checkLanguageConst('Register', auth.translations)}
                  </Text>
                  {` ${checkLanguageConst('Or', auth.translations)} `}
                  <Text
                    style={[
                      settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
                      styles.text_auth_button,
                    ]}
                    onPress={() => navigation.navigate('Login')}>
                    {checkLanguageConst('SignIn', auth.translations)}
                  </Text>
                  {` ${checkLanguageConst(
                    'IndividualPlaylistAccess',
                    auth.translations,
                  )}`}
                </Text>
              ) : null}
            </View>
            <View style={{height: 50, width: '100%'}} />
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </ImageBackground>
  );
}

export default GoalScreen;

import React, {useContext} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Linking,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from '../../context/authContext';
import {styles} from './useStyles';
import {HeaderAuth} from '../../components/headerAuth/HeaderAuth';
import {checkLanguage} from '../../hooks/useLanguage';
import {settingsRoutes} from '../../../Settings/routes/settingsRoutes';

function StartScreen({navigation}) {
  const auth = useContext(AuthContext);

  const nextHandler = item => {
    navigation.navigate({name: item.router, params: {data_root: item}});
  };

  const updateHandler = () => {
    if (Platform.OS === 'ios')
      Linking.openURL(
        'https://apps.apple.com/by/app/музыкотерапия/id1608306469',
      ).catch(err => console.error('An error occurred', err));
    else
      Linking.openURL(
        'https://play.google.com/store/apps/details?id=by.musictherapy',
      ).catch(err => console.error('An error occurred', err));
  };

  const DataPopap = label => (
    <View style={styles.block_dalate}>
      <Text
        style={[
          settingsRoutes[auth.theme].GlobalStyle.CustomFontBold,
          styles.label_root,
        ]}>
        Обновление приложения
      </Text>

      <Text
        style={[
          settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
          styles.label,
        ]}>
        {checkLanguage(label, auth.language)}
      </Text>

      <TouchableOpacity
        style={styles.button_dalete}
        onPress={() => updateHandler()}>
        <Text
          style={[
            settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
            styles.item_text,
          ]}>
          Обновить
        </Text>
      </TouchableOpacity>
    </View>
  );

  //   useEffect(() => {
  //     if (auth.version !== null && auth.version !== appVersion) {
  //       popapRoot.dataChange(DataPopap(auth.labelUpdate));
  //       popapRoot.openHandler();
  //     }
  //   }, [auth.version]);

  return (
    <ImageBackground
      source={
        settingsRoutes[auth.theme].backgroundSettings.img_start ??
        settingsRoutes[auth.theme].backgroundSettings.img_1
      }
      style={{flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
      <ImageBackground
        style={{width: '100%', height: '100%', alignItems: 'center'}}
        imageStyle={{
          backgroundColor:
            settingsRoutes[auth.theme].backgroundSettings.backgroundColor,
        }}>
        <SafeAreaView
          style={{width: '100%', height: '100%', paddingBottom: -35}}>
          {/* <HeaderAuth /> */}
          {settingsRoutes[auth.theme].HeaderAuth({
            translations: auth.translations,
            label: 'Discover',
          })}
          <ScrollView
            style={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollView}>
            <View style={styles.block}>
              {settingsRoutes[auth.theme].home_screen.noAuth?.map(
                (item, index) =>
                  settingsRoutes[auth.theme].card({
                    item,
                    onPress: nextHandler,
                    translations: auth.translations,
                    key: index,
                  }),
              )}
              {auth.token &&
                settingsRoutes[auth.theme].home_screen.auth?.map(
                  (item, index) =>
                    settingsRoutes[auth.theme].card({
                      item,
                      onPress: nextHandler,
                      translations: auth.translations,
                      key: index,
                    }),
                )}
            </View>
            <View style={{height: 50, width: '100%'}} />
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </ImageBackground>
  );
}

export default StartScreen;

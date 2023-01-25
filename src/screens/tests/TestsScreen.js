import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from '../../context/authContext';
import {styles} from './useStyles';
import {ColorsStyles} from '../../constants/ColorsStyles';
import {LoaderIn} from '../../components/loader/minLoader/LoaderIn';
import {httpServer} from '../../../const';
import {checkLanguage, checkLanguageConst} from '../../hooks/useLanguage';
import {PopapContext} from '../../context/PopapContext';
import {DataContext} from '../../context/DataContext';
import {settingsRoutes} from '../../../Settings/routes/settingsRoutes';

function TestsScreen({navigation, route}) {
  const {data_root} = route.params;
  const popapRoot = useContext(PopapContext);
  const dataRoot = useContext(DataContext);
  const auth = useContext(AuthContext);
  const [Refreshing, setRefreshing] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const itemHandler = index => {
    if (index === activeIndex) setActiveIndex(-1);
    else setActiveIndex(index);
  };

  const backHandler = () => {
    navigation.goBack();
  };

  const DataPopap = label => (
    <View style={styles.block_dalate}>
      <Text
        style={[
          settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
          styles.label,
        ]}>
        {label}
      </Text>

      <TouchableOpacity
        style={styles.button_dalete}
        onPress={() => popapRoot.exitHandler()}>
        <Text
          style={[
            settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
            styles.item_text,
          ]}>
          Ok
        </Text>
      </TouchableOpacity>
    </View>
  );

  const accessHandler = dostup => {
    let text = '';
    if (dostup === 'auth') {
      text =
        auth.language === 'ru'
          ? 'Этот контент доступен только после входа в систему (через меню Аккаунт)'
          : 'This content is available only after sign in (via menu Account)';
    } else if (dostup === 'premium') {
      text =
        auth.language === 'ru'
          ? 'Доступно для премиум аккаунтов'
          : 'Available for premium accounts';
    }
    popapRoot.dataChange(DataPopap(text));
    popapRoot.openHandler();
  };

  const nextTestHandler = data => {
    navigation.navigate({
      name: 'QuestionTest',
      params: {
        data_root: data,
        number:
          data.status_start.current_question >= data.length_questions - 1
            ? data.status_start.current_question
            : data.status_start.current_question + 1,
        data_user_test: data.status_start,
      },
    });
  };

  const startTestHandler = data => {
    navigation.navigate({name: 'InfoTest', params: {data_root: data}});
  };

  const viewResultTestHandler = data => {
    navigation.navigate({
      name: 'ResultTest',
      params: {user_test_id: data.status_end._id, test_id: data._id},
    });
  };

  return (
    <ImageBackground
      source={
        data_root?.background_img
          ? data_root?.background_img
          : settingsRoutes[auth.theme].backgroundSettings.img_1
      }
      style={{flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
      <ImageBackground
        style={{width: '100%', height: '100%', alignItems: 'center'}}
        imageStyle={{
          backgroundColor:
            settingsRoutes[auth.theme].backgroundSettings.backgroundColor,
        }}>
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
          {/* <HeaderDop
            data={{
              label: checkLanguageConst('Tests', auth.translations),
              backHandler,
              back_text: '',
            }}
          /> */}
          {settingsRoutes[auth.theme].HeaderDop({
            translations: auth.translations,
            data: {
              label: checkLanguageConst('Tests', auth.translations),
              backHandler,
              back_text: '',
            },
          })}
          <View style={styles.block}>
            {dataRoot.loader ? (
              <LoaderIn />
            ) : (
              <FlatList
                style={{width: '100%'}}
                contentContainerStyle={{paddingBottom: 100}}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={Refreshing}
                    onRefresh={() => dataRoot.getData()}
                    colors={[ColorsStyles.colorTextError]}
                  />
                }
                data={dataRoot.data}
                renderItem={({item, index}) =>
                  settingsRoutes[auth.theme].TestItem({
                    item,
                    activeIndex,
                    index,
                    itemHandler,
                    language: auth.language,
                    translations: auth.translations,
                    httpServer,
                    accessHandler,
                    nextTestHandler,
                    startTestHandler,
                    viewResultTestHandler,
                  })
                }
              />
            )}
          </View>
          <View style={{height: 50, width: '100%'}} />
        </SafeAreaView>
      </ImageBackground>
    </ImageBackground>
  );
}

export default TestsScreen;

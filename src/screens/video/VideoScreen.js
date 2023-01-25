import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from '../../context/authContext';
import {useHttp} from '../../hooks/http.hook';
import {styles} from './useStyles';
import GlobalStyle from '../../components/GlobalStyle';
import {GlobalSvgSelector} from '../../assets/GlobalSvgSelector';
import {HeaderRoot} from '../../components/headerRoot/HeaderRoot';
import VideoPlayer from '../../components/videoPlayer/VideoPlayer';
import {ColorsStyles} from '../../constants/ColorsStyles';
import {LoaderIn} from '../../components/loader/minLoader/LoaderIn';
import {httpServer} from '../../../const';
import {checkLanguage, checkLanguageConst} from '../../hooks/useLanguage';
import {PopapContext} from '../../context/PopapContext';
import {DataContext} from '../../context/DataContext';
import {VideoItem} from '../../components/video/VideoItem';
import {settingsRoutes} from '../../../Settings/routes/settingsRoutes';

function VideoScreen({navigation, route}) {
  const {data_root} = route.params;
  const popapRoot = useContext(PopapContext);
  const dataRoot = useContext(DataContext);
  const auth = useContext(AuthContext);
  const {loading, request, error, clearError} = useHttp();
  const [data, setData] = useState([]);
  const [Refreshing, setRefreshing] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [counterPage, setCounterPage] = useState(0);
  const [end_page, set_end_page] = useState(false);
  const [loader, setLoader] = useState(false);
  const [access, setAccess] = useState(null);
  const [loaderPaginashion, setLoaderPaginashion] = useState(false);
  // const [activeMenu, setActiveMenu] = useState(0);

  // useEffect(() => {
  //     setActiveMenu
  // }, [])

  const itemHandler = index => {
    if (index === activeIndex) setActiveIndex(-1);
    else setActiveIndex(index);
  };

  const getData = async () => {
    setLoader(true);
    try {
      const data = await request(
        `${
          data_root.url_
            ? dataRoot.classic_menu === '0'
              ? data_root.url
              : data_root.url_
            : data_root.url
        }ios/0`,
        'GET',
        null,
        {
          Authorization: `${auth.token}`,
        },
      );
      let new_data = data.data;
      new_data.sort((prev, next) => next.like - prev.like);
      setData(data.data);
      setCounterPage(data.data.length);
      set_end_page(data.end_page);
      setAccess(data.access);
      setLoader(false);
    } catch (e) {}
  };

  useEffect(() => {
    getData();
  }, [auth.token, dataRoot.classic_menu]);

  const fullScreenHandler = async data => {
    navigation.navigate({
      name: 'FullVideo',
      params: data,
    });

    try {
      await request(
        `/api/log/play_data`,
        'POST',
        {
          type: 'video',
          id: data._id,
        },
        {
          Authorization: auth.token ? `${auth.token}` : null,
        },
      );
    } catch (e) {}
  };

  const backHandler = () => {
    navigation.goBack();
  };

  const likeHandler = async (item, index) => {
    let new_data = [...data];
    let url = data_root.url_like + 'like/';
    if (item.like) {
      new_data[index].like = 0;
      url += 'put';
    } else {
      new_data[index].like = 1;
      url += 'add';
    }
    setData(new_data);

    try {
      await request(
        url,
        'POST',
        {id: item._id},
        {
          Authorization: `${auth.token}`,
        },
      );
    } catch (e) {}
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
        style={{
          width: '60%',
          height: 36,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: settingsRoutes[auth.theme].ColorsStyles.colorButton,
          borderRadius: 20,
        }}
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

  const activeMenuHandler = value => {
    // setActiveMenu(value);
    dataRoot.upload_classic_menu(value);
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
              label: checkLanguageConst(data_root.name, auth.translations),
              backHandler,
            },
          })}
          {data_root.url_ ? (
            <View style={styles.menu}>
              <TouchableOpacity
                style={
                  dataRoot.classic_menu === 0
                    ? styles.menu_el_active
                    : styles.menu_el
                }
                onPress={() => activeMenuHandler('0')}>
                <Text
                  style={[
                    settingsRoutes[auth.theme].GlobalStyle.CustomFontMedium,
                    dataRoot.classic_menu === '0'
                      ? styles.menu_el_text_active
                      : styles.menu_el_text,
                  ]}>
                  CLASSICS
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  dataRoot.classic_menu === 1
                    ? styles.menu_el_active
                    : styles.menu_el
                }
                onPress={() => activeMenuHandler('1')}>
                <Text
                  style={[
                    settingsRoutes[auth.theme].GlobalStyle.CustomFontMedium,
                    dataRoot.classic_menu === '1'
                      ? styles.menu_el_text_active
                      : styles.menu_el_text,
                  ]}>
                  FUSION
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
          <View style={styles.block}>
            {loader ? (
              <LoaderIn />
            ) : (
              <FlatList
                style={{width: '100%'}}
                contentContainerStyle={{paddingBottom: 100}}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={Refreshing}
                    onRefresh={() => getData()}
                    colors={[ColorsStyles.colorTextError]}
                  />
                }
                data={data}
                renderItem={({item, index}) => (
                  <VideoItem
                    item={item}
                    translations={auth.translations}
                    activeIndex={activeIndex}
                    index={index}
                    itemHandler={itemHandler}
                    language={auth.language}
                    accessHandler={accessHandler}
                    likeHandler={likeHandler}
                    token={auth.token}
                    fullScreenHandler={fullScreenHandler}
                    dostup={item.dostup}
                    theme={auth.theme}
                  />
                )}
              />
            )}
          </View>
          <View style={{height: 50, width: '100%'}} />
        </SafeAreaView>
      </ImageBackground>
    </ImageBackground>
  );
}

export default VideoScreen;

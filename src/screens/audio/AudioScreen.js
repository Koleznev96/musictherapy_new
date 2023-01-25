import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
  Image,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from '../../context/authContext';
import {useHttp} from '../../hooks/http.hook';
import {styles} from './useStyles';
import GlobalStyle from '../../components/GlobalStyle';
import {GlobalSvgSelector} from '../../assets/GlobalSvgSelector';
import {HeaderRoot} from '../../components/headerRoot/HeaderRoot';
import AudioPlayer from '../../components/audioPlayer/AudioPlayer';
import {ColorsStyles} from '../../constants/ColorsStyles';
import {LoaderIn} from '../../components/loader/minLoader/LoaderIn';
import {httpServer} from '../../../const';
import {checkLanguage, checkLanguageConst} from '../../hooks/useLanguage';
import {AudioItem} from '../../components/audio/AudioItem';
import {settingsRoutes} from '../../../Settings/routes/settingsRoutes';

function AudioScreen({navigation, route}) {
  const {data_root} = route?.params;
  const auth = useContext(AuthContext);
  const {loading, request, error, clearError} = useHttp();
  const [data, setData] = useState([]);
  const [Refreshing, setRefreshing] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeItem, setActivItem] = useState(null);
  const [counterPage, setCounterPage] = useState(0);
  const [end_page, set_end_page] = useState(false);
  const [loader, setLoader] = useState(false);
  const [clear, setClear] = useState(false);

  const itemHandler = (index, item) => {
    if (index !== activeIndex) {
      setClear(!clear);
      setActiveIndex(index);
      setActivItem(item);
    } else {
      setClear(!clear);
      setActiveIndex(-1);
    }
  };

  const replacePlay = index => {
    if (index !== activeIndex) setActiveIndex(index);
    else setActiveIndex(-1);
  };

  const nextSound = () => {
    itemHandler(
      activeIndex < data.length - 1 ? activeIndex + 1 : 0,
      data[activeIndex < data.length - 1 ? activeIndex + 1 : 0],
    );
  };

  const getData = async () => {
    setActiveIndex(-1);
    setActivItem(null);
    setLoader(true);
    try {
      const data = await request(`${data_root?.url}0`, 'GET', null, {
        Authorization: `${auth.token}`,
      });
      let new_data = data.data;
      new_data.sort((prev, next) => next.like - prev.like);
      setData(data.data);
      setCounterPage(data.data.length);
      set_end_page(data.end_page);
      setLoader(false);
    } catch (e) {}
  };

  useEffect(() => {
    getData();
  }, [auth.token]);

  const logData = async data => {
    try {
      await request(
        `/api/log/play_data`,
        'POST',
        {
          type: 'audio',
          id: data._id,
        },
        {
          Authorization: `${auth.token}`,
        },
      );
    } catch (e) {}
  };

  useEffect(() => {
    if (activeItem) logData(activeItem);
  }, [activeItem]);

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
          <View style={styles.block}>
            {loader ? (
              <LoaderIn />
            ) : (
              <FlatList
                style={{width: '100%'}}
                contentContainerStyle={{paddingBottom: 180, paddingTop: 0}}
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
                  <AudioItem
                    activeIndex={activeIndex}
                    itemHandler={itemHandler}
                    index={index}
                    item={item}
                    likeHandler={likeHandler}
                    translations={auth.translations}
                    token={auth.token}
                    language={auth.language}
                    theme={auth.theme}
                  />
                )}
              />
            )}
          </View>

          <View style={{height: 50, width: '100%'}} />
          {activeItem ? (
            <View style={styles.futter_plyer}>
              <AudioPlayer
                filepath={
                  activeItem ? httpServer + '/' + activeItem?.audio : null
                }
                title={checkLanguage(activeItem?.label, auth.language)}
                nextSound={nextSound}
                id={activeItem?._id}
                clear={clear}
                replacePlay={replacePlay}
                activeIndex={activeIndex}
                theme={auth.theme}
              />
            </View>
          ) : null}
        </SafeAreaView>
      </ImageBackground>
    </ImageBackground>
  );
}

export default AudioScreen;

import React, {useContext, useEffect, useState} from 'react';
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
import {useHttp} from '../../hooks/http.hook';
import {styles} from './useStyles';
import GlobalStyle from '../../components/GlobalStyle';
import {HeaderRoot} from '../../components/headerRoot/HeaderRoot';
import {ColorsStyles} from '../../constants/ColorsStyles';
import {LoaderIn} from '../../components/loader/minLoader/LoaderIn';
import {checkLanguage, checkLanguageConst} from '../../hooks/useLanguage';
import {VideoItem} from '../../components/video/VideoItem';
import {AudioItem} from '../../components/audio/AudioItem';
import AudioPlayer from '../../components/audioPlayer/AudioPlayer';
import {httpServer} from '../../../const';
import {settingsRoutes} from '../../../Settings/routes/settingsRoutes';

function Playlist({navigation, route}) {
  const {data} = route.params;
  const isAudio = data.ids_audio && data.ids_audio.length > 0;
  const isVideo = data.ids_video && data.ids_video.length > 0;

  const auth = useContext(AuthContext);
  const {loading, request, error, clearError} = useHttp();
  const [Refreshing, setRefreshing] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeIndexA, setActiveIndexA] = useState(-1);
  const [audio, setAudio] = useState([]);
  const [video, setVideo] = useState([]);
  const [menu_status, set_menu_status] = useState(isVideo);
  const [load, setLoad] = useState(false);
  const [clear, setClear] = useState(false);
  const [activeItem, setActivItem] = useState(null);

  const itemHandler = index => {
    if (index === activeIndex) setActiveIndex(-1);
    else setActiveIndex(index);
  };

  const itemHandlerA = index => {
    if (index === activeIndexA) setActiveIndexA(-1);
    else setActiveIndexA(index);
  };

  const getData = async (url, data_post, update) => {
    setLoad(true);
    try {
      let answer = await request(`/api/data${url}`, 'POST', data_post, {
        Authorization: `${auth.token}`,
      });
      if (update && answer && answer.length !== 0) {
        if (data.type_start === 'arbitrarily') {
          answer.sort(() => Math.random() - 0.5);
        }
        answer.sort((prev, next) => next.like - prev.like);
        update(answer);
      }
    } catch (e) {}
    setLoad(false);
  };

  useEffect(() => {
    getData('/count_playlist', data);
    isVideo
      ? getData('/get_video_ids', {ids: data.ids_video}, setVideo)
      : getData('/get_audio_ids', {ids: data.ids_audio}, setAudio);
  }, [auth.token]);

  const backHandler = () => {
    navigation.goBack();
  };

  const audioHandler = (index, item) => {
    if (index !== activeIndexA) {
      setClear(!clear);
      setActiveIndexA(index);
      setActivItem(item);
    } else {
      setClear(!clear);
      setActiveIndexA(-1);
    }
  };

  const replacePlay = index => {
    if (index !== activeIndexA) setActiveIndexA(index);
    else setActiveIndexA(-1);
  };

  const nextSound = () => {
    audioHandler(
      activeIndexA < audio.length - 1 ? activeIndexA + 1 : 0,
      audio[activeIndexA < audio.length - 1 ? activeIndexA + 1 : 0],
    );
  };

  const likeAudio = async (item, index) => {
    let new_data = [...audio];
    let url = '/api/data/audio/like/';
    if (item.like) {
      new_data[index].like = 0;
      url += 'put';
    } else {
      new_data[index].like = 1;
      url += 'add';
    }
    setVideo(new_data);

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

  const likeVideo = async (item, index) => {
    let new_data = [...video];
    let url = '/api/data/video/like/';
    if (item.like) {
      new_data[index].like = 0;
      url += 'put';
    } else {
      new_data[index].like = 1;
      url += 'add';
    }
    setVideo(new_data);

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

  const activeMenuHandler = value => {
    if (value && video.length === 0 && isAudio) {
      getData('/get_video_ids', {ids: data.ids_video}, setVideo);
    } else if (!value && audio.length === 0 && isVideo) {
      getData('/get_audio_ids', {ids: data.ids_audio}, setAudio);
    }
    set_menu_status(value);
    setActiveIndex(-1);
  };

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
              label: checkLanguageConst('Playlists', auth.translations),
              backHandler,
            },
          })}
          {isVideo &&
            isAudio &&
            settingsRoutes[auth.theme].PlayListMenu({
              activeMenuHandler,
              menu_status,
              translations: auth.translations,
              label: checkLanguage(data.label, auth.language).toUpperCase(),
            })}
          <View
            style={{alignItems: 'center', width: menu_status ? '90%' : '100%'}}>
            {load ? (
              <LoaderIn />
            ) : menu_status ? (
              <FlatList
                style={{width: '100%'}}
                contentContainerStyle={{paddingBottom: 100}}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={Refreshing}
                    onRefresh={() =>
                      getData('/get_video_ids', {ids: data.ids_video}, setVideo)
                    }
                    colors={[ColorsStyles.colorTextError]}
                  />
                }
                data={video}
                renderItem={({item, index}) =>
                  settingsRoutes[auth.theme].VideoItem({
                    item: item,
                    translations: auth.translations,
                    activeIndex: activeIndex,
                    index: index,
                    itemHandler: itemHandler,
                    language: auth.language,
                    accessHandler: null,
                    likeHandler: likeVideo,
                    token: auth.token,
                    fullScreenHandler: fullScreenHandler,
                    dostup: 'view',
                    theme: auth.theme,
                  })
                }
              />
            ) : (
              <FlatList
                style={{width: '100%'}}
                contentContainerStyle={{paddingBottom: 180, paddingTop: 20}}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={Refreshing}
                    onRefresh={() =>
                      getData('/get_audio_ids', {ids: data.ids_audio}, setAudio)
                    }
                    colors={[ColorsStyles.colorTextError]}
                  />
                }
                data={audio}
                renderItem={({item, index}) => (
                  <AudioItem
                    activeIndex={activeIndexA}
                    itemHandler={audioHandler}
                    index={index}
                    item={item}
                    likeHandler={likeAudio}
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

export default Playlist;

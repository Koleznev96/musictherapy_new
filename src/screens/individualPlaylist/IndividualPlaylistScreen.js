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
import {settingsRoutes} from '../../../Settings/routes/settingsRoutes';
const {width, height} = Dimensions.get('screen');

const img_pause = require('./resources/ui_pause.png');
const img_play = require('./resources/ui_play.png');

function IndividualPlaylistScreen({navigation, route}) {
  const {data_root} = route?.params;
  const auth = useContext(AuthContext);
  const {loading, request, error, clearError} = useHttp();
  const [data, setData] = useState([]);
  const [Refreshing, setRefreshing] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeItem, setActivItem] = useState(null);
  const [loader, setLoader] = useState(false);
  const [clear, setClear] = useState(false);
  const [uploadText, setUploadText] = useState('Ваш плейлист формируется!!!');
  const [render, setRender] = useState(true);

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
    setRender(true);
    setActiveIndex(-1);
    setActivItem(null);
    setLoader(true);
    try {
      const data = await request(
        `/api/individual_playlist/init`,
        'POST',
        {
          ...data_root,
        },
        {
          Authorization: `${auth.token}`,
        },
      );
      setData(data.data);
      setTimeout(() => {
        setUploadText(
          data.data?.length > 0
            ? 'Приятного прослушивания 😊'
            : checkLanguageConst(
                'Для данного набора параметров не получилось сформировать плейлист, попробуйте снова',
                auth.language,
              ),
        );
        if (!(data.data?.length > 0)) setRender(false);
      }, 1000);
      if (data.data?.length > 0)
        setTimeout(() => {
          setUploadText(null);
          itemHandler(0, data.data[0]);
          setRender(false);
        }, 2000);
      setLoader(false);
    } catch (e) {}
  };

  useEffect(() => {
    // setTimeout(() => {setUploadText('Приятного прослушивания 😊')}, 2000);
    // setTimeout(() => {setUploadText(null)}, 3010);
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
    let url = '/api/data/audio/like/';
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

  const arrayToString = array => {
    let new_array = array?.map(item =>
      checkLanguageConst(item, auth.translations).toLowerCase(),
    );
    return new_array.join(', ');
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
              label: checkLanguageConst('Плейлист', auth.translations),
              backHandler,
            },
          })}
          <View style={styles.block}>
            {uploadText !== null ? (
              <Text style={styles.upload_text}>
                {checkLanguageConst(uploadText, auth.language)}
              </Text>
            ) : null}
            {render ? (
              <>
                <LoaderIn />
              </>
            ) : data?.length ? (
              <FlatList
                style={{width: '100%'}}
                contentContainerStyle={{paddingBottom: 180, paddingTop: 0}}
                showsVerticalScrollIndicator={false}
                // refreshControl={
                //     <RefreshControl
                //         refreshing={Refreshing}
                //         onRefresh={() => getData()}
                //         colors={[ColorsStyles.colorTextError]}
                //     />
                // }
                data={data}
                renderItem={({item, index}) => (
                  <View
                    style={{
                      paddingLeft: 10,
                      paddingRight: 10,
                      justifyContent: 'center',
                      backgroundColor: '#154073',
                      width: '100%',
                      minHeight: 80,
                      paddingVertical: 8,
                      borderBottomWidth: 1,
                      borderBottomColor: '#969696',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity
                          onPress={() => itemHandler(index, item)}
                          style={{marginRight: 15}}>
                          <Image
                            source={
                              activeIndex === index ? img_pause : img_play
                            }
                            style={{width: 30, height: 30}}
                          />
                        </TouchableOpacity>
                        <View style={{width: width - 105}}>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 14,
                              width: width - 105,
                            }}>
                            {checkLanguage(item.label, auth.language)}
                          </Text>
                          {item.instruments?.length ? (
                            <Text
                              style={[
                                settingsRoutes[auth.theme].GlobalStyle
                                  .CustomFontLite,
                                styles.instruments,
                              ]}>
                              {arrayToString(item.instruments)}
                            </Text>
                          ) : null}
                        </View>
                      </View>
                      <TouchableOpacity
                        style={styles.button_like}
                        onPress={() => likeHandler(item, index)}>
                        {settingsRoutes[auth.theme].icons({
                          id: item.like === 1 ? 'like_active' : 'like',
                        })}
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            ) : (
              <Text
                style={{
                  width: '100%',
                  fontSize: 16,
                  textAlign: 'center',
                  marginTop: 25,
                }}>
                {/* {checkLanguageConst('Для данного набора параметров не получилось сформировать плейлист, попробуйте снова', auth.language)} */}
              </Text>
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

export default IndividualPlaylistScreen;

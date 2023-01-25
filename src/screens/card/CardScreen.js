import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  Linking,
  RefreshControl,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from '../../context/authContext';
import {useHttp} from '../../hooks/http.hook';
import {styles} from './useStyles';
import GlobalStyle from '../../components/GlobalStyle';
import {HeaderRoot} from '../../components/headerRoot/HeaderRoot';
import {ColorsStyles} from '../../constants/ColorsStyles';
import {LoaderIn} from '../../components/loader/minLoader/LoaderIn';
import {httpServer} from '../../../const';
import {checkLanguageConst} from '../../hooks/useLanguage';
import {settingsRoutes} from '../../../Settings/routes/settingsRoutes';

function CardScreen({navigation, route}) {
  const {data_root} = route.params;
  const auth = useContext(AuthContext);
  const {loading, request, error, clearError} = useHttp();
  const [Refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const [counterPage, setCounterPage] = useState(0);
  const [end_page, set_end_page] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loaderPaginashion, setLoaderPaginashion] = useState(false);

  const getData = async () => {
    setLoader(true);
    try {
      const data = await request(`${data_root.url}ios/0`, 'GET', null, {
        Authorization: `${auth.token}`,
      });
      setData(data.data);
      setCounterPage(data.data.length);
      set_end_page(data.end_page);
      setLoader(false);
    } catch (e) {}
  };

  useEffect(() => {
    getData();
  }, [auth.token]);

  const paginashion = async () => {
    if (end_page) {
      return 0;
    }

    try {
      setLoaderPaginashion(true);
      const answer = await request(
        `${data_root.url}ios/${counterPage}`,
        'GET',
        null,
        {
          Authorization: `${auth.token}`,
        },
      );
      setData([...data, ...answer.data]);
      setCounterPage(counterPage + answer.data.length);
      set_end_page(answer.end_page);
      setLoaderPaginashion(false);
    } catch (e) {}
  };

  const nextHandler = url => {
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  const backHandler = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      style={{flex: 1, justifyContent: 'space-between', alignItems: 'center'}}
      source={
        data_root?.background_img
          ? data_root?.background_img
          : settingsRoutes[auth.theme].backgroundSettings.img_1
      }>
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
            <Text
              style={[
                settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
                styles.label,
                {color: settingsRoutes[auth.theme].ColorsStyles.text},
              ]}>
              {checkLanguageConst('AnnouncementsTitle', auth.translations)}
            </Text>
            {loader ? (
              <LoaderIn />
            ) : (
              <FlatList
                // onEndReached={paginashion}
                // onEndReachedThreshold={0.3}
                showsVerticalScrollIndicator={false}
                style={{width: '100%'}}
                contentContainerStyle={{paddingBottom: 100}}
                refreshControl={
                  <RefreshControl
                    refreshing={Refreshing}
                    onRefresh={() => getData()}
                    colors={[ColorsStyles.colorTextError]}
                  />
                }
                data={data}
                renderItem={
                  ({item, index}) =>
                    settingsRoutes[auth.theme].EventItem({
                      item,
                      nextHandler,
                      translations: auth.translations,
                      httpServer,
                    })
                  // <View style={styles.item_block}>
                  //   <Image
                  //     source={{uri: httpServer + '/' + item.img}}
                  //     style={styles.item_img}
                  //   />
                  //   <TouchableOpacity
                  //     style={[styles.item_button]}
                  //     onPress={() => nextHandler(item.url)}>
                  //     <Text
                  //       style={[
                  //         settingsRoutes[auth.theme].GlobalStyle
                  //           .CustomFontRegular,
                  //         styles.item_button_text,
                  //       ]}>
                  //       {checkLanguageConst('Купить билеты', auth.translations)}
                  //     </Text>
                  //   </TouchableOpacity>
                  // </View>
                }
              />
            )}
          </View>
        </SafeAreaView>
      </ImageBackground>
    </ImageBackground>
  );
}

export default CardScreen;

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
import {HeaderDop} from '../../components/headerDop/HeaderDop';
import {CourseContext} from '../../context/CourseContext';
import {settingsRoutes} from '../../../Settings/routes/settingsRoutes';

const dateToString = date => {
  date = new Date(date);

  let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  let month =
    date.getMonth() > 8 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  let year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

function CoursesScreen({navigation, route}) {
  const {data_root} = route.params;
  const popapRoot = useContext(PopapContext);
  const courseRoot = useContext(CourseContext);
  const auth = useContext(AuthContext);
  const [Refreshing, setRefreshing] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  console.log('courseRoot?.data-', courseRoot?.data);

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

  const startCourseHandler = data => {
    if (!data.avalibel) return null;
    if (data.status) {
      navigation.navigate({
        name: 'LessonCourse',
        params: {
          data_root: data,
          number:
            data.status.current_lesson >= data.length_lessons - 1
              ? data.status.current_lesson
              : data.status.current_lesson + 1,
          data_user_test: data.status,
        },
      });
    } else {
      navigation.navigate({name: 'InfoCourse', params: {data_root: data}});
    }
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
              label: checkLanguageConst('Courses', auth.translations),
              backHandler,
              back_text: '',
            }}
          /> */}
          {settingsRoutes[auth.theme].HeaderDop({
            translations: auth.translations,
            data: {
              label: checkLanguageConst('Courses', auth.translations),
              backHandler,
              back_text: '',
            },
          })}
          <View style={styles.block}>
            {courseRoot?.loader ? (
              <LoaderIn />
            ) : (
              <FlatList
                style={{width: '100%'}}
                contentContainerStyle={{paddingBottom: 100}}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={Refreshing}
                    onRefresh={() => courseRoot.getData()}
                    colors={[ColorsStyles.colorTextError]}
                  />
                }
                data={courseRoot?.data}
                renderItem={({item, index}) =>
                  settingsRoutes[auth.theme].CourseItem({
                    item,
                    index,
                    activeIndex,
                    itemHandler,
                    startCourseHandler,
                    httpServer,
                    translations: auth.translations,
                    language: auth.language,
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

export default CoursesScreen;

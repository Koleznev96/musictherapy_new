import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './useStyles';
import {HeaderDop} from '../../../components/headerDop/HeaderDop';
import {AuthContext} from '../../../context/authContext';
import {useHttp} from '../../../hooks/http.hook';
import {ColorsStyles} from '../../../constants/ColorsStyles';
import {LoaderIn} from '../../../components/loader/minLoader/LoaderIn';
import GlobalStyle from '../../../components/GlobalStyle';
import {checkLanguage, checkLanguageConst} from '../../../hooks/useLanguage';
import {PopapContext} from '../../../context/PopapContext';
import {DataContext} from '../../../context/DataContext';
import {httpServer} from '../../../../const';
import {GlobalSvgSelector} from '../../../assets/GlobalSvgSelector';
import {CourseContext} from '../../../context/CourseContext';
import {MarkdownView} from 'react-native-markdown-view';
import Markdown from 'react-native-markdown-package';
import {settingsRoutes} from '../../../../Settings/routes/settingsRoutes';

function LessonCourseScreen({navigation, route}) {
  const {data_root, number, data_user_test} = route.params;
  const dataRoot = useContext(CourseContext);
  const auth = useContext(AuthContext);
  const popapRoot = useContext(PopapContext);
  const {loading, request, error, clearError} = useHttp();
  const [loader, setLoader] = useState(false);
  const [lesson_data, set_lesson_data] = useState(null);
  const [ok_lesson, set_ok_lesson] = useState(null);
  const [status_next, set_status_next] = useState(true);
  const [status_prev, set_status_prev] = useState(false);
  const [curent_number, set_curent_number] = useState(0);
  const [curent_answer, set_curent_answer] = useState(null);
  const [activeIndex, setActiveIndex] = useState(true);

  const backHandler = () => {
    dataRoot.updateHandler();
    navigation.navigate('Courses');
  };

  const getData = async number => {
    setLoader(true);
    set_curent_number(number);
    try {
      const data = await request(
        `/api/data/get_lesson_course/${data_root._id}/${data_user_test._id}/${number}`,
        'GET',
        null,
        {
          Authorization: `${auth.token}`,
        },
      );
      set_lesson_data(data.lesson_data);
      set_ok_lesson(data.ok_lesson);
      set_status_next(data.lesson_data.length_lessons - 1 > number);
      set_status_prev(number !== 0);
    } catch (e) {}
    setLoader(false);
  };

  useEffect(() => {
    getData(number);
  }, []);

  const menuQuestionsHandler = status => {
    if (status === 'next') getData(curent_number + 1);
    if (status === 'prev') getData(curent_number - 1);
  };

  const replyHandler = async () => {
    if (ok_lesson) return null;
    try {
      const data = await request(
        `/api/data/answer_question_lesson`,
        'POST',
        {
          id: data_root._id,
          number: curent_number,
          user_course_id: data_user_test._id,
        },
        {
          Authorization: `${auth.token}`,
        },
      );
      set_ok_lesson(data);
      if (status_next) menuQuestionsHandler('next');
    } catch (e) {}
  };

  const completeHandler = async status_ans => {
    setLoader(true);
    try {
      const data = await request(
        `/api/data/complete_course`,
        'POST',
        {
          id: data_root._id,
          user_course_id: data_user_test._id,
          status_return: status_ans ? true : false,
        },
        {
          Authorization: `${auth.token}`,
        },
      );
      if (data.status) {
        // Перекидываем на результат
        navigation.navigate({
          name: 'ResultCourse',
          params: {user_course: data.result, data_root},
        });
      } else {
        // Попа с подтверждением
        popapRoot.dataChange(
          DataPopap(checkLanguageConst('EndCourseWarning', auth.translations)),
        );
        popapRoot.openHandler();
        setLoader(false);
      }
    } catch (e) {}
    setLoader(false);
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
        onPress={() => {
          popapRoot.exitHandler();
          completeHandler(true);
        }}>
        <Text
          style={[
            settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
            styles.item_text,
          ]}>
          {checkLanguageConst('Yes', auth.translations)}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const fullScreenHandler = data => {
    navigation.navigate({
      name: 'FullVideo',
      params: data,
    });
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
          {/* <HeaderDop
            data={{
              label: checkLanguageConst('Courses', auth.translations),
              backHandler,
              back_text: 'AllCourses',
            }}
          /> */}
          {settingsRoutes[auth.theme].HeaderDop({
            translations: auth.translations,
            data: {
              label: checkLanguageConst('Courses', auth.translations),
              backHandler,
              back_text: 'AllCourses',
            },
          })}
          <View style={styles.block}>
            {loader ? (
              <LoaderIn />
            ) : (
              <ScrollView
                style={styles.scroll}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollView}>
                <Text
                  style={[
                    settingsRoutes[auth.theme].GlobalStyle.CustomFontBold,
                    styles.label,
                    {color: settingsRoutes[auth.theme].ColorsStyles.text},
                  ]}>
                  {checkLanguage(data_root?.label, auth.language).toUpperCase()}
                </Text>
                {lesson_data?.video ? (
                  <View
                    style={{
                      width: '100%',
                      height: 160,
                      borderRadius: 16,
                      marginTop: 10,
                      backgroundColor: 'rgba(198, 198, 198, 0.54)',
                    }}>
                    <ImageBackground
                      source={{uri: httpServer + '/' + lesson_data?.poster}}
                      style={{
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        borderRadius: 16,
                      }}
                      imageStyle={{borderRadius: 16}}>
                      <ImageBackground
                        style={{
                          width: '100%',
                          height: '100%',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        imageStyle={{
                          backgroundColor: 'rgba(0, 0, 0, 0.38)',
                          borderRadius: 16,
                        }}>
                        <TouchableOpacity
                          onPress={() => fullScreenHandler(lesson_data)}>
                          <Image
                            style={{width: 52, height: 52}}
                            source={require('../../../components/audioPlayer/resources/ui_play.png')}
                          />
                        </TouchableOpacity>
                      </ImageBackground>
                    </ImageBackground>
                  </View>
                ) : null}

                <View
                  style={[
                    activeIndex ? styles.item_block_active : styles.item_block,
                    {
                      backgroundColor:
                        settingsRoutes[auth.theme].ColorsStyles
                          .backgroundOpacityTwo,
                    },
                  ]}>
                  <TouchableOpacity
                    style={[styles.item_button]}
                    onPress={() => setActiveIndex(!activeIndex)}>
                    <Text
                      style={[
                        activeIndex
                          ? settingsRoutes[auth.theme].GlobalStyle
                              .CustomFontBold
                          : settingsRoutes[auth.theme].GlobalStyle
                              .CustomFontMedium,
                        styles.item_name,
                        {color: settingsRoutes[auth.theme].ColorsStyles.text},
                      ]}>
                      {checkLanguage(
                        lesson_data?.label,
                        auth.language,
                      ).toUpperCase()}
                    </Text>
                    {settingsRoutes[auth.theme].icons({
                      id: activeIndex ? 'arrow_bottom' : 'arrow_top',
                    })}
                  </TouchableOpacity>
                  {activeIndex ? (
                    <Markdown
                      styles={styleMarkdoun(
                        settingsRoutes[auth.theme].ColorsStyles.text,
                      )}
                      onLink={url =>
                        Linking.openURL(
                          url.catch(err =>
                            console.error('An error occurred', err),
                          ),
                        )
                      }>
                      {checkLanguage(lesson_data?.text, auth.language)}
                    </Markdown>
                  ) : null}
                </View>
              </ScrollView>
            )}
          </View>
          <View style={{height: 50, width: '100%'}} />
          <View style={styles.block_futer}>
            <TouchableOpacity
              style={styles.button_trev}
              onPress={() => {
                status_prev ? menuQuestionsHandler('prev') : backHandler();
              }}>
              <View style={styles.wrapper_bl}>
                {settingsRoutes[auth.theme].icons({id: 'arrow_left_t'})}
                <Text
                  style={[
                    settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
                    styles.button_menu_item,
                  ]}>
                  {checkLanguageConst('Back', auth.translations)}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={ok_lesson ? styles.button_ok_def : styles.button_ok}
              onPress={() => replyHandler()}>
              <View style={styles.border_button}>
                <Text
                  style={[
                    settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
                    styles.button_ok_text,
                  ]}>
                  {checkLanguageConst('AllClear', auth.translations)}!
                </Text>
              </View>
            </TouchableOpacity>
            {status_next ? (
              <TouchableOpacity
                style={styles.button_trev}
                onPress={() => menuQuestionsHandler('next')}>
                <View style={styles.wrapper_bl}>
                  {settingsRoutes[auth.theme].icons({id: 'arrow_rigth_t'})}
                  <Text
                    style={[
                      settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
                      styles.button_menu_item,
                    ]}>
                    {checkLanguageConst('Forward', auth.translations)}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.button_trev}
                onPress={() => completeHandler()}>
                <Text
                  style={[
                    settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
                    styles.button_return_text,
                  ]}>
                  {checkLanguageConst('Complete', auth.translations)}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
      </ImageBackground>
    </ImageBackground>
  );
}

export default LessonCourseScreen;

const styleMarkdoun = color => ({
  heading1: {
    // color: 'red'
  },
  heading2: {
    // color: 'green',
    textAlign: 'right',
  },
  strong: {
    // color: 'blue'
  },
  em: {
    // color: 'cyan'
  },
  text: {
    color: color,
    fontSize: 14,
  },
  blockQuoteText: {
    // color: 'grey'
  },
  blockQuoteSection: {
    flexDirection: 'row',
  },
  blockQuoteSectionBar: {
    width: 3,
    height: null,
    backgroundColor: '#DDDDDD',
    marginRight: 15,
  },
  codeBlock: {
    fontFamily: 'Courier',
    fontWeight: '500',
    backgroundColor: '#DDDDDD',
  },
  tableHeader: {
    backgroundColor: 'grey',
  },
});

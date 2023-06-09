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
import {DataContext} from '../../../context/DataContext';
import {GlobalSvgSelector} from '../../../assets/GlobalSvgSelector';
import BarChart from '../../../components/dist/BarChart';
import {Dimensions} from 'react-native';
import {settingsRoutes} from '../../../../Settings/routes/settingsRoutes';
const screenWidth = Dimensions.get('window').width;

const dateToString = date => {
  date = new Date(date);

  let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  let month =
    date.getMonth() > 8 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  let year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

function ResultTestScreen({navigation, route}) {
  const {user_test_id, test_id} = route.params;
  const auth = useContext(AuthContext);
  const {loading, request, error, clearError} = useHttp();
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState(null);
  const dataRoot = useContext(DataContext);
  const [activeIndex, setActiveIndex] = useState([0]);
  const [activeNestingIndex, setActiveNestingIndex] = useState([0]);

  const chartConfig = {
    backgroundGradientFrom: '#FFF',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#FFF',
    backgroundGradientToOpacity: 0.5,
    color: index => `rgba(0, 0, 0, ${index})`,
    data: [],
    strokeWidth: 2,
    useShadowColorFromDataset: true,
  };

  const viewHandler = (
    index,
    listIndex = activeIndex,
    udateList = setActiveIndex,
  ) => {
    let list_index = [...listIndex];
    const delete_index = listIndex?.indexOf(index);
    if (delete_index !== -1) {
      list_index.splice(delete_index, 1);
    } else {
      list_index.push(index);
    }
    udateList([...list_index]);
  };

  const [dataGraph, setDataGraph] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        colors: [],
      },
    ],
  });

  const backHandler = () => {
    dataRoot.updateHandler();
    navigation.navigate('Tests');
  };

  const [dataLin, setDataLin] = useState([]);

  const getData = async () => {
    setLoader(true);
    try {
      let result = await request(
        `/api/data/test_return_result/${test_id}/${user_test_id}`,
        'GET',
        null,
        {
          Authorization: `${auth.token}`,
        },
      );
      result.result = result.result?.reverse();

      const answer = result.result;
      const test = result.test;
      let lit = {
        labels: [],
        datasets: [
          {
            data: [],
            colors: [],
          },
        ],
      };
      const copy_answer = [].concat(answer).reverse();
      for (let j = 0; j < copy_answer.length; j++) {
        lit.labels.push(dateToString(copy_answer[j].date_end));
        lit.datasets[0].data.push(copy_answer[j].result?.balls);
        const color = test?.result?.find(
          item =>
            item.start_balls <= copy_answer[j].result?.balls &&
            copy_answer[j].result?.balls <= item.end_balls,
        )?.color;
        result.result[j].color = color;
        lit.datasets[0].colors.push(color ? color : 'rgba(0, 0, 0, 1)');
      }
      setData(result);
      setDataGraph(lit);
      const new_width = (screenWidth * 90) / 100 - 38;
      let data_lin = [];
      let max = test?.result?.reduce((acc, curr) =>
        acc.end_balls > curr.end_balls ? acc : curr,
      ).end_balls;
      let min = test?.result?.reduce((acc, curr) =>
        acc.start_balls <= curr.start_balls ? acc : curr,
      ).start_balls;
      let size = max - min;
      test?.result?.forEach(item => {
        let st = {
          start_balls: item.start_balls ?? 0,
          end_balls: item.end_balls ?? 0,
          color: item.color ?? 'rgba(0, 0, 0, 3)',
          width: (new_width / size) * (item.end_balls - item.start_balls),
        };
        data_lin.push(st);
      });
      setDataLin({data: data_lin, size, min, max});
    } catch (e) {}
    setLoader(false);
  };

  useEffect(() => {
    getData();
  }, []);

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
              label: checkLanguageConst('Tests', auth.translations),
              backHandler,
              back_text: 'AllTests',
            }}
          /> */}
          {settingsRoutes[auth.theme].HeaderDop({
            translations: auth.translations,
            data: {
              label: checkLanguageConst('Tests', auth.translations),
              backHandler,
              back_text: 'AllTests',
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
                  {checkLanguage(data?.test?.label, auth.language)}
                </Text>
                <BarChart
                  style={{
                    marginBottom: 15,
                    marginTop: 10,
                    backgroundColor: '#FFF',
                  }}
                  data={dataGraph}
                  width={(screenWidth * 90) / 100}
                  height={200}
                  fromZero={true}
                  chartConfig={chartConfig}
                  showBarTops={false}
                  // showValuesOnTopOfBars
                  // verticalLabelRotation={30}
                />
                {data?.result?.map((result, index_r) => (
                  <View style={styles.viewBlock}>
                    <TouchableOpacity
                      style={[styles.block_v_button]}
                      onPress={() =>
                        viewHandler(
                          index_r,
                          activeNestingIndex,
                          setActiveNestingIndex,
                        )
                      }>
                      {settingsRoutes[auth.theme].icons({
                        id:
                          activeNestingIndex?.indexOf(index_r) !== -1
                            ? 'arrow_bottom'
                            : 'arrow_top',
                      })}
                      <Text
                        style={[
                          settingsRoutes[auth.theme].GlobalStyle.CustomFontBold,
                          styles.item_label,
                          {color: settingsRoutes[auth.theme].ColorsStyles.text},
                        ]}>
                        {`${dateToString(result?.date_end)} - ${
                          result?.result?.balls
                        } ${checkLanguageConst('балов', auth.translations)}`}
                      </Text>
                    </TouchableOpacity>
                    {activeNestingIndex?.indexOf(index_r) !== -1 && (
                      <>
                        <View
                          style={{
                            width: '100%',
                            paddingHorizontal: 6,
                            paddingVertical: 4,
                            borderRadius: 12,
                            backgroundColor: '#FFFFFF',
                            marginBottom: 14,
                            marginTop: 8,
                          }}>
                          <Text
                            style={[
                              settingsRoutes[auth.theme].GlobalStyle
                                .CustomFontRegular,
                              styles.text_result,
                            ]}>
                            {checkLanguageConst('Date', auth.translations)}:{' '}
                            {dateToString(result?.date_end)}
                          </Text>
                          <Text
                            style={[
                              settingsRoutes[auth.theme].GlobalStyle
                                .CustomFontRegular,
                              styles.text_result,
                            ]}>
                            {checkLanguageConst(
                              'NumberPointsScored',
                              auth.translations,
                            )}
                            : {result?.result?.balls}
                          </Text>
                          <Text
                            style={[
                              settingsRoutes[auth.theme].GlobalStyle
                                .CustomFontRegular,
                              styles.text_result,
                            ]}>
                            {`${checkLanguageConst(
                              'YourResult',
                              auth.translations,
                            )}: ${checkLanguage(
                              result?.result?.description,
                              auth.language,
                            )}`}
                          </Text>
                        </View>

                        <View style={styles.graph}>
                          <View style={styles.graph_lin}>
                            <View style={styles.graph_lin_block}>
                              <View
                                style={[
                                  styles.graph_lin_block__item,
                                  {
                                    width:
                                      (((screenWidth * 90) / 100 - 38) /
                                        dataLin?.size) *
                                      result?.result?.balls,
                                    backgroundColor: result.color,
                                  },
                                ]}
                              />
                            </View>
                            <Text
                              style={[
                                settingsRoutes[auth.theme].GlobalStyle
                                  .CustomFontBold,
                                styles.graph_lin_block__text,
                              ]}>
                              {dataLin?.max}
                            </Text>
                          </View>
                          <View style={styles.graph_res}>
                            {dataLin?.data?.map((item, index) => (
                              <View
                                key={index}
                                style={[
                                  styles.graph_res_item,
                                  {width: item.width},
                                ]}>
                                <Text
                                  style={[
                                    settingsRoutes[auth.theme].GlobalStyle
                                      .CustomFontRegular,
                                    styles.graph_res_item__text,
                                    {color: item.color},
                                  ]}>
                                  {`[${item.start_balls}`}
                                </Text>
                                <Text
                                  style={[
                                    settingsRoutes[auth.theme].GlobalStyle
                                      .CustomFontRegular,
                                    styles.graph_res_item__text,
                                    {color: item.color},
                                  ]}>
                                  {`${item.end_balls}]`}
                                </Text>
                              </View>
                            ))}
                          </View>
                        </View>

                        <View
                          style={[
                            activeIndex?.indexOf(index_r) !== -1
                              ? styles.item_block_active
                              : styles.item_block,
                            {
                              backgroundColor:
                                settingsRoutes[auth.theme].ColorsStyles
                                  .backgroundOpacityTwo,
                            },
                          ]}>
                          <TouchableOpacity
                            style={[styles.item_button]}
                            onPress={() => viewHandler(index_r)}>
                            <Text
                              style={[
                                activeIndex?.indexOf(index_r) !== -1
                                  ? settingsRoutes[auth.theme].GlobalStyle
                                      .CustomFontBold
                                  : settingsRoutes[auth.theme].GlobalStyle
                                      .CustomFontMedium,
                                styles.item_name,
                                {
                                  color:
                                    settingsRoutes[auth.theme].ColorsStyles
                                      .text,
                                },
                              ]}>
                              {checkLanguageConst(
                                'YourAnswers',
                                auth.translations,
                              )}
                            </Text>
                            {settingsRoutes[auth.theme].icons({
                              id:
                                activeIndex?.indexOf(index_r) !== -1
                                  ? 'arrow_bottom'
                                  : 'arrow_top',
                            })}
                          </TouchableOpacity>
                          {activeIndex?.indexOf(index_r) !== -1
                            ? result?.data?.map((item, index) => (
                                <View style={styles.item_item}>
                                  <Text
                                    style={[
                                      settingsRoutes[auth.theme].GlobalStyle
                                        .CustomFontRegular,
                                      styles.item_text,
                                      {
                                        color:
                                          settingsRoutes[auth.theme]
                                            .ColorsStyles.text,
                                      },
                                    ]}>
                                    {`${checkLanguageConst(
                                      'Question',
                                      auth.translations,
                                    )} ${index + 1}. ${checkLanguage(
                                      item.question,
                                      auth.language,
                                    )}`}
                                  </Text>
                                  <Text
                                    style={[
                                      settingsRoutes[auth.theme].GlobalStyle
                                        .CustomFontRegular,
                                      styles.item_text,
                                      {
                                        color:
                                          settingsRoutes[auth.theme]
                                            .ColorsStyles.text,
                                      },
                                    ]}>
                                    {`${checkLanguageConst(
                                      'Answer',
                                      auth.translations,
                                    )} ${index + 1}. ${
                                      item.answer?.answer
                                        ? item.answer?.answer
                                        : '-'
                                    }`}
                                  </Text>
                                </View>
                              ))
                            : null}
                        </View>
                      </>
                    )}
                  </View>
                ))}
                <View style={{width: '100%', height: 100}} />
              </ScrollView>
            )}
          </View>
        </SafeAreaView>
      </ImageBackground>
    </ImageBackground>
  );
}

export default ResultTestScreen;

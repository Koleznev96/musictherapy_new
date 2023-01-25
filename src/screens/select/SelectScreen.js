import React, {useContext} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from '../../context/authContext';
import {styles} from './useStyles';
import {ColorsStyles} from '../../constants/ColorsStyles';
import {checkLanguageConst} from '../../hooks/useLanguage';
import {settingsRoutes} from '../../../Settings/routes/settingsRoutes';

function SelectScreen({navigation, route}) {
  const auth = useContext(AuthContext);
  const {title, data, value_code, label_code, select_handler, selectedValue} =
    route.params;

  const backHandler = () => {
    navigation.goBack();
  };

  const itemHandler = item => {
    select_handler(item[value_code]);
    backHandler();
  };

  return (
    <ImageBackground
      source={settingsRoutes[auth.theme].backgroundSettings.img_2}
      style={{flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
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
            label: checkLanguageConst(title, auth.translations),
            backHandler,
          },
        })}
        <FlatList
          style={{width: '100%', height: '100%'}}
          contentContainerStyle={{paddingBottom: 20, paddingTop: 20}}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.item_button,
                {
                  backgroundColor:
                    settingsRoutes[auth.theme].ColorsStyles
                      .backgroundOpacityFre,
                },
              ]}
              onPress={() => itemHandler(item)}>
              <Text
                style={[
                  selectedValue === item[value_code]
                    ? settingsRoutes[auth.theme].GlobalStyle.CustomFontExtraBold
                    : settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
                  selectedValue === item[value_code]
                    ? {
                        fontSize: 22,
                        color:
                          settingsRoutes[auth.theme].ColorsStyles.colorSelected,
                      }
                    : {
                        ...styles.item_name,
                        color: settingsRoutes[auth.theme].ColorsStyles.text,
                      },
                ]}>
                {item[label_code]}
              </Text>
            </TouchableOpacity>
          )}
        />
        {/* <View style={styles.footer}>
          <Text
            style={[
              settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
              styles.button_footer_text,
            ]}>
            © www.MusicTherapy.by
          </Text>
        </View> */}
      </SafeAreaView>
    </ImageBackground>
  );
}

export default SelectScreen;

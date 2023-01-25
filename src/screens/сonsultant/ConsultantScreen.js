import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
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

function ConsultantScreen({navigation}) {
  const auth = useContext(AuthContext);
  const [activeIndex, setActiveIndex] = useState(-1);

  const itemHandler = index => {
    if (index === activeIndex) setActiveIndex(-1);
    else setActiveIndex(index);
  };

  const backHandler = () => {
    navigation.navigate('Home');
  };

  return (
    <ImageBackground
      source={
        settingsRoutes[auth.theme].backgroundSettings.img_consultant ||
        settingsRoutes[auth.theme].backgroundSettings.img_2
      }
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
            label: checkLanguageConst('?', auth.translations),
            backHandler,
          },
        })}
        <View style={styles.block}>
          <FlatList
            style={{width: '100%', height: '95%'}}
            contentContainerStyle={{paddingBottom: 100}}
            showsVerticalScrollIndicator={false}
            data={checkLanguageConst('consultations', auth.translations)}
            renderItem={({item, index}) =>
              settingsRoutes[auth.theme].ConsultantItem({
                translations: auth.translations,
                item,
                index,
                activeIndex,
                itemHandler,
              })
            }
          />
        </View>
        <View style={styles.footer}>
          <Text
            style={[
              settingsRoutes[auth.theme].GlobalStyle.CustomFontRegular,
              styles.button_footer_text,
            ]}>
            {settingsRoutes[auth.theme].NameCompany ?? ''}
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default ConsultantScreen;

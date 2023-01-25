import React, {useContext} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MenuSvgSelector} from './assets/MenuSvgSelector';

import StartScreen from './screens/start/StartScreen';
import GoalScreen from './screens/goal/GoalScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import ConsultantScreen from './screens/сonsultant/ConsultantScreen';

import CardScreen from './screens/card/CardScreen';
import VideoScreen from './screens/video/VideoScreen';
import AudioScreen from './screens/audio/AudioScreen';

import LoginScreen from './screens/auth/login/LoginScreen';
import RegisterScreen from './screens/auth/register/RegisterScreen';
import CodeCheckScreen from './screens/auth/codeCheck/CodeCheckScreen';
import InfoScreen from './screens/auth/info/InfoScreen';
import TestsScreen from './screens/tests/TestsScreen';
import CoursesScreen from './screens/courses/CoursesScreen';

import FullVideoScreen from './screens/fullVideo/FullVideoScreen';

import {ColorsStyles} from './constants/ColorsStyles';
import {AuthContext} from './context/authContext';
import InfoTestsScreen from './screens/tests/infoTest/InfoTestsScreen';
import QuestionTestScreen from './screens/tests/questionTest/QuestionTestScreen';
import ResultTestScreen from './screens/tests/resultTest/ResultTestScreen';
import infoCourseScreen from './screens/courses/infoCourse/infoCourseScreen';
import LessonCourseScreen from './screens/courses/lessonCourse/LessonCourseScreen';
import ResultCourseScreen from './screens/courses/resultCourse/ResultCourseScreen';
import ConstructorScreen from './screens/constructor/ConstructorScreen';
import IndividualPlaylistScreen from './screens/individualPlaylist/IndividualPlaylistScreen';
import ListPlaylist from './screens/listPlaylist/ListPlaylist';
import Playlist from './screens/playlist/Playlist';
import {settingsRoutes} from '../Settings/routes/settingsRoutes';
import SelectScreen from './screens/select/SelectScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const GoalRoutes = () => (
  <Stack.Navigator
    initialRouteName="Start"
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: forFade,
    }}>
    <Tab.Screen
      name="Start"
      component={GoalScreen}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="Audio"
      component={AudioScreen}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="Constructor"
      component={ConstructorScreen}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="IndividualPlaylist"
      component={IndividualPlaylistScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const PlaylistsRoutes = () => (
  <Stack.Navigator
    initialRouteName="ListPlaylist"
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: forFade,
    }}>
    <Tab.Screen
      name="ListPlaylist"
      component={ListPlaylist}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="Playlist"
      component={Playlist}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const HomeRoutes = () => (
  <Stack.Navigator
    initialRouteName="Start"
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: forFade,
    }}>
    <Tab.Screen
      name="Start"
      component={StartScreen}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="Card"
      component={CardScreen}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="Video"
      component={VideoScreen}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="Tests"
      component={TestsScreen}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="Courses"
      component={CoursesScreen}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="InfoTest"
      component={InfoTestsScreen}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="InfoCourse"
      component={infoCourseScreen}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="QuestionTest"
      component={QuestionTestScreen}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="LessonCourse"
      component={LessonCourseScreen}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="ResultTest"
      component={ResultTestScreen}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="ResultCourse"
      component={ResultCourseScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const StackRoutes = (isAuthenticated, translations) => {
  const auth = useContext(AuthContext);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor:
          settingsRoutes[auth.theme].ColorsStyles.colorButtonMenuActive,
        inactiveTintColor:
          settingsRoutes[auth.theme].ColorsStyles.colorButtonMenu,
        height: 240,
        style: {
          backgroundColor:
            settingsRoutes[auth.theme].ColorsStyles.backgroundFooter,
          borderTopWidth: settingsRoutes[auth.theme].ColorsStyles.HrWidth,
          borderColor: settingsRoutes[auth.theme].ColorsStyles.colorHr,
          minHeight: 60,
          paddingBottom: 10,
        },
      }}
      screenOptions={({route}) => ({
        headerShown: false,
        cardStyleInterpolator: forFade,
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Home') {
            if (!focused) return settingsRoutes[auth.theme].menu.main.icon;
            else return settingsRoutes[auth.theme].menu.main.active_icon;
          } else if (route.name === 'Consultant') {
            if (!focused)
              return settingsRoutes[auth.theme].menu.consultant.icon;
            else return settingsRoutes[auth.theme].menu.consultant.active_icon;
          } else if (route.name === 'Goal') {
            if (!focused) return settingsRoutes[auth.theme].menu.tab1.icon;
            else return settingsRoutes[auth.theme].menu.tab1.active_icon;
          } else if (route.name === 'Profile') {
            if (!focused) return settingsRoutes[auth.theme].menu.account.icon;
            else return settingsRoutes[auth.theme].menu.account.active_icon;
          } else if (route.name === 'Playlists') {
            if (!focused) return settingsRoutes[auth.theme].menu.playlists.icon;
            else return settingsRoutes[auth.theme].menu.playlists.active_icon;
          }
        },
      })}>
      {settingsRoutes[auth.theme].menu.main.isView && (
        <Tab.Screen
          name="Home"
          component={HomeRoutes}
          options={{
            headerShown: false,
            tabBarLabel:
              translations &&
              translations[settingsRoutes[auth.theme].menu.main.title]
                ? translations[settingsRoutes[auth.theme].menu.main.title]
                : settingsRoutes[auth.theme].menu.main.title,
          }}
        />
      )}
      {settingsRoutes[auth.theme].menu.tab1.isView && (
        <Tab.Screen
          name="Goal"
          component={GoalRoutes}
          options={{
            headerShown: false,
            tabBarLabel:
              translations &&
              translations[settingsRoutes[auth.theme].menu.tab1.title]
                ? translations[settingsRoutes[auth.theme].menu.tab1.title]
                : settingsRoutes[auth.theme].menu.tab1.title,
          }}
        />
      )}
      {settingsRoutes[auth.theme].menu.playlists.isView && (
        <Tab.Screen
          name="Playlists"
          component={PlaylistsRoutes}
          options={{
            headerShown: false,
            tabBarLabel:
              translations &&
              translations[settingsRoutes[auth.theme].menu.playlists.title]
                ? translations[settingsRoutes[auth.theme].menu.playlists.title]
                : settingsRoutes[auth.theme].menu.playlists.title,
          }}
        />
      )}
      {/* {isAuthenticated ? <Tab.Screen name ='Goal' component={GoalRoutes} options={{ headerShown: false, tabBarLabel: (translations && translations['']) ? translations[''] : '' }}/> : null} */}
      {settingsRoutes[auth.theme].menu.consultant.isView && (
        <Tab.Screen
          name="Consultant"
          component={ConsultantScreen}
          options={{
            headerShown: false,
            tabBarLabel:
              translations &&
              translations[settingsRoutes[auth.theme].menu.consultant.title]
                ? translations[settingsRoutes[auth.theme].menu.consultant.title]
                : settingsRoutes[auth.theme].menu.consultant.title,
          }}
        />
      )}
      {settingsRoutes[auth.theme].menu.account.isView && (
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarLabel:
              translations &&
              translations[settingsRoutes[auth.theme].menu.account.title]
                ? translations[settingsRoutes[auth.theme].menu.account.title]
                : settingsRoutes[auth.theme].menu.account.title,
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export const Routes = (isAuthenticated, translations) => {
  return (
    <NavigationContainer
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: forFade,
      }}>
      <Stack.Navigator
        initialRouteName="Root"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: forFade,
        }}>
        {/* <Tab.Screen name ='Player' component={PlayerScreen} options={{ headerShown: false }}/> */}
        <Stack.Screen
          name="Root"
          component={() => StackRoutes(isAuthenticated, translations)}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FullVideo"
          component={FullVideoScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Select"
          component={SelectScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CodeCheck"
          component={CodeCheckScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Info"
          component={InfoScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

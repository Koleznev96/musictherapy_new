import React, { useContext } from "react";
import { Platform } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {MenuSvgSelector} from './assets/MenuSvgSelector';

import StartScreen from './screens/start/StartScreen';
import GoalScreen from './screens/goal/GoalScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import ConsultantScreen from './screens/сonsultant/ConsultantScreen';

import CardScreen from './screens/card/CardScreen';
import VideoScreen from './screens/video/VideoScreen';
import AudioScreen from './screens/audio/AudioScreen';

import SplashScreen from './screens/auth/splash/SplashScreen';
import LoginScreen from './screens/auth/login/LoginScreen';
import RegisterScreen from './screens/auth/register/RegisterScreen';
import CodeCheckScreen from './screens/auth/codeCheck/CodeCheckScreen';
import InfoScreen from './screens/auth/info/InfoScreen';
import TestsScreen from "./screens/tests/TestsScreen";
import CoursesScreen from "./screens/courses/CoursesScreen";

import FullVideoScreen from './screens/fullVideo/FullVideoScreen';

import { ColorsStyles } from './constants/ColorsStyles';
import { AuthContext } from "./context/authContext";
import InfoTestsScreen from "./screens/tests/infoTest/InfoTestsScreen";
import QuestionTestScreen from "./screens/tests/questionTest/QuestionTestScreen";
import ResultTestScreen from "./screens/tests/resultTest/ResultTestScreen";
import infoCourseScreen from "./screens/courses/infoCourse/infoCourseScreen";
import LessonCourseScreen from "./screens/courses/lessonCourse/LessonCourseScreen";
import ResultCourseScreen from "./screens/courses/resultCourse/ResultCourseScreen";
import ConstructorScreen from "./screens/constructor/ConstructorScreen";
import IndividualPlaylistScreen from "./screens/individualPlaylist/IndividualPlaylistScreen";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const forFade = ({ current }) => ({ 
  cardStyle: { 
    opacity: current.progress, 
  }, 
});

const GoalRoutes = () => (
  <Stack.Navigator
    initialRouteName='Start'
    screenOptions={{ 
      headerShown: false, 
      cardStyleInterpolator: forFade, 
    }}
  >
    <Tab.Screen name ='Start' component={GoalScreen} options={{ headerShown: false }}/>
    <Tab.Screen name ='Audio' component={AudioScreen} options={{ headerShown: false }}/>
    <Tab.Screen name ='Constructor' component={ConstructorScreen} options={{ headerShown: false }}/>
    <Tab.Screen name ='IndividualPlaylist' component={IndividualPlaylistScreen} options={{ headerShown: false }}/>
  </Stack.Navigator>
)

const HomeRoutes = () => (
  <Stack.Navigator 
    initialRouteName='Start'
    screenOptions={{ 
      headerShown: false, 
      cardStyleInterpolator: forFade, 
    }}
  >
    <Tab.Screen name='Start' component={StartScreen} options={{ headerShown: false }}/>
    <Tab.Screen name='Card' component={CardScreen} options={{ headerShown: false }}/>
    <Tab.Screen name='Video' component={VideoScreen} options={{ headerShown: false }}/>
    <Tab.Screen name='Tests' component={TestsScreen} options={{ headerShown: false }}/>
    <Tab.Screen name='Courses' component={CoursesScreen} options={{ headerShown: false }}/>
    <Tab.Screen name='InfoTest' component={InfoTestsScreen} options={{ headerShown: false }}/>
    <Tab.Screen name='InfoCourse' component={infoCourseScreen} options={{ headerShown: false }}/>
    <Tab.Screen name='QuestionTest' component={QuestionTestScreen} options={{ headerShown: false }}/>
    <Tab.Screen name='LessonCourse' component={LessonCourseScreen} options={{ headerShown: false }}/>
    <Tab.Screen name='ResultTest' component={ResultTestScreen} options={{ headerShown: false }}/>
    <Tab.Screen name='ResultCourse' component={ResultCourseScreen} options={{ headerShown: false }}/>
  </Stack.Navigator>
);

const StackRoutes = (isAuthenticated, translations) => {
  const auth = useContext(AuthContext)
return (
  <Tab.Navigator
    initialRouteName='Home'
    tabBarOptions={{
      keyboardHidesTabBar: true,
      activeTintColor: ColorsStyles.colorButton,
      inactiveTintColor: ColorsStyles.colorHr,
      height: 240,
      style: {
        backgroundColor: ColorsStyles.backgroundFooter,
        borderTopWidth: 3,
        borderColor: ColorsStyles.colorHr,
        minHeight: 60,
        paddingBottom: 10,
      },
    }}
    screenOptions={({ route }) => ({
      headerShown: false, 
      cardStyleInterpolator: forFade, 
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === 'Home') {
          if (!focused)
          return (
            <MenuSvgSelector id="programs" />
          ); 
          else 
          return (
            <MenuSvgSelector id="programs_active" />
          ); 
        } else if (route.name === 'Consultant') {
          if (!focused)
          return (
            <MenuSvgSelector id="сonsultant" />
          ); 
          else 
          return (
            <MenuSvgSelector id="сonsultant_active" />
          ); 
        } else if (route.name === 'Goal') {
          if (!focused)
          return (
            <MenuSvgSelector id="goal" />
          ); 
          else 
          return (
            <MenuSvgSelector id="goal_active" />
          ); 
        } else if (route.name === 'Profile') {
          if (!focused)
          return (
            <MenuSvgSelector id="profile" />
          ); 
          else 
          return (
            <MenuSvgSelector id="profile_active" />
          ); 
        }
      }
    })}
  >
    <Tab.Screen name ='Home' component={HomeRoutes} options={{ headerShown: false, tabBarLabel: (translations && translations['Главная']) ? translations['Главная'] : 'Главная' }}/>
    {isAuthenticated ? <Tab.Screen name ='Goal' component={GoalRoutes} options={{ headerShown: false, tabBarLabel: (translations && translations['Цели']) ? translations['Цели'] : 'Цели' }}/> : null}
    <Tab.Screen name ='Consultant' component={ConsultantScreen} options={{ headerShown: false, tabBarLabel: (translations && translations['Консультант']) ? translations['Консультант'] : 'Консультант' }}/>
    <Tab.Screen name ='Profile' component={ProfileScreen} options={{ headerShown: false, tabBarLabel: (translations && translations['Аккаунт']) ? translations['Аккаунт'] : 'Аккаунт' }}/>
  </Tab.Navigator>
);
  }

export const Routes = (isAuthenticated, translations) => {
  return ( 
    <NavigationContainer
      screenOptions={{ 
        headerShown: false, 
        cardStyleInterpolator: forFade, 
      }}
    >
      <Stack.Navigator 
        initialRouteName='Root' 
        screenOptions={{ 
          headerShown: false, 
          cardStyleInterpolator: forFade, 
        }}
      >
        {/* <Tab.Screen name ='Player' component={PlayerScreen} options={{ headerShown: false }}/> */}
        <Stack.Screen name='Root' component={() => StackRoutes(isAuthenticated, translations)} options={{ headerShown: false }}/>
        <Stack.Screen name='FullVideo' component={FullVideoScreen} options={{ headerShown: false }}/>
        <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }}/>
        <Stack.Screen name='CodeCheck' component={CodeCheckScreen} options={{ headerShown: false }}/>
        <Stack.Screen name='Info' component={InfoScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
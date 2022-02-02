import React from "react";

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {MenuSvgSelector} from './assets/MenuSvgSelector';

import StartScreen from './screens/start/StartScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import ConsultantScreen from './screens/сonsultant/ConsultantScreen';

import ClassicScreen from './screens/classic/ClassicScreen';
import MeditationScreen from './screens/meditation/MeditationScreen';
import SoundScreen from './screens/sound/SoundScreen';

import SplashScreen from './screens/auth/splash/SplashScreen';
import LoginScreen from './screens/auth/login/LoginScreen';
import RegisterScreen from './screens/auth/register/RegisterScreen';
import CodeCheckScreen from './screens/auth/codeCheck/CodeCheckScreen';
import InfoScreen from './screens/auth/info/InfoScreen';

import FullVideoScreen from './screens/fullVideo/FullVideoScreen';

import { ColorsStyles } from './constants/ColorsStyles';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const forFade = ({ current }) => ({ 
  cardStyle: { 
    opacity: current.progress, 
  }, 
});

const HomeRoutes = () => (
  <Stack.Navigator 
    initialRouteName='Start'
    screenOptions={{ 
      headerShown: false, 
      cardStyleInterpolator: forFade, 
    }}
  >
    <Tab.Screen name='Start' component={StartScreen} options={{ headerShown: false, tabBarLabel: 'Elsadchess' }}/>
    <Tab.Screen name='Classic' component={ClassicScreen} options={{ headerShown: false, tabBarLabel: 'Elsadchess' }}/>
    <Tab.Screen name='Meditation' component={MeditationScreen} options={{ headerShown: false, tabBarLabel: 'Elsadchess' }}/>
    <Tab.Screen name='Sound' component={SoundScreen} options={{ headerShown: false, tabBarLabel: 'Elsadchess' }}/>
  </Stack.Navigator>
);

const StackRoutes = () => (
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
    screenOptions={{ 
      headerShown: false, 
      cardStyleInterpolator: forFade, 
    }}
    screenOptions={({ route }) => ({
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
    <Tab.Screen name ='Home' component={HomeRoutes} options={{ headerShown: false, tabBarLabel: 'Главная' }}/>
    <Tab.Screen name ='Consultant' component={ConsultantScreen} options={{ headerShown: false, tabBarLabel: 'Консультант' }}/>
    <Tab.Screen name ='Profile' component={ProfileScreen} options={{ headerShown: false, tabBarLabel: 'Аккаунт' }}/>
  </Tab.Navigator>
);

export const Routes = isAuthenticated => {
  return ( 
    <NavigationContainer
      screenOptions={{ 
        headerShown: false, 
        cardStyleInterpolator: forFade, 
      }}
    >
      {isAuthenticated ? (
        <Stack.Navigator 
          initialRouteName='Root' 
          screenOptions={{ 
            headerShown: false, 
            cardStyleInterpolator: forFade, 
          }}
        >
          <Stack.Screen name='Root' component={StackRoutes} options={{ headerShown: false }}/>
          <Stack.Screen name='FullVideo' component={FullVideoScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
      ) : ( 
        <Stack.Navigator 
          initialRouteName='Splash'
          screenOptions={{ 
            headerShown: false, 
            cardStyleInterpolator: forFade, 
          }}
        >
          <Stack.Screen name='Splash' component={SplashScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='CodeCheck' component={CodeCheckScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='Info' component={InfoScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
      )} 
    </NavigationContainer>
  );
}
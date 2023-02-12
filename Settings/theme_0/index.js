import React from 'react';
import {MenuSvgSelector} from './MenuSvgSelector';
import {Card} from './Card/Card';
import {GlobalSvgSelector} from './GlobalSvgSelector';
import GlobalStyle from './GlobalStyle';
import {AudioItemStyles} from './AudioItem/AudioItemStyles';
import {AudioPlayerSlider} from './AudioPlayerSlider/AudioPlayerSlider';
import {ButtonFull} from './buttonFull/ButtonFull';
import {ButtonLogout} from './buttonLogout/ButtonLogout';
import {ButtonInd} from './buttonInd/ButtonInd';
import {HeaderAuth} from './headerAuth/HeaderAuth';
import {HeaderDop} from './headerDop/HeaderDop';
import {HeaderRoot} from './headerRoot/HeaderRoot';
import {ColorsStyles} from './ColorsStyles';
import {Splash} from './splash/Splash';
import {ConsultantItem} from './consultantItem/ConsultantItem';
import {EventItem} from './eventItem/EventItem';
import {TestItem} from './testItem/TestItem';
import {CourseItem} from './courseItem/CourseItem';
import {ButtonMini} from './buttonMini/ButtonMini';
import {MediaItem} from './mediaItem/MediaItem';
import {VideoItem} from './video/VideoItem';
import {PlayListMenu} from './playListMenu/PlayListMenu';
import {IconView} from './iconView/IconView';

export const Theme_0 = {
  isQuestionnaire: false,
  menu: {
    main: {
      isView: true,
      title: 'Main',
      icon: <MenuSvgSelector id="programs" />,
      active_icon: <MenuSvgSelector id="programs_active" />,
    },
    tab1: {
      isView: false,
      title: 'Tab1',
      icon: <MenuSvgSelector id="goal" />,
      active_icon: <MenuSvgSelector id="goal_active" />,
    },
    playlists: {
      isView: true,
      title: 'Playlists',
      icon: <MenuSvgSelector id="playlists" />,
      active_icon: <MenuSvgSelector id="playlists_active" />,
    },
    consultant: {
      isView: true,
      title: '?',
      icon: <MenuSvgSelector id="consultant" />,
      active_icon: <MenuSvgSelector id="consultant_active" />,
    },
    account: {
      isView: true,
      title: 'Account',
      icon: <MenuSvgSelector id="profile" />,
      active_icon: <MenuSvgSelector id="profile_active" />,
    },
  },
  home_screen: {
    noAuth: [
      {
        name: 'Announcements',
        router: 'Card',
        img: require('./images/events.png'),
        url: '/api/data/v2/live_sound/',
        url_like: '/api/data/card/',
        background_img: require('./backgrounds/background_start.png'),
      },
    ],
    auth: [
      {
        name: 'CategoryOnlineCourses',
        router: 'Courses',
        img: require('./images/course.png'),
        url: '/api/data/get_list_course/',
        url_like: '/api/data/video/',
      },
      {
        name: 'Tests',
        router: 'Tests',
        img: require('./images/tests.png'),
        url: '/api/data/get_list_test/',
        url_like: '/api/data/card/',
        // background_img: require('./backgrounds/background_start.png'),
      },
    ],
  },
  GlobalStyle: GlobalStyle,
  icons: props => <GlobalSvgSelector {...props} />,
  backgroundSettings: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    img_start: require('./backgrounds/background_start.png'),
    img_1: require('./backgrounds/background.png'),
    img_2: require('./backgrounds/background.png'),
    img_splash: require('./backgrounds/background_splash.png'),
    img_logo: undefined, // undefined
    img_playlist: require('./backgrounds/background.png'), // undefined
    img_consultant: require('./backgrounds/background.png'),
  },
  card: props => <Card {...props} />,
  audioItem: {
    ...AudioItemStyles,
  },
  AudioPlayerSlider: props => <AudioPlayerSlider {...props} />,

  ButtonFull: props => <ButtonFull {...props} />,
  ButtonLogout: props => <ButtonLogout {...props} />,
  ButtonInd: props => <ButtonInd {...props} />,

  HeaderAuth: props => <HeaderAuth {...props} />,
  HeaderDop: props => <HeaderRoot {...props} />,
  HeaderRoot: props => <HeaderRoot {...props} />,

  ColorsStyles: ColorsStyles,

  Splash: props => <Splash {...props} />,

  ConsultantItem: props => <ConsultantItem {...props} />,

  NameCompany: undefined, // undefined

  EventItem: props => <EventItem {...props} />,

  TestItem: props => <TestItem {...props} />,

  CourseItem: props => <CourseItem {...props} />,

  ButtonMini: props => <ButtonMini {...props} />,

  MediaItem: props => <MediaItem {...props} />,

  VideoItem: props => <VideoItem {...props} />,

  PlayListMenu: props => <PlayListMenu {...props} />,

  IconView: props => <IconView {...props} />,
  // Components...
};

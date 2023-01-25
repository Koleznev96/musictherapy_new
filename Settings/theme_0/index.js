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
  isQuestionnaire: true,
  menu: {
    main: {
      isView: true,
      title: 'Main',
      icon: <MenuSvgSelector id="programs" />,
      active_icon: <MenuSvgSelector id="programs_active" />,
    },
    tab1: {
      isView: true,
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
        name: 'Category1',
        router: 'Video',
        img: require('./images/classic.jpg'),
        url: '/api/data/v2/classic/',
        url_: '/api/data/v2/fusion/',
        url_like: '/api/data/video/',
      },
      {
        name: 'Category2',
        router: 'Video',
        img: require('./images/meditation.jpg'),
        url: '/api/data/v2/meditation/',
        url_like: '/api/data/video/',
      },
      {
        name: 'Announcements',
        router: 'Card',
        img: require('./images/sound.jpg'),
        url: '/api/data/v2/live_sound/',
        url_like: '/api/data/card/',
      },
      {
        name: 'Category3',
        router: 'Video',
        img: require('./images/instruments.jpg'),
        url: '/api/data/v2/tool/',
        url_like: '/api/data/video/',
      },
    ],
    auth: [
      {
        name: 'Tests',
        router: 'Tests',
        img: require('./images/test.jpg'),
        url: '/api/data/get_list_test/',
        url_like: '/api/data/card/',
      },
      {
        name: 'CategoryOnlineCourses',
        router: 'Courses',
        img: require('./images/course.jpg'),
        url: '/api/data/get_list_course/',
        url_like: '/api/data/video/',
      },
    ],
  },
  GlobalStyle: GlobalStyle,
  icons: props => <GlobalSvgSelector {...props} />,
  backgroundSettings: {
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
    img_1: require('./backgrounds/background_1.jpg'),
    img_2: require('./backgrounds/background_2.jpg'),
    img_splash: require('./backgrounds/background_2.jpg'),
    img_logo: require('./backgrounds/background_logo.png'), // undefined
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
  HeaderDop: props => <HeaderDop {...props} />,
  HeaderRoot: props => <HeaderRoot {...props} />,

  ColorsStyles: ColorsStyles,

  Splash: props => <Splash {...props} />,

  ConsultantItem: props => <ConsultantItem {...props} />,

  NameCompany: '© www.MusicTherapy.by', // undefined

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

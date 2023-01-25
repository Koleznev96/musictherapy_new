import React from 'react';
import {Alert} from 'react-native';

import Sound from 'react-native-sound';
import {settingsRoutes} from '../../../Settings/routes/settingsRoutes';

Sound.setCategory('Playback');

export default class AudioPlayer extends React.Component {
  static navigationOptions = props => ({
    title: this.props.title,
  });

  constructor(props) {
    super(props);
    this.state = {
      index: this.props.activeIndex,
      playState: 'paused', //playing, paused
      playSeconds: 0,
      duration: 0,
    };
    this.sliderEditing = false;
  }

  componentDidMount() {
    this.play();

    this.timeout = setInterval(() => {
      if (
        this.sound &&
        this.sound.isLoaded() &&
        this.state.playState == 'playing' &&
        !this.sliderEditing
      ) {
        this.sound.getCurrentTime((seconds, isPlaying) => {
          this.setState({playSeconds: seconds});
        });
      }
    }, 1000);
  }

  componentDidUpdate(prevProps) {
    if (this.props.clear !== prevProps.clear && this.sound) {
      if (this.state.playState == 'playing') this.pause(true);
      else this.play(true);
    }

    if (this.props.id !== prevProps.id && this.props.filepath) {
      if (this.sound) {
        this.sound.release();
        this.sound = null;
      }
      if (this.timeout) {
        clearInterval(this.timeout);
        this.timeout = setInterval(() => {
          if (
            this.sound &&
            this.sound.isLoaded() &&
            this.state.playState == 'playing' &&
            !this.sliderEditing
          ) {
            this.sound.getCurrentTime((seconds, isPlaying) => {
              this.setState({playSeconds: seconds});
            });
          }
        }, 100);
      }
      this.play();
    }
  }

  componentWillUnmount() {
    if (this.sound) {
      this.sound.release();
      this.sound = null;
    }
    if (this.timeout) {
      clearInterval(this.timeout);
    }
  }

  onSliderEditStart = () => {
    this.sliderEditing = true;
  };
  onSliderEditEnd = () => {
    this.sliderEditing = false;
  };
  onSliderEditing = value => {
    if (this.sound) {
      this.sound.setCurrentTime(value);
      this.setState({playSeconds: value});
    }
  };

  replace = () => {
    if (this.state.index !== -1) {
      this.props.replacePlay(this.state.index);
    }
  };

  play = async () => {
    if (this.sound) {
      this.setState({playState: 'playing'});
      this.sound.play(this.playComplete);
    } else {
      const filepath = this.props.filepath;
      var dirpath = '';
      if (this.props?.dirpath) {
        dirpath = this.props.dirpath;
      }
      this.sound = new Sound(filepath, dirpath, error => {
        if (error) {
          Alert.alert('Notice', 'audio file error. (Error code : 1)');
          this.setState({playState: 'paused'});
        } else {
          this.setState({
            playState: 'playing',
            index: this.props.activeIndex,
            duration: this.sound?.getDuration(),
          });
          this.sound.play(this.playComplete);
        }
      });
    }
  };
  playComplete = success => {
    if (this.sound) {
      if (success) {
        this.props.nextSound();
      } else {
        // Alert.alert('Notice', 'audio file error. (Error code : 2)');
      }
      // this.props.nextSound();

      this.setState({playState: 'paused', playSeconds: 0});
      this.sound.setCurrentTime(0);
    }
  };

  pause = () => {
    if (this.sound) {
      this.sound.pause();
    }

    this.setState({playState: 'paused'});
  };

  jumpPrev15Seconds = () => {
    this.jumpSeconds(-15);
  };
  jumpNext15Seconds = () => {
    this.jumpSeconds(15);
  };
  jumpSeconds = secsDelta => {
    if (this.sound) {
      this.sound.getCurrentTime((secs, isPlaying) => {
        let nextSecs = secs + secsDelta;
        if (nextSecs < 0) nextSecs = 0;
        else if (nextSecs > this.state.duration) nextSecs = this.state.duration;
        this.sound.setCurrentTime(nextSecs);
        this.setState({playSeconds: nextSecs});
      });
    }
  };

  getAudioTimeString(seconds) {
    const h = parseInt(seconds / (60 * 60));
    const m = parseInt((seconds % (60 * 60)) / 60);
    const s = parseInt(seconds % 60);

    return (
      (h < 10 ? '0' + h : h) +
      ':' +
      (m < 10 ? '0' + m : m) +
      ':' +
      (s < 10 ? '0' + s : s)
    );
  }

  render() {
    const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
    const durationString = this.getAudioTimeString(this.state.duration);

    return settingsRoutes[this.props.theme].AudioPlayerSlider({
      currentTimeString: currentTimeString,
      durationString: durationString,
      ...this,
    });
  }
}

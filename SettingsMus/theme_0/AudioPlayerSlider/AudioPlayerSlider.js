import React from 'react';
import {
  View,
  Image,
  Text,
  Slider,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';

const img_pause = require('./resources/ui_pause.png');
const img_play = require('./resources/ui_play.png');
const img_playjumpleft = require('./resources/ui_playjumpleft.png');
const img_playjumpright = require('./resources/ui_playjumpright.png');

export const AudioPlayerSlider = props => {
  return (
    <>
      <View style={styles.player.container_active}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flexDirection: 'row', marginRight: 15}}>
            <TouchableOpacity
              onPress={props.jumpPrev15Seconds}
              style={{justifyContent: 'center'}}>
              <Image
                source={img_playjumpleft}
                style={{width: 30, height: 30}}
              />
              <Text
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  marginTop: 1,
                  color: 'white',
                  fontSize: 12,
                }}>
                15
              </Text>
            </TouchableOpacity>
            {props.state.playState == 'playing' && (
              <TouchableOpacity
                onPress={() => {
                  props.replace();
                  props.pause();
                }}
                style={{marginHorizontal: 20}}>
                <Image source={img_pause} style={{width: 30, height: 30}} />
              </TouchableOpacity>
            )}
            {props.state.playState == 'paused' && (
              <TouchableOpacity
                onPress={() => {
                  props.replace();
                  props.play();
                }}
                style={{marginHorizontal: 20}}>
                <Image source={img_play} style={{width: 30, height: 30}} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={props.jumpNext15Seconds}
              style={{justifyContent: 'center'}}>
              <Image
                source={img_playjumpright}
                style={{width: 30, height: 30}}
              />
              <Text
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  marginTop: 1,
                  color: 'white',
                  fontSize: 12,
                }}>
                15
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={{color: 'white', fontSize: 14, maxWidth: '50%'}}>
            {props.props.title}
          </Text>
        </View>
        <View style={{marginTop: 10, flexDirection: 'row'}}>
          <Text style={{color: 'white', alignSelf: 'center'}}>
            {props.currentTimeString}
          </Text>
          <Slider
            onTouchStart={props.onSliderEditStart}
            onTouchEnd={props.onSliderEditEnd}
            onValueChange={props.onSliderEditing}
            value={props.state.playSeconds}
            maximumValue={props.state.duration}
            maximumTrackTintColor="gray"
            minimumTrackTintColor="white"
            thumbTintColor="white"
            style={{
              flex: 1,
              alignSelf: 'center',
              marginHorizontal: Platform.select({ios: 5}),
            }}
          />
          <Text style={{color: 'white', alignSelf: 'center'}}>
            {props.durationString}
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = {
  player: StyleSheet.create({
    container: {
      // borderRadius: 4,
      paddingLeft: 10,
      paddingRight: 10,

      justifyContent: 'center',
      backgroundColor: 'rgba(85, 85, 88, 1)',
      width: '100%',
      height: 80,
      borderBottomWidth: 1,
      borderBottomColor: '#969696',
    },
    container_active: {
      paddingLeft: 10,
      paddingRight: 10,
      justifyContent: 'center',
      backgroundColor: '#154073',
      width: '100%',
      paddingVertical: 8,
      minHeight: 90,
      borderTopWidth: 1,
      borderTopColor: 'rgba(255, 255, 255, 0.6)',
    },
  }),
};

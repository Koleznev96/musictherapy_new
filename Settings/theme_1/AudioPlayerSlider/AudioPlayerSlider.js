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
        <View style={{flexDirection: 'row', width: '100%'}}>
          <Slider
            onTouchStart={props.onSliderEditStart}
            onTouchEnd={props.onSliderEditEnd}
            onValueChange={props.onSliderEditing}
            value={props.state.playSeconds}
            maximumValue={props.state.duration}
            maximumTrackTintColor="rgba(217, 217, 217, 0.7)"
            minimumTrackTintColor="#FFC300"
            thumbTintColor="#FFC300"
            width="100%"
            style={{
              transform: [{scaleX: 1.08}, {scaleY: 1.08}],
              flex: 1,
              position: 'absolute',
              top: -9,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <View
            style={{
              width: 30,
              height: 30,
              marginHorizontal: 20,
            }}
          />
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 14}}>
              {props.props.title}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                alignSelf: 'center',
                opacity: 0.7,
              }}>
              {props.currentTimeString}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
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
          </View>
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
      width: '100%',
      borderTopColor: 'rgba(255, 255, 255, 0.6)',
      backgroundColor: '#000',
    },
  }),
};

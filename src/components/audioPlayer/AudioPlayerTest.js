import React, { useEffect, useState, useRef } from 'react';
import { 
    View, 
    Image, 
    Text, 
    Slider, 
    TouchableOpacity,
    Platform, 
    Alert, 
    StyleSheet,
} from 'react-native';

import Sound from 'react-native-sound';

// import {useInterval} from '../../hooks/useInterval';

const img_speaker = require('./resources/ui_speaker.png');
const img_pause = require('./resources/ui_pause.png');
const img_play = require('./resources/ui_play.png');
const img_playjumpleft = require('./resources/ui_playjumpleft.png');
const img_playjumpright = require('./resources/ui_playjumpright.png');

const useInterval = (callback, delay) => {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}


export const AudioPlayerTest = ({ filepath, title, active, itemHandler, index, dirpath }) => {

    const [playState, setPlayState] = useState('paused');
    const [playSeconds, setPlaySeconds] = useState(0);
    const [duration, setDuration] = useState(0);
    const [sliderEditing, setSliderEditing] = useState(false);
    const [timeout, setTimeoutu] = useState(null);
    const [sound, setSound] = useState(null);
    
    useEffect(() => {
        if (sound)
        setTimeoutu(setInterval(() => {
            if(sound && sound.isLoaded() && playState == 'playing' && !sliderEditing){
                sound.getCurrentTime((seconds, isPlaying) => {
                    setPlaySeconds(seconds);
                })
            }
        }, 100));
    }, [sound]);

    useEffect(() => {
        play();
    }, [filepath])

    const onSliderEditStart = () => {
        setSliderEditing(true);
    }
    const onSliderEditEnd = () => {
        setSliderEditing(false);
    }
    const onSliderEditing = value => {
        if(sound){
            sound.setCurrentTime(value);
            setPlaySeconds(value);
        }
    }

    const play = async () => {
        if(sound){
            setPlayState('playing');
            sound.play(playComplete);
        }else{
            const filepath_ = filepath;
            if (!filepath_) return;
            // const filepath = httpServer + '/uploads/Guzel_KHasanova_-_Kak_ty_tam_73721647.mp3';
            var dirpath_ = '';
            if (dirpath) {
                dirpath_ = dirpath;
            }
            let fit = new Sound(filepath_, dirpath_, (error) => {
                if (error) {
                    Alert.alert('Notice', 'audio file error. (Error code : 1)');
                    setPlayState('paused');
                }else{
                    setDuration(fit?.getDuration());
                }
            })
            setSound(fit);  
        }
    }

    // useEffect(() => {
    //     play();
    // }, [filepath])

    const playComplete = (success) => {
        if(sound){
            if (success) {
                // console.log('successfully finished playing');
            } else {
                // console.log('playback failed due to audio decoding errors');
                Alert.alert('Notice', 'audio file error. (Error code : 2)');
            }
            setPlayState('paused');
            setPlaySeconds(0);
            sound.setCurrentTime(0);
        }
    }

    const pause = () => {
        if(sound){
            sound.pause();
        }

        setPlayState('paused');
    }

    const jumpSeconds = (secsDelta) => {
        if(sound){
            sound.getCurrentTime((secs, isPlaying) => {
                let nextSecs = secs + secsDelta;
                if(nextSecs < 0) nextSecs = 0;
                else if(nextSecs > duration) nextSecs = duration;
                sound.setCurrentTime(nextSecs);
                setPlaySeconds(nextSecs);
            })
        }
    }

    const jumpPrev15Seconds = () => {jumpSeconds(-15);}
    const jumpNext15Seconds = () => {jumpSeconds(15);}
    

    const getAudioTimeString = (seconds) => {
        const h = parseInt(seconds/(60*60));
        const m = parseInt(seconds%(60*60)/60);
        const s = parseInt(seconds%60);

        return ((h<10?'0'+h:h) + ':' + (m<10?'0'+m:m) + ':' + (s<10?'0'+s:s));
    }

        let currentTimeString = getAudioTimeString(playSeconds);
        let durationString = getAudioTimeString(duration);

        return (
            <>
            {active ? (
            <View style={styles.player.container_active}>
                
                {/* <Image source={img_speaker} style={{width:150, height:150, marginBottom:15, alignSelf:'center'}}/> */}
                <View style={{flexDirection:'row', alignItems: 'center'}}>
                    <View style={{flexDirection:'row', marginRight: 15,}}>
                    <TouchableOpacity onPress={jumpPrev15Seconds} style={{justifyContent:'center'}}>
                        <Image source={img_playjumpleft} style={{width:30, height:30}}/>
                        <Text style={{position:'absolute', alignSelf:'center', marginTop:1, color:'white', fontSize:12}}>15</Text>
                    </TouchableOpacity>
                    {playState == 'playing' && 
                    <TouchableOpacity onPress={pause} style={{marginHorizontal:20}}>
                        <Image source={img_pause} style={{width:30, height:30}}/>
                    </TouchableOpacity>}
                    {playState == 'paused' && 
                    <TouchableOpacity onPress={play} style={{marginHorizontal:20}}>
                        <Image source={img_play} style={{width:30, height:30}}/>
                    </TouchableOpacity>}
                    <TouchableOpacity onPress={jumpNext15Seconds} style={{justifyContent:'center'}}>
                        <Image source={img_playjumpright} style={{width:30, height:30}}/>
                        <Text style={{position:'absolute', alignSelf:'center', marginTop:1, color:'white', fontSize:12}}>15</Text>
                    </TouchableOpacity>
                    </View>
                    <Text style={{ color:'white', fontSize:14, maxWidth: '50%'}}>{title}</Text>
                </View>
                <View style={{marginTop: 10, flexDirection:'row'}}>
                    <Text style={{color:'white', alignSelf:'center'}}>{currentTimeString}</Text>
                    <Slider
                        onTouchStart={onSliderEditStart}
                        onTouchEnd={onSliderEditEnd}
                        onValueChange={onSliderEditing}
                        value={playSeconds} maximumValue={duration} maximumTrackTintColor='gray' minimumTrackTintColor='white' thumbTintColor='white' 
                        style={{flex:1, alignSelf:'center', marginHorizontal:Platform.select({ios:5})}}/>
                    <Text style={{color:'white', alignSelf:'center'}}>{durationString}</Text>
                </View>
            </View>
            ) : (
                <View style={{paddingLeft: 10,
                    paddingRight: 10, 
                    
                    justifyContent: 'center',
                    backgroundColor:'rgba(85, 85, 88, 1)',
                    width: '100%',
                    height: 80,
                    borderBottomWidth: 1,
                    borderBottomColor: '#969696',}}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row', alignItems: 'center'}}>
                    <TouchableOpacity 
                    onPress={() => {itemHandler(index); play()}} 
                    style={{marginRight: 15}}
                    >
                        <Image source={img_play} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    <Text style={{ color:'white', fontSize:14, maxWidth: '70%'}}>{title}</Text>
                    </View>
                    <Text style={{color:'white', fontSize:12, marginTop: 8,}}>{durationString}</Text>
                    
                </View>
            </View>
            )}
            </>
        )
}


const styles = {
    player: StyleSheet.create({
      container: {
        // borderRadius: 4,
        paddingLeft: 10,
        paddingRight: 10, 
        
        justifyContent: 'center',
        backgroundColor:'rgba(85, 85, 88, 1)',
        width: '100%',
        height: 80,
        borderBottomWidth: 1,
        borderBottomColor: '#969696',
      },
      container_active: {
        paddingLeft: 10,
        paddingRight: 10, 
        justifyContent:'center', 
        backgroundColor:'rgba(85, 85, 88, 1)',
        width: '100%',
        paddingVertical: 8,
        minHeight: 90,
        borderBottomWidth: 1,
        borderBottomColor: '#969696',
      },
    }),
  };
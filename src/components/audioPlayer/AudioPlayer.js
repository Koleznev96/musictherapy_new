import React from 'react';
import { 
    View, 
    Image, 
    Text, 
    Slider, 
    TouchableOpacity,
    Platform, 
    Alert, 
    StyleSheet
} from 'react-native';

import Sound from 'react-native-sound';

const img_speaker = require('./resources/ui_speaker.png');
const img_pause = require('./resources/ui_pause.png');
const img_play = require('./resources/ui_play.png');
const img_playjumpleft = require('./resources/ui_playjumpleft.png');
const img_playjumpright = require('./resources/ui_playjumpright.png');


Sound.setCategory('Playback');


export default class AudioPlayer extends React.Component{
    
    static navigationOptions = props => ({
        title: this.props.title,
    })

    constructor(props){
        super(props);
        this.state = {
            index: this.props.activeIndex,

            playState: 'paused', //playing, paused
            playSeconds:0,
            duration:0,
        }
        this.sliderEditing = false;
    }

    componentDidMount(){
        this.play();
        
        this.timeout = setInterval(() => {
            if(this.sound && this.sound.isLoaded() && this.state.playState == 'playing' && !this.sliderEditing){
                this.sound.getCurrentTime((seconds, isPlaying) => {
                    this.setState({playSeconds:seconds});
                })
            }
        }, 1000);
    }

    componentDidUpdate(prevProps) {
        if (this.props.clear !== prevProps.clear && this.sound) {
            if (this.state.playState == 'playing') this.pause(true);
            else this.play(true);
        }

        if (this.props.id !== prevProps.id && this.props.filepath) {
            if(this.sound){
                this.sound.release();
                this.sound = null;
            }
            if(this.timeout){
                clearInterval(this.timeout);
                this.timeout = setInterval(() => {
                    if(this.sound && this.sound.isLoaded() && this.state.playState == 'playing' && !this.sliderEditing){
                        this.sound.getCurrentTime((seconds, isPlaying) => {
                            this.setState({playSeconds:seconds});
                        })
                    }
                }, 100);
            }
            this.play();
        }
    }
    
    componentWillUnmount(){
        if(this.sound){
            this.sound.release();
            this.sound = null;
        }
        if(this.timeout){
            clearInterval(this.timeout);
        }
    }

    onSliderEditStart = () => {
        this.sliderEditing = true;
    }
    onSliderEditEnd = () => {
        this.sliderEditing = false;
    }
    onSliderEditing = value => {
        if(this.sound){
            this.sound.setCurrentTime(value);
            this.setState({playSeconds:value});
        }
    }

    replace = () => {
        if (this.state.index !== -1) {
            this.props.replacePlay(this.state.index);
        }
    }

    play = async () => {
        if(this.sound){
            this.setState({playState:'playing'});
            this.sound.play(this.playComplete);
        }else{
            const filepath = this.props.filepath;
            var dirpath = '';
            if (this.props?.dirpath) {
                dirpath = this.props.dirpath;
            }
            this.sound = new Sound(filepath, dirpath, (error) => {
                if (error) {
                    Alert.alert('Notice', 'audio file error. (Error code : 1)');
                    this.setState({playState:'paused'});
                }else{
                    this.setState({playState:'playing', index: this.props.activeIndex, duration:this.sound?.getDuration()});
                    this.sound.play(this.playComplete);
                }
            });  
        }
    }
    playComplete = (success) => {
        if(this.sound){
            if (success) {
                this.props.nextSound();
            } else {
                // Alert.alert('Notice', 'audio file error. (Error code : 2)');
            }
            // this.props.nextSound();
            
            this.setState({playState:'paused', playSeconds:0});
            this.sound.setCurrentTime(0);
        }
    }

    pause = () => {
        if(this.sound){
            this.sound.pause();
        }

        this.setState({playState:'paused'});
    }

    jumpPrev15Seconds = () => {this.jumpSeconds(-15);}
    jumpNext15Seconds = () => {this.jumpSeconds(15);}
    jumpSeconds = (secsDelta) => {
        if(this.sound){
            this.sound.getCurrentTime((secs, isPlaying) => {
                let nextSecs = secs + secsDelta;
                if(nextSecs < 0) nextSecs = 0;
                else if(nextSecs > this.state.duration) nextSecs = this.state.duration;
                this.sound.setCurrentTime(nextSecs);
                this.setState({playSeconds:nextSecs});
            })
        }
    }

    getAudioTimeString(seconds){
        const h = parseInt(seconds/(60*60));
        const m = parseInt(seconds%(60*60)/60);
        const s = parseInt(seconds%60);

        return ((h<10?'0'+h:h) + ':' + (m<10?'0'+m:m) + ':' + (s<10?'0'+s:s));
    }

    render(){

        const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
        const durationString = this.getAudioTimeString(this.state.duration);

        return (
            <>
            <View style={styles.player.container_active}>
                
                {/* <Image source={img_speaker} style={{width:150, height:150, marginBottom:15, alignSelf:'center'}}/> */}
                <View style={{flexDirection:'row', alignItems: 'center'}}>
                    <View style={{flexDirection:'row', marginRight: 15,}}>
                    <TouchableOpacity onPress={this.jumpPrev15Seconds} style={{justifyContent:'center'}}>
                        <Image source={img_playjumpleft} style={{width:30, height:30}}/>
                        <Text style={{position:'absolute', alignSelf:'center', marginTop:1, color:'white', fontSize:12}}>15</Text>
                    </TouchableOpacity>
                    {this.state.playState == 'playing' && 
                    <TouchableOpacity onPress={() => {this.replace(); this.pause();}} style={{marginHorizontal:20}}>
                        <Image source={img_pause} style={{width:30, height:30}}/>
                    </TouchableOpacity>}
                    {this.state.playState == 'paused' && 
                    <TouchableOpacity onPress={() => {this.replace(); this.play();}} style={{marginHorizontal:20}}>
                        <Image source={img_play} style={{width:30, height:30}}/>
                    </TouchableOpacity>}
                    <TouchableOpacity onPress={this.jumpNext15Seconds} style={{justifyContent:'center'}}>
                        <Image source={img_playjumpright} style={{width:30, height:30}}/>
                        <Text style={{position:'absolute', alignSelf:'center', marginTop:1, color:'white', fontSize:12}}>15</Text>
                    </TouchableOpacity>
                    </View>
                    <Text style={{ color:'white', fontSize:14, maxWidth: '50%'}}>{this.props.title}</Text>
                </View>
                <View style={{marginTop: 10, flexDirection:'row'}}>
                    <Text style={{color:'white', alignSelf:'center'}}>{currentTimeString}</Text>
                    <Slider
                        onTouchStart={this.onSliderEditStart}
                        onTouchEnd={this.onSliderEditEnd}
                        onValueChange={this.onSliderEditing}
                        value={this.state.playSeconds} maximumValue={this.state.duration} maximumTrackTintColor='gray' minimumTrackTintColor='white' thumbTintColor='white' 
                        style={{flex:1, alignSelf:'center', marginHorizontal:Platform.select({ios:5})}}/>
                    <Text style={{color:'white', alignSelf:'center'}}>{durationString}</Text>
                </View>
            </View>
            </>
        )
    }
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
        backgroundColor:'#154073',
        width: '100%',
        paddingVertical: 8,
        minHeight: 90,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.6)',
      },
    }),
  };
import React from 'react';
import {StyleSheet, View} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

const url =
'https://upos-sz-mirrorks3.bilivideo.com/upgcxcode/21/77/19937721/19937721-1-208.mp4?e=ig8euxZM2rNcNbRBhwdVhwdlhWUVhwdVhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1618422927&gen=playurl&os=ks3bv&oi=1972570661&trid=3a2864d815f84dac9d18ab0a1a76af79T&platform=html5&upsig=91eb348881b486810416b67cb32da849&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&mid=0&orderid=0,1&logo=80000000';

export default class VideoExample extends React.Component {
  render() {
    return (
      <View style={{height: 400}}>
        <VideoPlayer
          source={{uri: url}}
          onEnterFullscreen={() => {
            Orientation.lockToLandscape();
          }}
          onExitFullscreen={() => {
            Orientation.lockToPortrait();
          }}
          playInBackground={false}
          rate={2}
          poster="https://baconmockup.com/300/200/"
          seekColor="red"
          disableBack={true}
          tapAnywhereToPause={true}
          // onBack={() => {
          //   Orientation.lockToPortrait();
          // }}
          // navigator={this.props.navigator}
        />
      </View>
    );
  }
}

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
  'https://upos-hz-mirrorakam.akamaized.net/upgcxcode/20/77/19937720/19937720-1-208.mp4?e=ig8euxZM2rNcNbRBhwdVhwdlhWUVhwdVhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1618411643&gen=playurl&os=akam&oi=2901877426&trid=c7819bf70923460ea762debf6b5f7c08T&platform=html5&upsig=a26d20355d94f23d3c7d8c2b963aa074&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&hdnts=exp=1618411643~hmac=2735b55771bbee54b0d8a3953a068d5698264332af2f1ed4613df532c1a54c6c&mid=0&orderid=0,1&logo=80000000';
// const url = 'https://your-url.com/video.mp4'
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

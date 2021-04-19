import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation';
import {reqDanmuku, reqVideo} from '../../config/api';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default function VideoExample() {
  const aid = 417602724;
  const cid = 325144487;
  //获取视频
  const getVideo = async () => {
    const result = await reqVideo(aid, cid);
    console.log('url', result.data[0].url);
    setUrl(result.data[0].url);
  };
  //获取弹幕
  const getDanmuku = async () => {
    const result = await reqDanmuku(cid);
    return reusult.data;
  };
  const [url, setUrl] = useState('');
  useEffect(() => {
    getVideo();
    return () => {};
  }, []);
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

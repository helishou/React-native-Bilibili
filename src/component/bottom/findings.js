import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
// import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation';
import {reqDanmuku, reqVideo} from '../../config/api';
import VideoPlayer from 'react-native-rn-videoplayer';
import Danmuku from './danmuku';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  danmuku: {
    position: 'absolute',
    top: 200,
    elevation: 20,
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
    const predata = [];
    for (let i = 0; i < result.data.length; i++) {
      // console.log(parseInt(result.data[i][0]))
      predata[parseInt(result.data[i][0]*10)] = result.data[i].slice(3);
      // console.log(result.data[i].slice(3))
    }
    setDanmuku(predata);
    // console.log('danmu', predata);
  };
  const [url, setUrl] = useState('');
  const [danmuku, setDanmuku] = useState([]);
  useEffect(() => {
    getDanmuku();
    getVideo();
    return () => {};
  }, []);
  return (
    <View style={{height: 400}}>
      <Danmuku style={styles.danmuku} danmuku={danmuku}></Danmuku>
      <VideoPlayer
        source={{uri: url}}
        playInBackground={false}
        rate={2}
        // poster="https://baconmockup.com/300/200/"
        // seekColor="red"
        disableBack={true}
        tapAnywhereToPause={true}
        // style={{position:'abosulute',top:0}}
        // onBack={() => {
        //   Orientation.lockToPortrait();
        // }}
        // navigator={this.props.navigator}
      />
    </View>
  );
}

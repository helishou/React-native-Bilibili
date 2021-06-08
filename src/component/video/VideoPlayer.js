/*
 * @Author       : helishou
 * @Date         : 2021-04-26 21:39:43
 * @LastEditTime : 2021-06-07 22:36:57
 * @LastEditors  : helishou
 * @Description  : 播放器
 * @FilePath     : \src\component\video\VideoPlayer.js
 * 你用你的指尖,阻止我说再见,在bug完全失去之前
 */
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  DrawerLayoutAndroid,
} from 'react-native';
import {connect} from 'react-redux';
// import Orientation from 'react-native-orientation';
import {setFullscreen} from '../../redux/actions';
import px2dp from '../../util';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import VideoPlayer from 'react-native-video-controls';
import {reqDanmuku, reqVideo} from '../../config/api';
import VideoPlayer from 'react-native-rn-videoplayer';
import Danmuku from './danmuku';
import {useNavigation} from '@react-navigation/native';
import {updateVideo} from '../../redux/actions';
let {width, height} = Dimensions.get('window');

const sliderWidth = 370;
//封装播放器
function VideoPlayerWrapper(props) {
  const [clear, setClear] = useState(1);
  const navigation = useNavigation();
  // const aid = 417602724;
  // const cid = 325144487;
  if (!props.show) {
    return null;
  }
  const [pg, setPg] = useState(0);

  //请求第三方的视频
  const getVideo = async (aid, cid) => {
    const result = await reqVideo(aid, cid);
    props.setUrl(result.data.durl[0].url);
  };
  //获取弹幕
  const getDanmuku = async cid => {
    const result = await reqDanmuku(cid);
    const predata = [];
    for (let i = 0; i < result.data.length; i++) {
      // console.log(parseInt(result.data[i][0]))
      predata[parseInt(result.data[i][0] * 10)] = result.data[i].slice(3);
      // console.log(result.data[i].slice(3))
    }
    props.setDanmuku(predata);
    // console.log('danmu', predata);
  };
  const drawRef = useRef();
  //切p的函数
  const switchVideo = pg => {
    setClear(true);
    setPg(pg);
    getVideo(props.video.aid, props.video.cid[pg].cid);
    getDanmuku(props.video.cid[pg].cid);
  };
  const nextBtnFun = () => {
    switchVideo(pg + 1);
  };
  //播放器的侧边栏
  const buttons = [];
  for (let i = 0; i < props.video.videos; i++) {
    buttons.push({id: i});
  }
  const renderItem = ({item}) => {
    // const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    return (
      <TouchableOpacity onPress={() => switchVideo(item.id)}>
        <Text
          style={[
            styles.Button,
            pg == item.id ? {borderColor: props.activeTheme} : {},
          ]}>
          {item.id + 1}
        </Text>
      </TouchableOpacity>
    );
  };
  const navigationView = (
    <View style={styles.navigationContainer}>
      <Text style={[styles.sliderTitle]}>选集（{props.video.videos}）</Text>
      <FlatList
        numColumns={4}
        horizontal={false}
        style={styles.scrollView}
        data={buttons}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={props.video.pd}
      />
    </View>
  );
  //切换全屏的函数
  const onWindowChange = () => {
    if (props.fullscreen) {
      props.setFullscreen(false);
    } else {
      props.setFullscreen(true);
    }
  };
  const changeDanmuku = state => {
    if (state.clear !== undefined) {
      setClear(state.clear);
    }
    state.currentTime !== undefined &&
      props.updateVideo({currentTime: state.currentTime});
  };
  return props.url ? (
    <View
      style={[props.fullscreen ? styles.fullscreen : styles.webViewContainer]}>
      <DrawerLayoutAndroid
        ref={drawRef}
        drawerWidth={sliderWidth}
        drawerPosition={'right'}
        renderNavigationView={() => navigationView}
        drawerBackgroundColor="rgba(0,0,0,0)">
        <View
          style={[
            props.fullscreen ? styles.fullscreen : styles.webViewContainer,
          ]}>
          {/* 设置一个clear,用于开启关闭弹幕 */}
          {clear ? null : <Danmuku danmuku={props.danmuku} />}
          <VideoPlayer
            source={{uri: props.url}}
            playInBackground={false}
            renderAllSeenList={() => {
              return drawRef.current.openDrawer();
            }}
            onSmallBack={() => navigation.pop()}
            // rate={2}
            onWindowChange={() => onWindowChange()}
            continuous={props.video.videos}
            poster={props.poster}
            // seekColor="red"
            disableBack={true}
            changeDanmuku={state => changeDanmuku(state)}
            clear={clear}
            nextBtnFun={
              pg !== props.video.videos - 1 ? () => nextBtnFun() : null
            }
            color={props.activeTheme}
            speedColor={props.activeTheme}
            dotColor={props.activeTheme}
            bottomSpeedColor={props.activeTheme}
          />
        </View>
      </DrawerLayoutAndroid>
    </View>
  ) : null;
}

export default connect(
  state => ({
    video: state.video,
    fullscreen: state.fullscreen,
    activeTheme: state.common.activeTheme,
  }),
  {setFullscreen, updateVideo},
)(VideoPlayerWrapper);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  webView: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: height * 0.3,
    width: width,
    // alignItems:'center',
    zIndex: 8,
  },
  webViewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: parseInt(height * 0.4, 10),
    width: width,
    zIndex: 9,
  },
  fullscreen: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: width,
    width: height + 44,
    zIndex: 9,
  },
  barIcon: {
    position: 'absolute',
    top: px2dp(50),
    right: px2dp(40),
    height: 40,
    color: 'white',
    zIndex: 10,
    opacity: 0.5,
  },
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   paddingTop: 50,
  //   backgroundColor: '#ecf0f1',
  //   padding: 8,
  // },
  navigationContainer: {
    width: sliderWidth,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  scrollView: {
    width: sliderWidth,
    padding: 8,
    paddingLeft: px2dp(12),
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: width,
  },
  sliderTitle: {
    paddingTop: px2dp(27),
    paddingLeft: px2dp(15),
    color: '#888',
    fontSize: px2dp(22),
  },
  Button: {
    width: sliderWidth * 0.2,
    height: sliderWidth / 7,
    margin: 5,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    // borderRadius: 13,
    fontSize: px2dp(17),
    color: '#EEE',
    borderWidth: 2,
    borderColor: '#222',
    borderRadius: 5,
  },
});

import React, {useRef, useState, useEffect} from 'react';
import WebView from 'react-native-webview';
import {BlurView} from '@react-native-community/blur';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  DrawerLayoutAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import Orientation from 'react-native-orientation';
import {setFullscreen, switchVideo} from '../../redux/actions';
import px2dp from '../../util';
import Icon from 'react-native-vector-icons/FontAwesome';
let {width, height} = Dimensions.get('window');

const sliderWidth = 370;
//封装播放器
function VideoPlayer(props) {
  console.log('videoplayershow', props.show);
  console.log('props.video.videos', props.video.videos);
  if (!props.show) {
    return null;
  }
  const [pg, setPg] = useState(0);

  const drawRef = useRef();
  //切p的函数
  const switchVideo = pg => {
    console.log('object', props.video);
    setPg(pg);
    props.setUrl(
      `https://player.bilibili.com/player.html?aid=${props.video.aid}&cid=${props.video.cid[pg].cid}&high_quality=1&autoplay=true&platform=html5`,
    );
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
  console.log('player', width, height);
  console.log('videoplayer_url', props.url);
  return props.url ? (
    <View
      style={[props.fullscreen ? styles.fullscreen : styles.webViewContainer]}>
      <DrawerLayoutAndroid
        ref={drawRef}
        drawerWidth={sliderWidth}
        drawerPosition={'right'}
        renderNavigationView={() => navigationView}
        drawerBackgroundColor="rgba(0,0,0,0)">
        <Icon
          name="bars"
          size={px2dp(23)}
          onPress={() =>
            props.fullscreen ? drawRef.current.openDrawer() : null
          }
          style={styles.barIcon}
        />
        {1 ? (
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: px2dp(3),
              right: px2dp(3),
              zIndex: 10,
              height: px2dp(25),
              width: px2dp(25),
              opacity: 1,
            }}
            onPress={() => {
              if (props.fullscreen) {
                Orientation.lockToPortrait();
                props.setFullscreen(false);
              } else {
                console.log('全屏', props);
                Orientation.lockToLandscape();
                props.setFullscreen(true);
              }
            }}>
            <Icon name="arrows-alt" color="white" size={px2dp(18)}></Icon>
          </TouchableOpacity>
        ) : null}

        <View
          style={[
            props.fullscreen ? styles.fullscreen : styles.webViewContainer,
          ]}>
          <WebView
            mediaPlaybackRequiresUserAction={false}
            allowsInlineMediaPlayback={true}
            mixedContentMode="always"
            source={{
              uri: props.url,
              method: 'GET',
              headers: {
                Referer: props.url,
              },

              // html: `
              // <iframe src='${props.video.url}'
              // style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"
              // frameborder="no" scrolling="no"
              // data-dom="iframe"
              // target="_self"
              // about:blank

              //  scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

              // `,
            }}
            style={{
              backgroundColor: 'black',
            }}
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
  {setFullscreen},
)(VideoPlayer);

const styles = StyleSheet.create({
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
    height: parseInt(height * 0.34, 10),
    width: width,
    zIndex: 9,
  },
  fullscreen: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: width,
    width: height,
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
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

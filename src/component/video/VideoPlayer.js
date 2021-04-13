import React, {useRef} from 'react';
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
  const drawRef = useRef();

  //播放器的侧边栏
  const buttons = [];
  for (let i = 1; i <= props.video.videos; i++) {
    buttons.push({id: i});
  }
  const renderItem = ({item}) => {
    // const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    return (
      <TouchableOpacity onPress={() => props.switchVideo(item.id)}>
        <Text
          style={[
            styles.Button,
            props.video.pg == item.id ? {borderColor: props.activeTheme} : {},
          ]}>
          {item.id}
        </Text>
      </TouchableOpacity>
    );
  };
  const navigationView = (
    <View style={styles.navigationContainer}>
      <Text style={[styles.sliderTitle]}>选集（{props.video.videos}）</Text>
      <FlatList
        //   columnWrapperStyle={{borderWidth: 2, backgroundColor: 'yellow'}}
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
  // console.log(props.video.url)
  // React.useEffect(() => {
  //   Orientation.lockToLandscape();
  //   console.log(width, height);
  //   return () => {
  //     Orientation.lockToLandscape();
  //   };
  // }, []);
  //player.bilibili.com/player.html?aid=33668155&cid=58943259&page=2&autoplay=true
  https: console.log('videoplayer_url', props.video.url);
  return props.video.url ? (
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
          onPress={() => drawRef.current.openDrawer()}
          style={styles.barIcon}
        />
        <TouchableHighlight
          style={{
            position: 'absolute',
            bottom: px2dp(3),
            right: px2dp(3),
            zIndex: 10,
            height: props.fullscreen ? px2dp(40) : px2dp(15),
            width: props.fullscreen ? px2dp(40) : px2dp(15),
            // backgroundColor: 'white',
            opacity: 0,
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
        </TouchableHighlight>

        <View
          style={[
            props.fullscreen ? styles.fullscreen : styles.webViewContainer,
          ]}>
          <WebView
            mediaPlaybackRequiresUserAction={false}
            allowsInlineMediaPlayback={true}
            userAgent="Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"
            source={{
              // uri: props.video.url,
              // method: "GET",
              html: `
              <iframe src='${props.video.url}'
              width="100%" height="100%"
              data-dom="iframe"
              target="_self"
              about:blank
               scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe> 
          
              `,
            }}
            style={{
              backgroundColor: 'black',
            }}
          />
        </View>
        {/* <BlurView
        blurType="dark"
        blurAmount={10}
        reducedTransparencyFallbackColor="black"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}></BlurView> */}
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
  {setFullscreen, switchVideo},
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
    // backgroundColor: 'gray',
    // alignItems:'center',
    zIndex: 9,
  },
  fullscreen: {
    position: 'absolute',
    top: 0,
    right: 0,
    // transform:[{rotate:'90deg'},{scale:height/width}],
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
    // flexDirection: 'column',
    // flexWrap: 'wrap',
    // flex: 1,
    width: sliderWidth,
    // justifyContent: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.7)',
    // opacity: 0.9,
  },
  scrollView: {
    // backgroundColor: 'red',
    width: sliderWidth,
    padding: 8,
    paddingLeft: px2dp(12),
    // borderWidth: 2,
    // borderColor: '#222',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: width,
    // marginTop: 40,
    // flex: 1,
    // flexDirection: 'column',
    // flexWrap: 'wrap',
    // width: sliderWidth,
  },
  sliderTitle: {
    // position: 'absolute',
    paddingTop: px2dp(27),
    paddingLeft: px2dp(15),
    color: '#888',
    fontSize: px2dp(22),
  },
  Button: {
    // flex: 1,
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
    // paddingHorizontal: 3,
    // paddingVertical: 3,
    borderRadius: 5,
  },
});

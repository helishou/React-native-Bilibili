import React from 'react';
import WebView from 'react-native-webview';
import {BlurView} from '@react-native-community/blur';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Orientation from 'react-native-orientation';
import {setFullscreen} from '../../redux/actions';
import px2dp from '../../util';
import Icon from 'react-native-vector-icons/FontAwesome';
let {width, height} = Dimensions.get('window');
//封装播放器
function VideoPlayer(props) {
  console.log('videoplayershow', props.show);
  if (!props.show) {
    return null;
  }
  const navigation = useNavigation();
  console.log('player', width, height);
  // console.log(props.video.url)
  // React.useEffect(() => {
  //   Orientation.lockToLandscape();
  //   console.log(width, height);
  //   return () => {
  //     Orientation.lockToLandscape();
  //   };
  // }, []);
  return props.video.url ? (
    <View
      style={[props.fullscreen ? styles.fullscreen : styles.webViewContainer]}>
      <Icon
        name="bars"
        size={props.fullscreen ? px2dp(23) : 0}
        style={{
          position: 'absolute',
          top: px2dp(40),
          right: px2dp(40),
          height: 40,
          white: 40,
          color: 'white',
          zIndex: 10,
          opacity: 0.5,
          fontWeight: 'bold',
        }}
      />
      {!props.fullscreen ? (
        <TouchableHighlight
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            height: px2dp(23),
            width: px2dp(23),
            color: 'white',
            zIndex: 10,
            backgroundColor: 'black',
            opacity: 0,
            borderRadius: 30,
            fontWeight: 'bold',
          }}
          onPress={() => {
            console.log('全屏', props);
            Orientation.lockToLandscape();
            props.setFullscreen(true);
          }}>
          <Text
            style={{
              // position: 'absolute',
              // bottom: 20,
              // right: 20,
              // height: 20,
              // white: 20,
              color: 'white',
              zIndex: 10,
              // backgroundColor: 'white',
              opacity: 0.8,
              // borderRadius: 30,
              fontWeight: 'bold',
            }}>
            {' '}
            {'□'}{' '}
          </Text>
        </TouchableHighlight>
      ) : null}
      {/* <BlurView
        blurType="light"
        blurAmount={30}
        reducedTransparencyFallbackColor="gray"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}></BlurView> */}

      <View
        style={[
          props.fullscreen ? styles.fullscreen : styles.webViewContainer,
        ]}>
        <WebView
          mediaPlaybackRequiresUserAction={false}
          allowsInlineMediaPlayback={true}
          source={{
            uri: props.video.url,
          }}
          // style={{
          //   // marginTop: 20,
          //   // position: 'absolute',
          //   // right: 5,

          //   width: '100%',
          //   height: '100%',
          //   zIndex: 1,
          // }}
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
    </View>
  ) : null;
}

export default connect(
  state => ({video: state.video, fullscreen: state.fullscreen}),
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
});

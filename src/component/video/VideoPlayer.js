import React from 'react';
import WebView from 'react-native-webview';
import {BlurView} from '@react-native-community/blur';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Orientation from 'react-native-orientation';
import {setFullscreen} from '../../redux/actions';
import px2dp from '../../util';
import Icon from 'react-native-vector-icons/FontAwesome';
let {width, height} = Dimensions.get('window');

import {useState, useRef} from 'react';
import {Button, DrawerLayoutAndroid} from 'react-native';

const sliderWidth = 300;
//封装播放器
function VideoPlayer(props) {
  console.log('videoplayershow', props.show);
  console.log('props.video.videos', props.video.videos);
  if (!props.show) {
    return null;
  }
  const navigation = useNavigation();
  const drawRef = useRef();
  //播放器的侧边栏
  const buttons = [];

  for (let i = 1; i <= props.video.videos; i++) {
    buttons.push(
      <TouchableOpacity onPress={() => {}}>
        <Text
          style={[
            styles.Button,
            props.video.pg ? {backgroundColor: props.activeTheme} : {},
          ]}>
          {i}
        </Text>
      </TouchableOpacity>,
    );
  }
  const navigationView = (
    <View style={styles.navigationContainer}>{buttons}</View>
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
  return props.video.url ? (
    <View
      style={[props.fullscreen ? styles.fullscreen : styles.webViewContainer]}>
      <DrawerLayoutAndroid
        ref={drawRef}
        drawerWidth={sliderWidth}
        drawerPosition={'right'}
        renderNavigationView={() => navigationView}
        drawerBackgroundColor="rgba(0,0,0,0.6)">
        <Icon
          name="bars"
          size={props.fullscreen ? px2dp(23) : 0}
          onPress={() => drawRef.current.openDrawer()}
          style={{
            position: 'absolute',
            top: px2dp(40),
            right: px2dp(40),
            height: 40,
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  navigationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    // backgroundColor: 'black',
    padding: 8,
    marginLeft: 20,
    marginTop: 40,
    // opacity: 0.9,
  },
  sliderTitle: {
    position: 'absolute',
    color: '#666',
    fontSize: px2dp(17),
  },
  Button: {
    width: sliderWidth / 6,
    height: sliderWidth / 10,
    margin: 5,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    // borderRadius: 13,
    fontSize: px2dp(13),
    color: '#666',
    borderWidth: 1,
    borderColor: '#bbb',
    paddingHorizontal: 3,
    paddingVertical: 3,
    borderRadius: 4,
  },
});

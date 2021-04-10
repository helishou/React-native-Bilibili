import React from 'react';
import WebView from 'react-native-webview';
import {BlurView} from '@react-native-community/blur';
import {View, Text,StyleSheet,Dimensions} from 'react-native';
import {connect} from 'react-redux';
let {width, height} = Dimensions.get('window');
//封装播放器
function VideoPlayer(props) {
  // console.log(props.video.url)
  return (
    props.video.url?<View
      style={[
        styles.webViewContainer,
      ]}>
      {/* <Text
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          height: 20,
          white: 20,
          color: 'black',
          zIndex: 10,
          backgroundColor: 'white',
          opacity: 0.5,
          borderRadius: 30,
          fontWeight: 'bold',
        }}>
        {' '}
        {'<'}{' '}
      </Text> */}
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

      <View style={styles.webView}>
        <WebView
          mediaPlaybackRequiresUserAction={false}
          allowsInlineMediaPlayback={true}
          source={{
            uri: props.video.url,
          }}
          style={{
            // marginTop: 20,
            // position: 'absolute',
            // right: 5,

            width: '100%',
            height: '100%',
            zIndex: 1,
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
    </View>:null
  );
}

export default connect(state=>({video:state.video}),{})(VideoPlayer);

const styles = StyleSheet.create({
  webView: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: height*0.33,
    width: width,
    // alignItems:'center',
    zIndex: 8,
  },
  webViewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: height*0.32,
    width: width,
    backgroundColor:'gray',
    // alignItems:'center',
    zIndex: 9,
  },
})

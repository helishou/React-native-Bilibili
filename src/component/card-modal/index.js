/**
 * Created by ggoma on 2016. 11. 22..
 */
import React, {Component, createRef, useRef} from 'react';
import {
  Animated,
  ActivityIndicator,
  Dimensions,
  Easing,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Text,
  ImageBackground,
} from 'react-native';
import WebView from 'react-native-webview';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from '../../style/CommStyle';
const {width, height} = Dimensions.get('window');
import px2dp from '../../util/index';
import {LogBox} from 'react-native';
import {playVideo, resetVideo, press} from '../../redux/action';
import {BlurView} from '@react-native-community/blur';
// LogBox.ignoreLogs([
//   'Require cycle: node_modules/',
//   'Animated: `useNativeDriver` was not specified',
//   'Animated.event now requires a second argument for options',
// ]);
class CardModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressedStyle: {},

      org_width: width - 32,
      org_height: height / 5,

      top_width: new Animated.Value(width - 32),
      top_height: new Animated.Value(height / 6),
      bottom_width: new Animated.Value(width - 32),
      bottom_height: new Animated.Value(height / 6),
      content_height: new Animated.Value(0),

      top_pan: new Animated.ValueXY(),
      bottom_pan: new Animated.ValueXY(),
      content_pan: new Animated.ValueXY(),

      content_opac: new Animated.Value(0),
      button_opac: new Animated.Value(0),
      back_opac: new Animated.Value(0),
      plus: new Animated.Value(1),

      TopBorderRadius: px2dp(0),
      BottomBorderRadius: px2dp(10),

      activate: '播放',
      activated: false,

      offset: 0,

      pressed: false,
    };

    this._onPress = this._onPress.bind(this);
    this.calculateOffset = this.calculateOffset.bind(this);
    this.activate = this.activate.bind(this);
    this.containerRef = createRef();
  }

  _onPress() {
    // console.log(this.props.onRef)
    // console.log('绑定')
    this.setState({pressed: !this.state.pressed, activated: '播放'});

    this.calculateOffset();
  }

  grow() {
    this.setState({TopBorderRadius: px2dp(10)});

    Animated.parallel([
      Animated.spring(this.state.top_width, {
        toValue: width,
        useNativeDriver: false,
        duration: 500,
      }).start(),
      Animated.spring(this.state.top_height, {
        toValue: parseInt(height / 2),
        useNativeDriver: false,
        duration: 500,
      }).start(),
      Animated.spring(this.state.bottom_height, {
        toValue: parseInt(height / 6 + 50),
        useNativeDriver: false,
        duration: 500,
      }).start(),
      Animated.spring(this.state.content_height, {
        toValue: parseInt(height / 2),
        useNativeDriver: false,
        duration: 500,
      }).start(),
      Animated.spring(this.state.top_pan, {
        toValue: {
          x: 0,
          y: -parseInt(this.state.offset),
        },
        useNativeDriver: false,
        duration: 500,
      }).start(),
      Animated.spring(this.state.content_pan, {
        toValue: {
          x: 0,
          y: -parseInt(height / 8 + this.state.offset),
        },
        useNativeDriver: false,
        duration: 500,
      }).start(),
      Animated.spring(this.state.bottom_pan, {
        toValue: {
          x: 0,
          y: -(50 + this.state.offset),
        },
        useNativeDriver: false,
        duration: 500,
      }).start(),

      Animated.timing(this.state.content_opac, {
        toValue: 1,
        useNativeDriver: false,
        duration: 500,
      }).start(),
      Animated.timing(this.state.button_opac, {
        toValue: 1,
        useNativeDriver: false,
        duration: 500,
      }).start(),
      Animated.timing(this.state.back_opac, {
        toValue: 1,
        useNativeDriver: false,
        duration: 500,
      }).start(),
      Animated.timing(this.state.plus, {
        toValue: 0,
        useNativeDriver: false,
        duration: 500,
      }).start(),
    ]);
  }

  shrink() {
    this.setState({TopBorderRadius: px2dp(0)});
    Animated.parallel([
      Animated.spring(this.state.top_width, {
        toValue: this.state.org_width,
        useNativeDriver: false,
        duration: 500,
      }).start(),
      Animated.spring(this.state.top_height, {
        toValue: this.state.org_height,
        useNativeDriver: false,
        duration: 500,
      }).start(),
      Animated.spring(this.state.bottom_height, {
        toValue: height / 6,
        useNativeDriver: false,
        duration: 500,
      }).start(),
      Animated.spring(this.state.top_pan, {
        toValue: {
          x: 0,
          y: 0,
        },
        useNativeDriver: false,
        duration: 500,
      }).start(),
      Animated.spring(this.state.bottom_pan, {
        toValue: {
          x: 0,
          y: 0,
        },
        useNativeDriver: false,
        duration: 500,
      }).start(),
      Animated.spring(this.state.content_height, {
        toValue: 0,
        useNativeDriver: false,
        duration: 500,
      }).start(),
      Animated.timing(this.state.content_opac, {
        toValue: 0,
        useNativeDriver: false,
        duration: 500,
      }).start(),
      Animated.timing(this.state.button_opac, {
        toValue: 0,
        useNativeDriver: false,
        duration: 500,
      }).start(),
      Animated.timing(this.state.back_opac, {
        toValue: 0,
        useNativeDriver: false,
        duration: 500,
      }).start(),
      Animated.timing(this.state.plus, {
        toValue: 1,
        useNativeDriver: false,
        duration: 500,
      }).start(),
    ]);
  }

  calculateOffset() {
    // console.log(this.containerRef);duration:500,
    if (this.containerRef) {
      this.containerRef.current.measure((fx, fy, width, height, px, py) => {
        this.setState({offset: py}, () => {
          if (this.state.pressed) {
            this.props.onRef(this);
            this.props.onClick();
            // console.log('growing with offset', this.state.offset);
            this.grow();
            this.props.press(true);
          } else {
            // console.log('shrinking with offset', this.state.offset);
            this.shrink();
            this.props.resetVideo();
          }
        });
      });
    }
  }

  activate() {
    this.setState({activate: 'loading'});
    const {aid, cid, videos} = this.props;
    // console.log(this.props.playVideo)
    this.props.playVideo({aid, cid, videos});
    setTimeout(() => {
      this.setState({
        activate: (
          <Text>
            播放中 <Icon name="check" />
          </Text>
        ),
        activated: true,
      });
    }, 1500);
  }

  renderTop() {
    // var back = this.state.pressed ? (
    //   <TouchableOpacity style={[styles.backButton]} onPress={this._onPress}>
    //     <Animated.View
    //       style={[
    //         {
    //           opacity: this.state.back_opac,
    //           position: 'relative',
    //           left: 8,
    //           top: 7,
    //         },
    //       ]}>
    //       <Text style={{color: 'white'}}>
    //         <Icon size={23} name="chevron-left" />
    //       </Text>
    //     </Animated.View>
    //   </TouchableOpacity>
    // ) : (
    //   <View />
    // );

    var borderStyles = !this.state.pressed
      ? {
          borderRadius: px2dp(10),
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }
      : {
          borderTopRightRadius: px2dp(10),
          borderTopLeftRadius: px2dp(10),
        };
    return (
      <View
        styles={[
          {
            width: this.state.top_width,
            height: this.state.top_height,
            transform: this.state.top_pan.getTranslateTransform(),
            elevation: 20,
            // display: !this.state.activated?'flex':'none'
          },
        ]}>
        <Animated.Image
          source={{uri: this.props.image}}
          style={[
            styles.top,
            borderStyles,
            
            {
              width: this.state.top_width,
              height: this.state.top_height,
              transform: this.state.top_pan.getTranslateTransform(),
            },
          ]}></Animated.Image>
          
        {/* {back} */}
      </View>
    );
  }

  renderBottom() {
    var loading =
      this.state.activate == 'loading' ? (
        <ActivityIndicator animating={true} color="white" />
      ) : (
        <Text style={{color: 'white', fontWeight: '800', fontSize: 18}}>
          {this.state.activate}
        </Text>
      );

    var button = this.state.pressed ? (
      <TouchableOpacity onPress={this.activate}>
        <Animated.View
          style={{
            opacity: this.state.button_opac,
            backgroundColor: this.props.color,
            marginTop: 10,
            borderRadius: 10,
            width: width - 64,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {loading}
        </Animated.View>
      </TouchableOpacity>
    ) : null;

    var plusButton = this.props.up ? (
      <Animated.View
        style={{
          opacity: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.Image
          source={{uri: this.props.up}}
          style={[
            styles.face,

            // {
            //   width: this.state.top_width,
            //   height: this.state.top_height,
            //   transform: this.state.top_pan.getTranslateTransform(),
            // },
          ]}></Animated.Image>
      </Animated.View>
    ) : null;

    return (
      <Animated.View
        style={[
          {
            marginTop: 0,
            paddingLeft: px2dp(15),
            paddingRight: px2dp(15),
            backgroundColor: 'white',
            elevation: 20,
            width: this.state.bottom_width,
            height: this.state.bottom_height,
            borderTopLeftRadius: this.state.TopBorderRadius,
            borderTopRightRadius: this.state.TopBorderRadius,
            borderBottomLeftRadius: this.state.BottomBorderRadius,
            borderBottomRightRadius: this.state.BottomBorderRadius,

            transform: this.state.bottom_pan.getTranslateTransform(),
          },
        ]}>
        <View style={{flexDirection: 'row'}}>
          <View style={!this.props.up ? {} : {flex: 4}}>
            <Text
              numberOfLines={2}
              style={{
                textAlign: 'left',
                textAlignVertical: 'center',
                justifyContent: 'space-evenly',
                color: 'black',
                fontSize: px2dp(20),
                fontWeight: 'bold',
                // flexWrap:2,
                // marginBottom:px2dp(3),
                lineHeight: parseInt(height / 28),
                height: parseInt(height / 10),
                width: parseInt(width * 0.67),
              }}>
              {this.props.title}
            </Text>
            <Text
              style={{
                fontSize: px2dp(12),
                fontWeight: '500',
                color: 'gray',
                marginBottom: px2dp(5),
                // paddingBottom: 10,
              }}>
              {this.props.description}
            </Text>
            <Text
              style={{
                fontSize: px2dp(10),
                fontWeight: '500',
                color: 'gray',
              }}>
              {this.props.due}
            </Text>
          </View>

          {plusButton}
        </View>
        {button}
      </Animated.View>
    );
  }

  renderContent() {
    if (!this.state.pressed) {
      return;
    }
    return (
      <Animated.View
        style={{
          opacity: this.state.content_opac,
          marginTop: 40,
          width: width,
          height: this.state.content_height,
          zIndex: -1,
          backgroundColor: '#f4f4f4',
          transform: this.state.content_pan.getTranslateTransform(),
        }}>
        <View
          style={{
            backgroundColor: '#f4f4f4',
            flex: 1,
            margin: 16,
            padding: 16,
          }}>
          <Text style={{fontSize: 24, fontWeight: '700', color: 'black'}}>
            简介
          </Text>
          <Text style={{color: 'gray', paddingTop: 10}}>
            {this.props.content ? this.props.content : '这视频没有简介哦~'}
          </Text>
        </View>
      </Animated.View>
    );
  }

  render() {
    return (
      <View style={[styles.container, this.state.pressedStyle]}>
        <TouchableWithoutFeedback
          onPress={!this.props.pressed ? this._onPress : null}>
          <View
            ref={this.containerRef}
            style={[{alignItems: 'center', elevation: 20}]}>
            {this.renderTop()}
            {this.renderBottom()}
            {this.renderContent()}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
export default connect(state => ({pressed: state.pressed}), {
  playVideo,
  resetVideo,
  press,
})(CardModal);
// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     alignSelf: 'center',
//     marginBottom: 16,
//     marginTop: 16,
//   },
//   top: {
//     marginBottom: 0,
//     backgroundColor: 'blue',
//   },
//   bottom: {
//     marginTop: 0,
//     padding: 16,
//     borderBottomLeftRadius: 5,
//     borderBottomRightRadius: 5,
//     backgroundColor: 'white',
//   },
//   backButton: {
//     position: 'absolute',
//     backgroundColor: 'transparent',
//     top: 32,
//     left: 10,
//   },
// });

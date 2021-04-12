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
import {playVideo, resetVideo, press} from '../../redux/actions';
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
    this.compensation = props.compensation ? props.compensation : 0;
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
        toValue: parseInt(height / 2 + this.compensation),
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
            this.playVideo();
            this.props.onRef(this);
            this.props.onClick();
            // console.log('growing with offset', this.state.offset);
            this.grow();
            this.props.press(true);
          } else {
            // console.log('shrinking with offset', this.state.offset);
            this.setState({
              activate: (
                <Text>
                  播放 <Icon name="check" />
                </Text>
              ),
              activated: true,
            });
            this.shrink();
            this.props.resetVideo();
          }
        });
      });
    }
  }
  playVideo(pg = 1) {
    const {aid, cid, videos} = this.props;
    // console.log(this.props.playVideo)
    this.props.playVideo({aid, cid, videos, pg});
    this.setState({
      activate: (
        <Text>
          播放中 <Icon name="check" />
        </Text>
      ),
      activated: true,
    });
  }
  activate() {
    this.setState({activate: 'loading'});

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

    var plusButton = (
      <Animated.View
        style={{
          opacity: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.Image
          source={{
            uri: this.props.up
              ? this.props.up
              : 'data:image/jpeg;base64,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',
          }}
          style={[
            styles.face,

            // {
            //   width: this.state.top_width,
            //   height: this.state.top_height,
            //   transform: this.state.top_pan.getTranslateTransform(),
            // },
          ]}></Animated.Image>
      </Animated.View>
    );

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
          <View style={{flex: 4}}>
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
    // if (!this.state.pressed && this.props.pressed) {
    //   return null;
    // }
    // console.log('cardModel compensation', this.compensation);
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

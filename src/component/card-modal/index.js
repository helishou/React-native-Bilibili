/**
 * Created by ggoma on 2016. 11. 22..
 */
import React, {Component} from 'react';
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
import {YellowBox} from 'react-native';
import {playVideo, resetVideo,press} from '../../redux/action';
YellowBox.ignoreWarnings([
  'Require cycle: node_modules/',
  'Animated: `useNativeDriver` was not specified',
  'Animated.event now requires a second argument for options',
]);
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
      bottom_height: new Animated.Value(height / 7),
      content_height: new Animated.Value(0),

      top_pan: new Animated.ValueXY(),
      bottom_pan: new Animated.ValueXY(),
      content_pan: new Animated.ValueXY(),

      content_opac: new Animated.Value(0),
      button_opac: new Animated.Value(0),
      back_opac: new Animated.Value(0),
      plus: new Animated.Value(1),

      TopBorderRadius: 5,
      BottomBorderRadius: 0,

      activate: '播放',
      activated: false,

      offset: 0,

      pressed: false,
    };

    this._onPress = this._onPress.bind(this);
    this.calculateOffset = this.calculateOffset.bind(this);
    this.activate = this.activate.bind(this);
  }

  _onPress() {
    this.props.onClick();
    // console.log(this.props.onRef)
    this.props.onRef(this)
    this.setState({pressed: !this.state.pressed,activated:'播放'});
    this.props.resetVideo();
    this.props.press(true)
    this.calculateOffset();
  }

  grow() {
    this.setState({TopBorderRadius: 0, BottomBorderRadius: 5});

    Animated.parallel([
      Animated.spring(this.state.top_width, {
        toValue: width,
      }).start(),
      Animated.spring(this.state.top_height, {
        toValue: height / 2,
      }).start(),
      Animated.spring(this.state.bottom_height, {
        toValue: height / 6 + 50,
      }).start(),
      Animated.spring(this.state.content_height, {
        toValue: height / 2,
      }).start(),
      Animated.spring(this.state.top_pan, {
        toValue: {
          x: 0,
          y: -this.state.offset,
        },
      }).start(),
      Animated.spring(this.state.content_pan, {
        toValue: {
          x: 0,
          y: -(height / 8 + this.state.offset),
        },
      }).start(),
      Animated.spring(this.state.bottom_pan, {
        toValue: {
          x: 0,
          y: -(50 + this.state.offset),
        },
      }).start(),

      Animated.timing(this.state.content_opac, {
        toValue: 1,
      }).start(),
      Animated.timing(this.state.button_opac, {
        toValue: 1,
      }).start(),
      Animated.timing(this.state.back_opac, {
        toValue: 1,
      }).start(),
      Animated.timing(this.state.plus, {
        toValue: 0,
      }).start(),
    ]);
  }

  shrink() {
    this.setState({TopBorderRadius: 5, BottomBorderRadius: 0});
    Animated.parallel([
      Animated.spring(this.state.top_width, {
        toValue: this.state.org_width,
        useNativeDriver: false,
      }).start(),
      Animated.spring(this.state.top_height, {
        toValue: this.state.org_height,
        useNativeDriver: false,
      }).start(),
      Animated.spring(this.state.bottom_height, {
        toValue: height / 6,
        useNativeDriver: false,
      }).start(),
      Animated.spring(this.state.top_pan, {
        toValue: {
          x: 0,
          y: 0,
        },
        useNativeDriver: false,
      }).start(),
      Animated.spring(this.state.bottom_pan, {
        toValue: {
          x: 0,
          y: 0,
        },
        useNativeDriver: false,
      }).start(),
      Animated.spring(this.state.content_height, {
        toValue: 0,
        useNativeDriver: false,
      }).start(),
      Animated.timing(this.state.content_opac, {
        toValue: 0,
        useNativeDriver: false,
      }).start(),
      Animated.timing(this.state.button_opac, {
        toValue: 0,
        useNativeDriver: false,
      }).start(),
      Animated.timing(this.state.back_opac, {
        toValue: 0,
        useNativeDriver: false,
      }).start(),
      Animated.timing(this.state.plus, {
        toValue: 1,
        useNativeDriver: false,
      }).start(),
    ]);
  }

  calculateOffset() {
    if (this.refs.container) {
      this.refs.container.measure((fx, fy, width, height, px, py) => {
        this.setState({offset: py}, () => {
          if (this.state.pressed) {
            console.log('growing with offset', this.state.offset);
            this.grow();
          } else {
            console.log('shrinking with offset', this.state.offset);
            this.shrink();
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
      ? {borderRadius: this.state.TopBorderRadius, borderBottomLeftRadius: 0}
      : {
          borderTopRightRadius: this.state.TopBorderRadius,
          borderTopLeftRadius: this.state.TopBorderRadius,
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
          source={{uri:this.props.image}}
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
          source={this.props.up}
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
          styles.bottom,
          {
            width: this.state.bottom_width,
            height: this.state.bottom_height,
            borderRadius: this.state.BottomBorderRadius,
            transform: this.state.bottom_pan.getTranslateTransform(),
          },
        ]}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 4}}>
            <Text style={styles.categoryTitle}>{this.props.title}</Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                color: 'gray',
                paddingBottom: 10,
              }}>
              {this.props.description}
            </Text>
            <Text style={{fontSize: 12, fontWeight: '500', color: 'gray'}}>
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
            {this.props.content?this.props.content:'这视频没有简介哦~'}
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
              ref="container"
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
export default connect(state => ({pressed:state.pressed}), {playVideo, resetVideo,press})(CardModal);
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

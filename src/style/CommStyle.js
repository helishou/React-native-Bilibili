import {Dimensions, StyleSheet} from 'react-native';
import px2dp from '../util';
// 计算左侧的外边距，使其居中显示
let {width, height} = Dimensions.get('window');

let devWidth = 540;
let devHeight = 1260;
console.log(width, 'width');
console.log(height, 'heighth');
let cols = 1;
export let coles = cols; //行数
if (height < width) {
  // (width = height + width), (height = width - height), (width = width - height);
  (devWidth = devHeight + devWidth),
    (devHeight = devWidth - devHeight),
    (devWidth = devWidth - devHeight);
  coles = cols * 2;
  // cols = cols * 2;
}

export const wConffient = Number.parseFloat(width / devWidth / cols);
export const hConffient = Number.parseFloat(height / devHeight / cols);
export const marginLeft = Number.parseInt(30 * wConffient);
export const themeColor = '#f4f4f4';
export const tapGreen = '#01BDC5';
// 开发分辨率为1260*540

const card_width = Number.parseInt((width - (coles + 1) * marginLeft) / coles);
const card_height = Number.parseInt(450 * hConffient);
const hMargin = Number.parseInt(20 * hConffient);
const radius = Number.parseInt(12 * wConffient);
const padding = Number.parseInt(17 * wConffient);
const fontSize = Number.parseInt(23 * wConffient);
const smallFontSize = Number.parseInt(15 * wConffient);
export const userCirle = Number.parseInt(40 * wConffient);
const barHeight = Number.parseInt(100 * hConffient);
export const styles = StyleSheet.create({
  listViewStyle: {
    flex: 1,
    // 改变主轴的方向
    flexDirection: 'row',
    // 多行显示
    flexWrap: 'wrap',
    // 侧轴方向
    backgroundColor: '#e7e1ea',
    paddingBottom: 10,
  },
  container: {
    // width: card_width,
    // height: card_height + 5,
    alignItems: 'center',
    alignSelf: 'center',
    // marginLeft: marginLeft,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: radius,
    // overflow: 'hidden',
    elevation: 20, // 适配android的
    shadowOffset: {width: 0, height: 3.5}, // 以下4项适配ios
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  face: {
    marginTop: px2dp(10),
    marginRight: px2dp(5),
    width: height / 12,
    height: height / 12,
    resizeMode: 'cover',
    borderRadius: height / 24,
  },
  innerView: {
    backgroundColor: 'white',
    width: card_width,
    height: card_height + 5,
    borderRadius: radius,
  },
  imgView: {
    // borderTopLeftRadius: 5,
    // borderTopRightRadius: 5,
    width: card_width,
    height: 0.67 * card_height,
  },
  brief: {
    width: card_width * 0.75,
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems:'center'
    alignContent: 'center',
    textAlignVertical: 'center',
  },
  ownerName: {
    flex: 1,
    textAlign: 'left',
    paddingLeft: padding,
    marginTop: hMargin,
    // paddingTop: padding,
    // width: card_width,
    color: '#2c2c2c',
    opacity: 0.7,
    fontSize: smallFontSize,
  },

  tname: {
    flex: 1,
    textAlign: 'left',

    // paddingTop: padding,
    paddingLeft: padding,

    color: '#2c2c2c',
    opacity: 0.7,
    fontSize: smallFontSize,
  },
  briefImage: {
    width: card_width * 0.25,
    paddingTop: padding,
    // flexDirection: 'column',
    textAlign: 'right',
    alignItems: 'flex-end',
  },
  notIntrest: {
    textAlign: 'right',
    fontSize: fontSize * 1,
    paddingRight: padding * 0.8,
    opacity: 0.5,
    fontWeight: 'bold',
  },
  fullScreen: {
    width: width,
    height: height,
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems:'center'
    alignContent: 'center',
    textAlignVertical: 'center',
  },
  notIntrestModal: {
    height: height,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

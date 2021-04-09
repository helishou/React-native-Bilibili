import {Dimensions, StyleSheet} from 'react-native';
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
    marginBottom: hMargin * 0.75,
    marginTop: hMargin * 0.75,
    // backgroundColor: 'white',
    // borderRadius: radius,
    // overflow: 'hidden',
    elevation: 20, // 适配android的
    shadowOffset: {width: 0, height: 3.5}, // 以下4项适配ios
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
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
    zIndex: 8,
  },
  top: {
    marginBottom: 0,
    backgroundColor: '#f4f4f4',
  },
  bottom: {
    marginTop: 0,
    padding: 16,
    borderBottomLeftRadius: radius,
    borderBottomRightRadius: radius,
    backgroundColor: 'white',
    elevation: 20,
  },
  backButton: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 50,
    left: 20,
    zIndex: 20,
    width: userCirle,
    height: userCirle,
    borderRadius: userCirle,
    backgroundColor: 'black',
    opacity: 0.7,
    elevation: 20,
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
    textAlign: 'left',
    paddingLeft: padding,
    marginTop: hMargin,
    // paddingTop: padding,
    // width: card_width,
    color: '#2c2c2c',
    opacity: 0.7,
    fontSize: smallFontSize,
  },
  categoryTitle: {
    textAlign: 'left',
    marginTop: hMargin / 5,
    marginBottom: hMargin / 2,
    // paddingLeft: padding,
    textAlignVertical: 'center',
    // paddingTop: padding,
    // width: card_width,
    color: 'black',
    fontSize: fontSize,
    fontWeight: 'bold',
    height: card_width * 0.12,
  },

  tname: {
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
  face: {
    marginRight: padding,
    width: card_height * 0.22,
    height: card_height * 0.22,
    resizeMode: 'cover',
    borderRadius: card_height * 0.11,
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

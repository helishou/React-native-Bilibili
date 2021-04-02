import {Dimensions, StyleSheet} from 'react-native';
// 计算左侧的外边距，使其居中显示
const {width, height} = Dimensions.get('window');
const cols = 1;
const marginLeft = Number.parseInt((20 * 540) / width);
export const themeColor = '#fff';
// 开发分辨率为1260*540
const card_width = Number.parseInt((width - (cols + 1) * marginLeft) / cols);
const card_height = Number.parseInt((300 * 1260) / height);
const hMargin = Number.parseInt((20 * 1260) / height);
const radius = Number.parseInt((12 * 540) / width);
const padding = Number.parseInt((12 * 540) / width);
const fontSize = Number.parseInt((19 * 540) / width);
export const styles = StyleSheet.create({
  listViewStyle: {
    // 改变主轴的方向
    flexDirection: 'column',
    // 多行显示
    // flexWrap: 'wrap',

    // 侧轴方向
    backgroundColor: '#e7e1ea',
    paddingBottom: 10,
  },
  wrapStyle: {
    width: card_width,
    height: card_height + 5,
    marginLeft: marginLeft,
    marginTop: hMargin,
    backgroundColor: 'white',
    borderRadius: radius,
    overflow: 'hidden',
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
    height: 0.7 * card_height,
  },
  brief: {
    flex: 4,
    flexDirection: 'column',
    // alignContent:'center',
  },
  ownerName: {
    textAlign: 'left',
    paddingLeft: padding,
    marginTop: hMargin / 2,
    // paddingTop: padding,
    // width: card_width,
    color: '#2c2c2c',
    opacity: 0.7,
  },
  categoryTitle: {
    textAlign: 'left',
    marginTop:hMargin/5,
    paddingLeft: padding,
    // paddingTop: padding,
    // width: card_width,
    color: 'black',
    fontSize: fontSize,
    fontWeight: 'bold',
  },

  tname: {
    textAlign: 'left',
    marginTop: hMargin / 2,
    // paddingTop: padding,
    paddingLeft: padding,
    // width: card_width,
    color: '#2c2c2c',
    opacity: 0.7,
  },
  briefImage: {
    flex: 1,
    paddingTop: padding,
  },
  face: {
    width: card_height * 0.2,
    height: card_height * 0.2,
    resizeMode: 'cover',
    borderRadius: card_height * 0.1,
  },
});

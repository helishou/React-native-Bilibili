import {Dimensions, StyleSheet} from 'react-native';
// 计算左侧的外边距，使其居中显示
const {width, height} = Dimensions.get('window');
const cols = 2;
const marginLeft = 8;

const card_width = Number.parseInt((width - (cols + 1) * marginLeft) / cols);
const card_height = 120;
const hMargin = 10;
export const styles = StyleSheet.create({
  listViewStyle: {
    // 改变主轴的方向
    flexDirection: 'row',
    // 多行显示
    flexWrap: 'wrap',
    // 侧轴方向
    backgroundColor: '#e7e1ea',
    paddingBottom: 10,
  },
  wrapStyle: {
    width: card_width,
    height: card_height + 50,
    marginLeft: marginLeft,
    marginTop: hMargin,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  innerView: {
    width: card_width,
    height: card_height + 5,
  },
  imgView: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: card_width,
    height: card_height,
  },
  categoryTitle: {
    textAlign: 'left',
    padding: 5,
    width: card_width,
    color: '#2c2c2c',
  },
});

/*
 * @Author       : helishou
 * @Date         : 2021-04-22 13:50:35
 * @LastEditTime : 2021-06-08 09:18:48
 * @LastEditors  : helishou
 * @Description  : view内负责接收新的弹幕消息，负责分配弹幕弹道位置，负责移动弹幕，
 * 当弹幕移动到距离右边界一定距离时，设置为当前弹道可以添加下一个弹幕，当移动到屏幕外时，删除对应的数据。
 * item负责显示单个弹幕的内容。 所有的逻辑都在view内，item可以视为一个普通的view。
 * 所有的移动效果，通过一个定时器实现，所有弹幕移动起来的效果更整齐。视觉效果好。
 * @FilePath     : \src\component\video\danmuku\index.js
 * 你用你的指尖,阻止我说再见,在bug完全失去之前
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import BarrageMoveView from './components/BarrageMoveView';
import {connect} from 'react-redux';

const {height, width} = Dimensions.get('window');
class Danmuku extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.id = parseInt(props.currentTime * 10);
  }

  componentDidMount() {
    this.addBarrageWithInterval();
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
    this.interval1 && clearInterval(this.interval1);
  }

  addBarrageWithInterval = () => {
    this.interval = setInterval(() => {
      this.id = this.id + 1;
      if (this.props.danmuku[this.id] == undefined) {
        return;
      }
      const newData = [
        {
          title: this.props.danmuku[this.id][1],
          id: this.id,
          color: this.props.danmuku[this.id][0],
        },
      ];
      this.setState({data: newData});
    }, 100);
  };

  onButtonPress = text => {
    this.id = this.id + 1;
    const newData = [{title: text, id: this.id}];
    this.setState({data: newData});
  };

  // getText = () => {
  //   const number = this.getRundomNumber(this.props.danmuku.length - 1);
  //   return this.props.danmuku[number];
  // };

  getRundomNumber = max => {
    return Math.floor(Math.random() * (max + 1));
  };

  render() {
    // console.debug('APP');
    return (
      <View
        style={
          this.props.fullscreen ? styles.fullscreenContainer : styles.container
        }>
        <View style={styles.barrageView}>
          <BarrageMoveView
            newMessages={this.state.data}
            numberOfLines={10}
            speed={1}
          />
        </View>
      </View>
    );
  }
}
export default connect(
  state => ({
    fullscreen: state.fullscreen,
    currentTime: state.video.currentTime,
  }),
  {},
)(Danmuku);

const styles = StyleSheet.create({
  fullscreenContainer: {
    // flex: 1,
    position: 'absolute',
    top: 20,
    right: 0,
    width: height * 2,
    height: width,
    paddingTop: 24,
    backgroundColor: 'rgba(0,0,0,0)',
    // backgroundColor: 'red',
    paddingBottom: 0,
    elevation: 20,
  },
  container: {
    // flex: 1,
    position: 'absolute',
    top: 20,
    width: width,
    height: width * 0.5,
    paddingTop: 24,
    // backgroundColor: 'rgba(0,0,0,0)',
    backgroundColor: 'rgba(0,0,0,0)',
    paddingBottom: 0,
    elevation: 20,
  },
  barrageView: {
    flex: 1,
  },
});

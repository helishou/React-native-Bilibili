import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import BarrageMoveView from './components/BarrageMoveView';
import BarrageInputView from './components/BarrageInputView';
import UI from './UI';
import VideoPlayer from 'react-native-rn-videoplayer'; //#endregion
/*  1.BarrageMoveView + BarrageItem （推荐）

view内负责接收新的弹幕消息，负责分配弹幕弹道位置，负责移动弹幕，当弹幕移动到距离右边界一定距离时，设置为当前弹道可以添加下一个弹幕，当移动到屏幕外时，删除对应的数据。
  
  item负责显示单个弹幕的内容。 所有的逻辑都在view内，item可以视为一个普通的view。
  
  所有的移动效果，通过一个定时器实现，所有弹幕移动起来的效果更整齐。视觉效果好。

 */
export default class Danmuku extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.id = 0;
    this.data = this.props.danmuku;
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
      const text = this.getText();
      // console.log('text',text)
      // const newData = [{title: text, id: this.id}];
      if (this.data[this.id] == undefined) {
        return;
      }
      // console.log('this.props.danmuku[this.id]', this.props.danmuku[this.id][1]);
      const newData = [
        {
          title: this.data[this.id][1],
          id: this.id,
          color: this.data[this.id][0],
        },
      ];
      this.setState({data: newData});
    }, 1000);
  };

  onButtonPress = text => {
    this.id = this.id + 1;
    const newData = [{title: text, id: this.id}];
    this.setState({data: newData});
  };

  getText = () => {
    const number = this.getRundomNumber(this.data.length - 1);
    return this.data[number];
  };

  getRundomNumber = max => {
    return Math.floor(Math.random() * (max + 1));
  };

  render() {
    // console.debug('APP');
    return (
      <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    position: 'absolute',
    top: 20,
    width: 400,
    height: 200,
    paddingTop: UI.IS_IPHONE_X ? 34 : 24,
    backgroundColor: 'rgba(0,0,0,0)',
    paddingBottom: UI.IS_IPHONE_X ? 44 : 0,
    elevation: 20,
  },
  barrageView: {
    flex: 1,
    // height: UI.size.screenHeight / 2,
    // borderWidth: 1,
  },
});

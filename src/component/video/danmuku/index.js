/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import BarrageMoveView from './components/BarrageMoveView';
import BarrageInputView from './components/BarrageInputView';
import UI from './UI';
import VideoPlayer from 'react-native-rn-videoplayer';
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

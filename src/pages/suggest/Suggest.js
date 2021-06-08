/*
 * @Author       : helishou
 * @Date         : 2021-04-12 09:06:06
 * @LastEditTime : 2021-06-08 10:23:41
 * @LastEditors  : helishou
 * @Description  : 推荐页面
 * @FilePath     : \src\pages\suggest\Suggest.js
 * 你用你的指尖,阻止我说再见,在bug完全失去之前
 */
import React, {Component} from 'react';
import {View} from 'react-native';
import VideoList from '../../component/videoList';
import px2dp from '../../util/index';

class Suggest extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      header: null,
      // title: navigation.getParam('title', '获取title失败'),
      tabBarVisible: false,
      pressed: false,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isLoaded: false,
      refreshing: false,
      modalVisible: false,
      scroll: true,
    };
  }

  componentDidMount() {
    // this.fetchHotData();
    this.fetchData();
    // this.getData();
  }

  fetchData() {
    fetch('https://www.bilibili.com/index/ding.json')
      .then(response => response.json())
      .then(Soucedata => {
        let preDataList = [];
        Object.keys(Soucedata).map((data, i) => {
          if ((i == 4) | (i == 9) | (i == 1)) {
            return;
          }
          //加上kye={i}，控制台就不会报错
          Object.keys(Soucedata[data]).map((v, i) => {
            //加上kye={i}，控制台就不会报错
            // console.log(v);
            try {
              if (Soucedata[data][v].videos) {
                // console.log('push', Soucedata[data][v]);
                return preDataList.push({
                  ...Soucedata[data][v],
                  key: Soucedata[data][v].aid,
                });
              }
            } catch {
              return;
            }
          });
        });
        var randomNumber = function () {
          return 0.5 - Math.random();
        };
        preDataList.sort(randomNumber);
        // console.log('object', preDataList);
        this.setState({
          dataSource: preDataList,
          isLoaded: true,
        });
      })
      .catch(err => {
        alert('出错了', err);
        this.setState({
          dataSource: null,
          isLoaded: false,
        });
      })
      .done();
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <View style={{backgroundColor: '#f4f4f4'}}>
        <VideoList
          dataSource={this.state.dataSource}
          compensation={px2dp(20)}
          // scrollEnabled={this.state.scroll}
          isLoaded={this.state.isLoaded}
          // onRefresh={this._onRefresh}
          fetchData={() => this.fetchData()}
        />
      </View>
    );
  }
}

export default Suggest;
// export default connect(state=>({video:state.video}),{})(Suggest);

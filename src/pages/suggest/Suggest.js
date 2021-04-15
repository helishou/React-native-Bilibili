import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
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
          // console.log(data, Soucedata[data]);
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
          // randomNumber(a,b) 返回的值大于 0 ，则 b 在 a 的前边；
          // randomNumber(a,b) 返回的值等于 0 ，则a 、b 位置保持不变；
          // randomNumber(a,b) 返回的值小于 0 ，则 a 在 b 的前边。
          return 0.5 - Math.random();
        };
        preDataList.sort(randomNumber);
        // console.log('object', preDataList);
        this.setState({
          dataSource: preDataList,
          isLoaded: true,
        });
        // for (let i = 0; i < data.itemList.length; i++) {
        //   if (data.itemList[i].type === 'video') {
        //     if (data.itemList[i].data.title === '') {
        //       data.itemList[i].data.title = data.itemList[i].data.description;
        //     }

        //     preDataList.push(data.itemList[i]);
        //   }
        // }

        // //数组合并
        // let dataList = preDataList.concat(dataHotList);
        // console.log(dataList);
        // console.log('-----');
        // this.setState({
        //   dataSource: new FlatList.DataSource({
        //     rowHasChanged: (r1, r2) => r1 !== r2,
        //   }).cloneWithRows(dataList),
        //   isLoaded: true,
        // });
      })
      .catch(err => {
        console.log('error!!!', err);
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
        {/* <Button
          onPress={() => {
            return navigation.navigate('Live');
          }}
          title="点我跳转直播"></Button> */}
        {/* <View
        // style={{display: 'none'}}
        >
          <VideoPlayer />
        </View> */}

        <VideoList
          dataSource={this.state.dataSource}
          compensation={px2dp(20)}
          // scrollEnabled={this.state.scroll}
          isLoaded={this.state.isLoaded}
          // onRefresh={this._onRefresh}
          fetchData={() => this.fetchData()}></VideoList>
      </View>
    );
  }
}

export default connect(state => ({pressed: state.pressed}), {})(Suggest);
// export default connect(state=>({video:state.video}),{})(Suggest);

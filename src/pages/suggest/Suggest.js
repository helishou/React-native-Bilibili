import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Button,
  StyleSheet,
  Touchable,
  Modal,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import VideoPlayer from '../../component/video/VideoPlayer';
import Banner from './Banner';
import {coles, styles} from '../../style/CommStyle';
import {color} from 'react-native-reanimated';
import {connect} from 'react-redux';
import {press} from '../../redux/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import VideoList from '../../component/videoList';
let dataHotList = [];

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
      dataSource: null,
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
  // getData() {
  //   for (let key in data) {
  //     console.log(data[key], 'item');
  //   }
  // }

  // disablePressed(state) {
  //   this.setState({pressed: state});
  // }

  fetchData() {
    fetch('https://www.bilibili.com/index/ding.json')
      .then(response => response.json())
      .then(Soucedata => {
        let preDataList = [];
        // let data = Soucedata['douga'];
        // Object.keys(data).map((v, i) => {
        //   //加上kye={i}，控制台就不会报错

        //   return preDataList.push(data[v]);
        // });
        Object.keys(Soucedata).map((data, i) => {
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
        {this.state.isLoaded ? (
          // {/* <Banner /> */}
          <VideoList
            dataSource={this.state.dataSource}
            // scrollEnabled={this.state.scroll}
            isLoaded={this.state.isLoaded}
            // onRefresh={this._onRefresh}
            fetchData={() => this.fetchData()}></VideoList>
        ) : (
          <View style={styles.indicatorStyle}>
            <ActivityIndicator size="large" color="#398DEE" />
          </View>
        )}
      </View>
    );
  }

  pushToVideoDetail(Item) {
    const data = {};
    let updateTime;
    let avatar;
    let owner_nickname;

    this.props.navigation.navigate('videoPlayDetail', {
      // id: data.id,
      // title: data.title,
      // description: data.description,
      // playUrl: data.playUrl,
      // owner_nickname: owner_nickname,
      // avatar: avatar,
      // updateTime: updateTime,
      // placeholder: data.cover.feed,
      // shareCount: data.consumption.shareCount,
      // collectionCount: data.consumption.collectionCount,
      // replyCount: data.consumption.replyCount,
    });
  }

  //下拉刷新
  // _onRefresh = () => {
  //   // this.setState({isLoaded: true});
  //   this.props.press(false);
  //   this.fetchData();
  // };
}

export default connect(state => ({pressed: state.pressed}), {})(Suggest);
// export default connect(state=>({video:state.video}),{})(Suggest);

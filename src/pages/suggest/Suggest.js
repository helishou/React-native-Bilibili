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
import {api} from '../../config/api';
import {coles, styles} from '../../style/CommStyle';
import {color} from 'react-native-reanimated';
import CardModal from '../../component/card-modal';
import {connect} from 'react-redux';
import {press} from '../../redux/action';
import Icon from 'react-native-vector-icons/FontAwesome';
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
  disableScroll() {
    this.setState({scroll: !this.state.scroll});
  }
  // disablePressed(state) {
  //   this.setState({pressed: state});
  // }

  fetchData() {
    fetch(api.suggest)
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
                return preDataList.push({...Soucedata[data][v],key:Soucedata[data][v].pic});
              }
            } catch {
              return;
            }
          });
        });
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
  onRef = ref => {
    this.child = ref;
  };
  render() {
    const navigation = this.props.navigation;
    console.log('pppp', this.props.pressed);
    return (
      <View style={{backgroundColor: '#f4f4f4'}}>
        {/* <Button
          onPress={() => {
            return navigation.navigate('Live');
          }}
          title="点我跳转直播"></Button> */}
        <View
        // style={{display: 'none'}}
        >
          {this.props.pressed ? (
            <TouchableOpacity
              style={[styles.backButton]}
              onPress={() => {
                this.child._onPress();
                this.props.press(false);
                this.setState({scroll: true});
              }}>
              <Animated.View
                style={[
                  {
                    opacity: 0.8,
                    position: 'relative',
                    left: 3,
                    top: 3,
                  },
                ]}>
                <Text style={{color: 'white'}}>
                  <Icon size={23} name="chevron-left" />
                </Text>
              </Animated.View>
            </TouchableOpacity>
          ) : (
            <View />
          )}
          <VideoPlayer />
        </View>
        {this.state.isLoaded ? (
          // {/* <Banner /> */}
          <View
            style={{
              backgroundColor: '#f4f4f4',
              alignItem: 'center',
              alignContent: 'center',
            }}>
            <FlatList
              // style={{display: 'none'}}

              initialListSize={6}
              data={this.state.dataSource}
              scrollEnabled={this.state.scroll}
              numColumns={coles}
              renderItem={({item}) => this._renderRow(item)}
              contentContainerStyle={styles.ListViewStyle}
              refreshing={!this.state.isLoaded}
              onRefresh={() => this._onRefresh()}
              ListFooterComponent={
                <Text style={{color: 'black'}}>已经到底了哦</Text>
              }
            />
          </View>
        ) : (
          <View style={styles.indicatorStyle}>
            <ActivityIndicator size="large" color="#398DEE" />
          </View>
        )}
      </View>
    );
  }
  // 注意TouchableOpacity和内层View容器的样式
  _renderRow(item) {
    return (
      <CardModal
        // pressedStyle={styles.container}
        key={item.pic}
        onRef={this.onRef}
        title={
          item.title
            ? item.title.length > 25
              ? item.title.substr(0, 25) + '...'
              : item.title
            : ''
        }
        touchable={this.state.pressed}
        description={'UP主：' + item.owner.name}
        image={item.pic}
        up={{
          uri: item.owner.face,
        }}
        color="#01BDC5"
        content={item.desc}
        onClick={() => this.disableScroll()}
        // onClick2={() => this.disablePressed()}
        due={item.tname}
        videos={item.videos}
        aid={item.aid}
        cid={item.cid}
      />
      // <View key={item.pic}>
      //   <TouchableOpacity
      //     style={styles.wrapStyle}
      //     activeOpacity={0.7}
      //     onPress={() => this.pushToVideoDetail(item)}>
      //     <View style={styles.innerView}>
      //       <Image
      //         source={{
      //           uri: item.pic,
      //         }}
      //         style={styles.imgView}
      //       />
      //       <View style={{flexDirection: 'row'}}>
      //         <View style={styles.brief}>
      //           <Text style={styles.ownerName}>
      //             {'UP主：' + item.owner.name}
      //           </Text>
      //           <Text style={styles.categoryTitle}>
      //             {item.title
      //               ? item.title.length > 25
      //                 ? item.title.substr(0, 25) + '...'
      //                 : item.title
      //               : ''}
      //           </Text>
      //           <Text style={styles.tname}>{item.tname}</Text>
      //         </View>
      //         <View style={styles.briefImage}>
      //           <Image
      //             source={{
      //               uri: item.owner.face,
      //             }}
      //             style={styles.face}
      //           />
      //           <Text
      //             style={styles.notIntrest}
      //             onPress={() => {
      //               this.setState({modalVisible: true});
      //             }}>
      //             :
      //           </Text>
      //         </View>
      //       </View>
      //     </View>
      //   </TouchableOpacity>
      //   <Modal
      //     animationType="fade"
      //     transparent={true}
      //     visible={this.state.modalVisible}>
      //     <TouchableWithoutFeedback
      //       onPress={() => {
      //         this.setState({modalVisible: false});
      //       }}>
      //       <View style={styles.fullScreen}>
      //         <Text style={styles.notIntrestModal}>hello world</Text>
      //       </View>
      //     </TouchableWithoutFeedback>
      //   </Modal>
      // </View>
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
  _onRefresh = () => {
    // this.setState({isLoaded: true});
    this.props.press(false);
    this.fetchData();
  };
}

export default connect(state => ({pressed: state.pressed}), {press})(Suggest);
// export default connect(state=>({video:state.video}),{})(Suggest);

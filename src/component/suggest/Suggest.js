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
} from 'react-native';
import Banner from './Banner';
import {api} from '../../config/api';
import {styles} from '../../style/CommStyle';
import data from './data';
import {color} from 'react-native-reanimated';
let dataHotList = [];

class Suggest extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      header: null,
      // title: navigation.getParam('title', '获取title失败'),
      tabBarVisible: false,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
      isLoaded: false,
      refreshing: false,
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
  fetchData() {
    fetch(api.suggest)
      .then(response => response.json())
      .then(Soucedata => {
        let preDataList = [];
        let data = Soucedata['douga'];
        Object.keys(data).map((v, i) => {
          //加上kye={i}，控制台就不会报错
          return preDataList.push(data[v]);
        });
        console.log('object', preDataList);
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

  // fetchHotData() {
  //   fetch(api.suggest)
  //     .then(response => response.json())
  //     .then(data => {
  //       for (let i = 0; i < data.itemList.length; i++) {
  //         if (data.itemList[i].type === 'video') {
  //           if (data.itemList[i].data.title === '') {
  //             data.itemList[i].data.title = data.itemList[i].data.description;
  //           }

  //           dataHotList.push(data.itemList[i]);
  //         }
  //       }
  //       console.log(dataHotList);
  //       console.log('----------')
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       this.setState({
  //         dataSource: null,
  //         isLoaded: false,
  //       });
  //     })
  //     .done();
  // }

  render() {
    const navigation = this.props.navigation;
    return (
      <View style={{flex: 1, backgroundColor: '#f4f4f4'}}>
        {/* <Button
          onPress={() => {
            return navigation.navigate('Live');
          }}
          title="点我跳转直播"></Button> */}
        {this.state.isLoaded ? (
          // {/* <Banner /> */}
          <View style={{backgroundColor: '#f4f4f4'}}>
            <FlatList
              initialListSize={6}
              data={this.state.dataSource}
              renderItem={({item}) => this._renderRow(item)}
              contentContainerStyle={styles.ListViewStyle}
              refreshing={!this.state.isLoaded}
              onRefresh={() => this.fetchData()}
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
      <TouchableOpacity
        style={styles.wrapStyle}
        activeOpacity={0.5}
        onPress={() => this.pushToVideoDetail(item)}>
        <View style={styles.innerView}>
          <Image
            source={{
              uri: item.pic,
            }}
            style={styles.imgView}
          />
          <View style={{flexDirection:'row'}}>
            <View style={styles.brief}>
              <Text style={styles.ownerName}>{'UP主：' + item.owner.name}</Text>
              <Text style={styles.categoryTitle}>
                {item.title
                  ? item.title.length > 15
                    ? item.title.substr(0, 15) + '...'
                    : item.title
                  : ''}
              </Text>
              <Text style={styles.tname}>{item.tname}</Text>
            </View>
            <View style={styles.briefImage}>
              <Image
                source={{
                  uri: item.owner.face,
                }}
                style={styles.face}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  // _renderRow(item) {
  //   return (
  //     <TouchableOpacity
  //       style={styles.wrapStyle}
  //       activeOpacity={0.5}
  //       onPress={() => this.pushToVideoDetail(item)}>
  //       <View style={styles.innerView}>
  //         <Image source={{uri: item.data.cover.feed}} style={styles.imgView} />
  //         <Text style={styles.categoryTitle}>
  //           {item.data.title
  //             ? item.data.title.length > 18
  //               ? item.data.title.substr(0, 18) + '...'
  //               : item.data.title
  //             : ''}
  //         </Text>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // }

  pushToVideoDetail(data) {
    let updateTime;
    let avatar;
    let owner_nickname;

    // if (data.author){
    //         owner_nickname=  data.author.name
    //         avatar = data.author.icon
    //         updateTime = ata.data.releaseTime
    // }else {
    //     owner_nickname=  data.content.data.author.name
    //     avatar = data.content.data.author.icon
    //     updateTime = data.content.data.date
    // }

    owner_nickname = data.author.name;
    avatar = data.author.icon;
    updateTime = data.releaseTime;

    this.props.navigation.navigate('VideoPlayDetail', {
      id: data.id,
      title: data.title,
      description: data.description,
      playUrl: data.playUrl,
      owner_nickname: owner_nickname,
      avatar: avatar,
      updateTime: updateTime,
      placeholder: data.cover.feed,
      shareCount: data.consumption.shareCount,
      collectionCount: data.consumption.collectionCount,
      replyCount: data.consumption.replyCount,
    });
  }

  //下拉刷新
  _onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchData().then(() => {
      this.setState({refreshing: false});
    });
  };
}

export default Suggest;

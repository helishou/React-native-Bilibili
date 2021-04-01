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
} from 'react-native';
import Banner from './Banner';
import {api} from '../../config/api';
import {styles} from '../../style/CommStyle';
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
    this.fetchHotData();
    this.fetchData();
  }

  fetchData() {
    fetch(api.hot)
      .then(response => response.json())
      .then(data => {
        let preDataList = [];

        for (let i = 0; i < data.itemList.length; i++) {
          if (data.itemList[i].type === 'video') {
            if (data.itemList[i].data.title === '') {
              data.itemList[i].data.title = data.itemList[i].data.description;
            }

            preDataList.push(data.itemList[i]);
          }
        }

        //数组合并
        let dataList = preDataList.concat(dataHotList);

        this.setState({
          dataSource: new FlatList.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
          }).cloneWithRows(dataList),
          isLoaded: true,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          dataSource: null,
          isLoaded: false,
        });
      })
      .done();
  }

  fetchHotData() {
    fetch(api.suggest)
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.itemList.length; i++) {
          if (data.itemList[i].type === 'video') {
            if (data.itemList[i].data.title === '') {
              data.itemList[i].data.title = data.itemList[i].data.description;
            }

            dataHotList.push(data.itemList[i]);
          }
        }

        console.log(dataHotList);
      })
      .catch(err => {
        console.log(err);
        this.setState({
          dataSource: null,
          isLoaded: false,
        });
      })
      .done();
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        {this.state.isLoaded ? (
          <ScrollView style={{backgroundColor: '#e7e1ea'}}>
            <Banner />
            <View>
              <FlatList
                initialListSize={6}
                dataSource={this.state.dataSource}
                renderRow={rowData => this._renderRow(rowData)}
                contentContainerStyle={styles.ListViewStyle}
                refreshing
              />
            </View>
          </ScrollView>
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
          <Image source={{uri: item.data.cover.feed}} style={styles.imgView} />
          <Text style={styles.categoryTitle}>
            {item.data.title
              ? item.data.title.length > 18
                ? item.data.title.substr(0, 18) + '...'
                : item.data.title
              : ''}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  pushToVideoDetail(data) {
    let updateTime;
    let avatar;
    let owner_nickname;

    // if (data.data.author){
    //         owner_nickname=  data.data.author.name
    //         avatar = data.data.author.icon
    //         updateTime = ata.data.releaseTime
    // }else {
    //     owner_nickname=  data.data.content.data.author.name
    //     avatar = data.data.content.data.author.icon
    //     updateTime = data.data.content.data.date
    // }

    owner_nickname = data.data.author.name;
    avatar = data.data.author.icon;
    updateTime = data.data.releaseTime;

    this.props.navigation.navigate('VideoPlayDetail', {
      id: data.data.id,
      title: data.data.title,
      description: data.data.description,
      playUrl: data.data.playUrl,
      owner_nickname: owner_nickname,
      avatar: avatar,
      updateTime: updateTime,
      placeholder: data.data.cover.feed,
      shareCount: data.data.consumption.shareCount,
      collectionCount: data.data.consumption.collectionCount,
      replyCount: data.data.consumption.replyCount,
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

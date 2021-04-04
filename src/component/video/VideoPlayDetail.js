import React, {Component} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-af-video-player';

import {theme} from '../../util/theme';
import {
  getLocalTime,
  getVideoViewsRandomNum,
  showErrorMsg,
} from '../../util/function';

import {api} from '../../config/api';
// import fetch from '../../util/http'
// 计算左侧的外边距，使其居中显示
const {width, height} = Dimensions.get('window');
const cols = 1;
const marginLeft = 8;

const card_width = Number.parseInt((width - (cols + 1) * marginLeft) / cols);
const card_height = 120;
const hMargin = 10;

class VideoPlayDetail extends Component {
  static navigationOptions = ({navigation}) => {
    const {state} = navigation;
    let header;
    if (state.params.fullscreen === false) {
      header = null;
    }
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
    return {
      tabBarVisible,
      header,
      title: null | ('title', '获取title失败'),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
      isLoaded: false,
      placeholder_img: 'http://oe3vwrk94.bkt.clouddn.com/head.jpeg',
      videoViewsRandomNum: getVideoViewsRandomNum(),
      data: [],
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    // const id = null|('id', 'NO-ID');
    this.fetchData('1');
  }

  fetchData(id) {
    id === 0 ? (id = 110763) : (id = id);
    // alert(id);
    fetch(api.videoRecommend + id)
      .then(response => response.json())
      .then(data => {
        let dataList = [];
        for (let i = 0; i < data.itemList.length; i++) {
          if (data.itemList[i].type !== 'textCard' && data.code !== 400) {
            dataList.push(data.itemList[i]);
          }
        }

        // this.setState({
        //     dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(dataList),
        //     isLoaded:true
        // })
        // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
        this.setState({
          data: dataList,
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

  render() {
    let shareCount;
    let collectionCount;
    let replyCount;
    const {navigation} = this.props;
    const title = null;
    const url = null;
    const description = null;
    const owner_nickname = null;
    const avatar = null;
    const updateTime = null;
    const placeholder = null;
    shareCount = null;
    collectionCount = null;
    replyCount = null;
    const logo = 'null';

    return (
      (<StatusBar translucent={true} hidden={true} animated={true} />),
      (
        <ScrollView style={{flex: 1, backgroundColor: '#f2f0f1'}} ref="totop">
          {this.state.isLoaded ? (
            <View style={styles.suggest_video_wrapper}>
              <Text style={{margin: 8, color: '#000', fontSize: 17}}>
                相关视频
              </Text>
              {/*<ListView*/}
              {/*dataSource={this.state.dataSource}*/}
              {/*renderRow={(rowData)=>this._renderRow(rowData)}*/}
              {/*contentContainerStyle={styles.listViewStyle}*/}
              {/*/>*/}
              <FlatList
                data={this.state.data}
                renderItem={this._renderRow.bind(this)}
                style={styles.list}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ) : (
            <View style={styles.indicatorStyle}>
              <ActivityIndicator size="large" color="#398DEE" />
            </View>
          )}
        </ScrollView>
      )
    );
  }

  _renderRow({item}) {
    return (
      <TouchableOpacity
        style={styles.wrapStyle}
        activeOpacity={0.5}
        onPress={() => this.pushToVideoDetail(item)}>
        <View style={styles.innerView}>
          <Image
            style={styles.imgView}
            source={{uri: item.data.cover.feed}}
            onError={e => console.log(e)}
          />
          <View>
            <Text style={styles.categoryTitle}>
              {item.data.title
                ? item.data.title.length > 18
                  ? item.data.title.substr(0, 18) + '...'
                  : item.data.title
                : ''}
            </Text>
            <Text style={styles.author}>UP：{item.data.author.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  pushToVideoDetail(data) {
    this.state.videoViewsRandomNum = getVideoViewsRandomNum();
    this.refs.totop.scrollTo({x: 0, y: 0, animated: false});
    this.props.navigation.navigate('VideoPlayDetail', {
      id: data.id,
      title: data.data.title,
      playUrl: data.data.playUrl,
      description: data.data.description,
    });
  }

  onFullScreen(status) {
    // Set the params to pass in fullscreen status to navigationOptions
    this.props.navigation.setParams({
      fullscreen: !status,
    });
  }

  onMorePress() {
    Alert.alert('标题', '功能开发中!', [{text: '好的!'}]);
  }
}

const styles = StyleSheet.create({
  video_header: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  suggest_video_wrapper: {
    paddingBottom: 10,
  },
  listViewStyle: {
    // 改变主轴的方向
    flexDirection: 'row',
    // 多行显示
    flexWrap: 'wrap',
    // 侧轴方向
    backgroundColor: '#f2f0f1',
    paddingBottom: 20,
  },
  wrapStyle: {
    width: card_width,
    height: card_height,
    marginLeft: marginLeft,
    marginTop: hMargin,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  innerView: {
    flex: 1,
    flexDirection: 'row',
    width: card_width,
    height: card_height,
  },
  imgView: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    width: card_width / 3,
    height: card_height,
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: '200',
    textAlign: 'left',
    width: card_width - card_width / 3,
    color: '#3c3c3c',
    paddingTop: 5,
    paddingLeft: 5,
  },
  author: {
    position: 'absolute',
    bottom: 5,
    left: 5,
  },

  container: {
    flex: 1,
  },
  bottomContainer: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 17,
    color: '#000000',
  },
});

export default VideoPlayDetail;

import React, {Component} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {api} from '../../config/api';

// 计算左侧的外边距，使其居中显示
const {width, height} = Dimensions.get('window');
const cols = 2;
const marginLeft = 8;

const card_width = Number.parseInt((width - (cols + 1) * marginLeft) / cols);
const card_height = 120;
const hMargin = 10;

class CategoryList extends Component {
  static navigationOptions = ({navigation}) => {
    let header;
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
    return {
      tabBarVisible,
      header,
      title: navigation.getParam('title', '获取title失败'),
      headerStyle: {
        backgroundColor: '#3496f0',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
      isLoaded: false,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    const id = navigation.getParam('id', 'NO-ID');
    console.log(id);

    this.fetchData(id);
  }

  fetchData(id) {
    fetch(api.categoryList + id)
      .then(response => response.json())
      .then(data => {
        let dataList = [];
        for (let i = 0; i < data.itemList.length; i++) {
          if (data.itemList[i].type === 'video') {
            dataList.push(data.itemList[i]);
          }
        }
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

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        {this.state.isLoaded ? (
          <FlatList
            dataSource={this.state.dataSource}
            renderRow={rowData => this._renderRow(rowData)}
            contentContainerStyle={styles.FlatListStyle}
          />
        ) : (
          <View style={styles.indicatorStyle}>
            <ActivityIndicator size="large" color="#398DEE" />
          </View>
        )}
      </View>
    );
  }
  // 注意TouchableOpacity和内层View容器的样式
  _renderRow(rowData) {
    return (
      <TouchableOpacity
        style={styles.wrapStyle}
        activeOpacity={0.5}
        onPress={() => this.pushToVideo(rowData.data)}>
        <View style={styles.innerView}>
          <Image
            source={{uri: rowData.data.cover.feed}}
            style={styles.imgView}
          />
          <Text style={styles.title}>
            {rowData.data.title
              ? rowData.data.title.length > 20
                ? rowData.data.title.substr(0, 20) + '...'
                : rowData.data.title
              : ''}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  pushToVideo(data) {
    this.props.navigation.navigate('VideoPlayDetail', {
      id: data.id,
      avatar: data.author.icon,
      updateTime: data.date,
      owner_nickname: data.author.name,
      title: data.title,
      playUrl: data.playUrl,
      description: data.description,
      placeholder: data.cover.feed,
      shareCount: data.consumption.shareCount,
      collectionCount: data.consumption.collectionCount,
      replyCount: data.consumption.replyCount,
    });
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 30,
    backgroundColor: '#398DEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTxt: {
    color: '#fff',
    fontSize: 14,
  },
  indicatorStyle: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FlatListStyle: {
    // 改变主轴的方向
    flexDirection: 'row',
    // 多行显示
    flexWrap: 'wrap',
    // 侧轴方向
    backgroundColor: '#e7e1ea',
    paddingBottom: 50,
  },
  wrapStyle: {
    width: card_width,
    height: card_height + 50,
    marginLeft: marginLeft,
    marginTop: hMargin,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  innerView: {
    width: card_width,
    height: card_height + 50,
  },
  imgView: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: card_width,
    height: card_height,
  },
  title: {
    padding: 5,
    width: card_width,
    color: '#2c2c2c',
  },
});

export default CategoryList;

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
// 计算左侧的外边距，使其居中显示
const {width, height} = Dimensions.get('window');
const cols = 2;
const marginLeft = 8;

const card_width = Number.parseInt((width - (cols + 1) * marginLeft) / cols);
const card_height = 120;
const hMargin = 10;

class category extends Component {
  static navigationOptions = {
    // title: '视频分类',
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
      isLoaded: false,
    };
  }

  componentDidMount() {
    // this.fetchData();
  }

  fetchData() {
    fetch(api.category)
      .then(response => response.json())
      .then(data => {
        //插入第一个“全部”tab
        data.unshift({
          dataType: 'dance',
          bgPicture: 'http://oe3vwrk94.bkt.clouddn.com/category_dance.jpg',
          name: '舞蹈',
        });
        let dataList = data;
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
        onPress={() => this.isFirst(rowData)}>
        <View>
          <Image source={{uri: rowData.bgPicture}} style={styles.imgView} />
          <Text style={styles.categoryTitle}>{rowData.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  isFirst(rowData) {
    if (rowData.dataType === 'dance') {
      this.props.navigation.navigate('Dance', {
        title: rowData.name,
      });
    } else {
      this.pushTolistVideo(rowData);
    }
  }
  pushTolistVideo(data) {
    const title = data.name;
    this.props.navigation.navigate('CategoryList', {
      id: data.id,
      title: title,
    });
  }
}

const styles = StyleSheet.create({
  FlatListStyle: {
    // 改变主轴的方向
    flexDirection: 'row',
    // 多行显示
    flexWrap: 'wrap',
    // 侧轴方向
    backgroundColor: '#e7e1ea',
    paddingBottom: 20,
  },
  wrapStyle: {
    width: card_width,
    height: card_height + card_height / 3,
    marginLeft: marginLeft,
    marginTop: hMargin,
    backgroundColor: 'white',
    borderRadius: 5,
  },

  imgView: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: card_width,
    height: card_height,
  },
  categoryTitle: {
    fontSize: 16,
    textAlign: 'center',
    padding: 5,
    width: card_width,
    height: card_height / 3,
    color: '#2c2c2c',
  },
});

export default category;

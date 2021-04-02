import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {api} from '../../config/api';

// 计算左侧的外边距，使其居中显示
const {width, height} = Dimensions.get('window');
const cols = 2;
const marginLeft = 8;

const card_width = Number.parseInt((width - (cols + 1) * marginLeft) / cols);
const card_height = 120;
const hMargin = 10;

function Live() {
  const navigation = useNavigation();
  // const navigationOptions = {
  //   // title: '视频分类',
  //   header: null,
  // };
  const [dataSource, setDataSource] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  const fetchData = () => {
    fetch(api.live)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let dataList = data.data.feeds;
        setDataSource(
          new FlatList.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
          }).cloneWithRows(dataList),
        );
        setIsLoaded(true);
      })
      .catch(err => {
        console.log(err);
        setDataSource('null');
        setIsLoaded(false);
      })
      .done();
  };
  // 注意TouchableOpacity和内层View容器的样式
  const _renderRow = rowData => {
    return (
      <TouchableOpacity
        style={styles.wrapStyle}
        activeOpacity={0.5}
        onPress={() => pushTo('LivePlayOnWebview', rowData)}>
        <View style={styles.innerView}>
          <Image source={{uri: rowData.image}} style={styles.imgView} />
          <Text style={styles.categoryTitle}>
            {rowData.nickname
              ? rowData.nickname.length > 15
                ? rowData.nickname.substr(0, 15) + '...'
                : rowData.nickname
              : ''}
          </Text>
          <Text style={styles.categorySamllTitle}>{rowData.watches} 人</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const pushTo = (view, data) => {
    navigation.navigate(view, {
      relateid: data.relateid,
      title: data.title,
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Button
        onPress={() => {
          return navigation.navigate('Suggest');
        }}
        title="点我跳转推荐"></Button>
      {isLoaded ? (
        <FlatList
          dataSource={dataSource}
          renderRow={rowData => _renderRow(rowData)}
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
    height: card_height + 50,
    marginLeft: marginLeft,
    marginTop: hMargin,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  innerView: {
    width: card_width,
    height: card_height + 5,
  },
  imgView: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: card_width,
    height: card_height,
  },
  categoryTitle: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    padding: 5,
    width: card_width,
    color: '#2c2c2c',
  },
  categorySamllTitle: {
    textAlign: 'left',
    paddingLeft: 12,
    width: card_width,
    color: '#858585',
  },
});

export default Live;

import Bottom from '../../../component/bottom';
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from 'react-native';
import {connect} from 'react-redux';
import Orientation from 'react-native-orientation';
import px2dp from '../../../util';
import {useNavigation} from '@react-navigation/native';
import {Card, WhiteSpace, WingBlank} from '@ant-design/react-native';
export default function UserList(props) {
  const navigation = useNavigation();
  console.log(props.dataSource, '用户们');
  const listRef = useRef();
  const _onScroll = event => {
    // console.log(event.nativeEvent.contentOffset.y);
    try {
      props.setContentOffsetY(event.nativeEvent.contentOffset.y);
    } catch {}
  };
  // const onClick = () => {
  //   navigation.navigate('userDetail', {
  //     mid: this.props.route.params.video.owner.mid,
  //     name: this.props.route.params.video.owner.name,
  //     face: this.state.face,
  //   });
  // };
  const onRefresh = () => {
    props.fetchData();
  };
  const _renderRow = item => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            console.log('我被按了6666');
            return navigation.navigate('userDetail', {
              mid: item.mid,
              name: item.uname,
              face: 'https:' + item.upic,
            });
          }}>
          <Card
            full
            style={{backgroundColor: '#f4f4f4', borderColor: '#bbbbbb'}}>
            <Card.Header
              title={item.uname}
              style={{height: 70}}
              thumbStyle={{width: 50, height: 50, borderRadius: 10}}
              thumb={'https:' + item.upic}
              // extra={<Button title="关注" color={props.color}></Button>}
            />
            <Card.Body>
              <View style={{height: 42}}>
                <Text style={{marginLeft: 16}}>
                  {item.usign ? item.usign : '该用户很懒,没有简介'}
                </Text>
              </View>
            </Card.Body>
            <Card.Footer
              content={'粉丝:' + item.fans + '关注'}
              extra={'视频:' + item.videos}
            />
          </Card>
          {/* <WhiteSpace size="lg" /> */}
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View
      style={{
        backgroundColor: '#f4f4f4',
        alignItem: 'center',
        alignContent: 'center',
      }}>
      {!props.dataSource.length ? (
        <Text style={{textAlign: 'center', marginTop: 100, fontSize: 20}}>
          没有搜索到用户
        </Text>
      ) : (
        <FlatList
          ref={listRef}
          ListEmptyComponent={<View style={{height: 800}}></View>}
          // style={{display: 'none'}}
          // onScroll={_onScroll}
          initialListSize={6}
          data={props.dataSource}
          // scrollEnabled={scroll}
          onTouchStart={() => console.log('我被按了')}
          // numColumns={1}
          renderItem={({item}) => _renderRow(item)}
          // contentContainerStyle={styles.ListViewStyle}
          refreshing={!props.isLoaded}
          // onRefresh={() => onRefresh()}
          ListFooterComponent={<Bottom listRef={listRef}></Bottom>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    // backgroundColor: 'transparent',
    top: 50,
    left: 20,
    zIndex: 20,
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: 'black',
    opacity: 0.7,
    elevation: 20,
  },
});

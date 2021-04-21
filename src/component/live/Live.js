import React, {useState, useRef, useEffect} from 'react';
import CardModal from '../card-modal';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {press, setFullscreen} from '../../redux/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import VideoPlayer from '../../component/video/VideoPlayer';
import Orientation from 'react-native-orientation';
import px2dp from '../../util';
import {useNavigation} from '@react-navigation/native';
import {reqReply} from '../../config/api';
function VideoList(props) {
  useEffect(() => {
    fetchData();
    return () => {};
  }, []);
  const navigation = useNavigation();
  const [scroll, setScroll] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [child, setChild] = useState({});
  const listRef = useRef();
  const onClick = () => {
    try {
      props.onClick();
    } catch {
      console.log('没有传入onClick');
    }
    setScroll(!scroll);
  };
  const fetchData = async () => {
    fetch(
      'http://api.bilibili.com/x/v2/reply?type=1&oid=626229481&sort=1&ps=5&pn=1',
      {
        method: 'get',
        headers: {
          cookie: 'bfe_id=5db70a86bd1cbe8a88817507134f7bb5',
          'Bili-Trace-Id': '6bf1129179607fe7',
          'Bili-Status-Code': 0,
        },
      },
    )
      .then(resp => resp.json())
      .then(resp => console.log('resp', resp))
      .catch();
    // console.log(result);
    // let preDataList = [];
    // Object.keys(Soucedata).map((data, i) => {
    //   if ((i == 4) | (i == 9) | (i == 1)) {
    //     return;
    //   }
    //   //加上kye={i}，控制台就不会报错
    //   // console.log(data, Soucedata[data]);
    //   Object.keys(Soucedata[data]).map((v, i) => {
    //     //加上kye={i}，控制台就不会报错
    //     // console.log(v);
    //     try {
    //       if (Soucedata[data][v].videos) {
    //         // console.log('push', Soucedata[data][v]);
    //         return preDataList.push({
    //           ...Soucedata[data][v],
    //           key: Soucedata[data][v].aid,
    //         });
    //       }
    //     } catch {
    //       return;
    //     }
    //   });
    // });
    // this.setState({
    //   dataSource: preDataList,
    //   isLoaded: true,
    // });
    // console.log('error!!!', err);
    // this.setState({
    //   dataSource: null,
    //   isLoaded: false,
    // });
  };
  const onRefresh = () => {
    fetchData();
  };
  const _renderRow = item => {
    return (
      <CardModal
        navigation={navigation}
        // compensation={props.compensation}
        // pressedStyle={styles.container}
        onRef={ref => {
          // console.log('我被执行了',ref
          //   )
          setChild(ref);
        }}
        key={item.aid}
        title={
          item.title
            ? item.title.length > 25
              ? item.title.substr(0, 25) + '...'
              : item.title
            : ''
        }
        hideFace={props.hideFace}
        touchable={props.pressed}
        description={'UP主：' + item.owner.name}
        image={item.pic}
        up={item.owner.face}
        color="#01BDC5"
        content={item.desc}
        onBack={() => backClick()}
        onClick={() => onClick()}
        // onClick2={() => this.disablePressed()}
        due={
          item.tname
            ? item.tname.length > 20
              ? item.tname.substr(0, 20) + '...'
              : item.tname
            : ''
        }
        video={item}
        // videos={item.videos}
        // aid={item.aid}
        // cid={item.cid}
      />
    );
  };
  return (
    <View
      style={{
        backgroundColor: '#f4f4f4',
        alignItem: 'center',
        alignContent: 'center',
      }}>
      <FlatList
        ref={listRef}
        ListEmptyComponent={<View style={{height: 800}}></View>}
        // style={{display: 'none'}}
        onScroll={scroll}
        initialListSize={6}
        data={dataSource}
        scrollEnabled={scroll}
        // numColumns={1}
        renderItem={({item}) => _renderRow(item)}
        // contentContainerStyle={styles.ListViewStyle}
        refreshing={loaded}
        onRefresh={() => onRefresh()}
        ListFooterComponent={
          <TouchableOpacity
            onPress={() =>
              listRef.current.scrollToIndex({
                index: 1,
                viewPosition: 0,
              })
            }>
            <Text style={styles.bottomText}>已经到底了哦,点我返回顶部↑</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
}

export default connect(
  state => ({pressed: state.pressed, fullscreen: state.fullscreen}),
  {press, setFullscreen},
)(VideoList);
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
  bottomText: {
    color: 'gray',
    opacity: 0.7,
    marginTop: 20,
    marginBottom: 200,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

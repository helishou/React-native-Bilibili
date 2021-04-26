import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {reqSpaceNotice, reqSpaceVideos} from '../../config/api';
import {marginLeft} from '../../style/CommStyle';
import LinearGradient from 'react-native-linear-gradient';
import VideoList from '../../component/videoList';
import px2dp from '../../util/';
import ScrollableTabView from '../../component/ScrollTabView';

const {height, width} = Dimensions.get('window');
const orignHeight = 245;
function UserDetail(props) {
  useEffect(() => {
    getSpaceNotice();
    // props.navigation
    return () => {};
  }, []);
  const [zt, setZt] = useState(1);
  // console.log('UserDetail.props.navigation', props);
  // const [topHeight, setTopHeight] = useState(new Animated.Value(250));
  const topHeight = useRef(new Animated.Value(orignHeight)).current;
  console.log(topHeight, zt);
  const onClick = () => {
    console.log('usedetai_shirik');
    setZt(zt + 2);
    shrink();
  };
  const backClick = () => {
    console.log('usedetai_grow');
    setZt(zt - 2);
    grow();
  };
  const grow = (height = orignHeight) => {
    console.log(grow, zt);
    if (zt === 2) {
      return;
    }
    Animated.parallel([
      Animated.timing(topHeight, {
        toValue: height,
        useNativeDriver: false,
        duration: 500,
      }).start(),
    ]);
  };

  const shrink = () => {
    Animated.parallel([
      Animated.timing(topHeight, {
        toValue: 0,
        useNativeDriver: false,
        duration: 500,
      }).start(),
    ]);
  };
  const calculateOffset = height => {
    if ((zt % 2 === 1) & (height > orignHeight)) {
      setZt(0);
      shrink();
    } else if ((zt % 2 === 0) & (height < 150)) {
      setZt(1);
      grow();
    }
  };

  const {mid, name, face} = props.route.params;
  const [spaceNotice, setSpaceNotice] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const getSpaceNotice = async () => {
    console.log('mid', mid);
    const result = await reqSpaceNotice(mid);
    // const result = await reqSpaceNotice(540564177);
    setSpaceNotice(result.data);
    getData();
  };
  const getData = async () => {
    const result = await reqSpaceVideos(mid);
    console.log(mid, result);
    const Soucedata = result.data.list.vlist;
    // console.log('Soucedata', Soucedata);
    // console.log(Soucedata, 'usedetaisoucedata');
    let preDataList = [];
    Soucedata.map((data, i) => {
      data.key = data.aid;
      // let newtitle = data.title.replace(`<em class="keyword">`, '');
      // newtitle = newtitle.replace(`</em>`, '');
      return preDataList.push({
        ...data,
        pic: data.pic,
        owner: {mid, name, face},
        tname: data.length,
      });
    });
    setDataSource(preDataList);
    setLoaded(true);
    // console.log(preDataList, '/n --------------usedetailprelist');
  };

  return (
    <Animated.View style={{flex: 1}}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1.0}}
        locations={[0, 1]}
        colors={['white', '#f4f4f4']}>
        <Animated.View style={{height: topHeight}}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1.0}}
            locations={[0, 1]}
            colors={['white', '#d4d4d4']}
            style={{
              width: 400,
              height: 80,
              // borderBottomWidth: 1,
              // borderColor: 'rgba(0,0,0,0.5)',
            }}></LinearGradient>
          <View
            style={{flexDirection: 'row', flexWrap: 'nowrap', marginLeft: 20}}>
            <View class="user_img">
              <Image
                source={{uri: face}}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 100,
                  position: 'relative',
                  top: -40,
                  backgroundColor: 'black',
                }}></Image>
            </View>
            <View
              style={{
                // position: 'relative',
                // right: -20,
                marginLeft: 20,
                flex: 3,
                flexDirection: 'row',
                marginTop: 10,
                // marginLeft: 50,
                // backgroundColor: 'black',
              }}>
              <View style={styles.fans}>
                <Text style={styles.numbers}>0</Text>
                <Text style={styles.title}>粉丝</Text>
              </View>
              <View style={styles.fans}>
                <Text style={styles.numbers}>54</Text>
                <Text style={styles.title}>关注</Text>
              </View>
              <View style={styles.fans}>
                <Text style={styles.numbers}>0</Text>
                <Text style={styles.title}>获赞</Text>
              </View>
            </View>
          </View>
          <View style={styles.detail}>
            <Text
              style={{
                color: props.activeTheme,
                fontWeight: '600',
                paddingBottom: 6,
                fontSize: 17,
              }}>
              {name}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.spaceNotice}>
                {spaceNotice ? spaceNotice : '这个人很神秘，什么都没有写'}
              </Text>
            </View>
          </View>
        </Animated.View>
      </LinearGradient>
      <ScrollableTabView
        style={[
          {
            backgroundColor: zt ? '#f4f4f4' : 'white',
          },
        ]}>
        <VideoList
          tabLabel="视频"
          setContentOffsetY={calculateOffset}
          compensation={zt ? px2dp(300) : px2dp(50)}
          dataSource={dataSource}
          isLoaded={loaded}
          fetchData={() => getData()}
          onClick={() => onClick()}
          backClick={() => backClick()}
          hideFace={true}
          lockControl={true}
          
        />
        <Text style={styles.textStyle} tabLabel="动态">
          动态施工中
        </Text>
      </ScrollableTabView>
    </Animated.View>
  );
}
export default connect(
  state => ({
    activeTheme: state.common.activeTheme,
    pressed: state.pressed,
  }),
  {},
)(UserDetail);

const styles = StyleSheet.create({
  container: {
    // paddingLeft: 20,
    // marginTop: 80,
    backgroundColor: 'white',
    // borderTopColor: props.activeTheme,
    // elevation: 20,

    // borderTopWidth: 1,
  },
  fans: {flex: 1},
  numbers: {
    fontWeight: '600',
    fontSize: 20,
    textAlign: 'center',
    width: 50,
    // backgroundColor: 'red',
  },
  title: {color: '#343434', fontSize: 10, paddingLeft: 15},
  detail: {
    // backgroundColor: 'red',
    marginLeft: 20,
    position: 'relative',
    top: -25,
  },
  spaceNotice: {
    color: 'rgba(0,0,0,0.7)',
  },
  scrollContainer: {
    flex: 1,

    // marginTop: 20,
  },
  textStyle: {
    flex: 1,
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
  },
});

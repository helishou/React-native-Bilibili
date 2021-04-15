import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {reqSpaceNotice, reqSpaceVideos} from '../../config/api';
import {marginLeft} from '../../style/CommStyle';
import LinearGradient from 'react-native-linear-gradient';
import VideoList from '../../component/videoList';
import px2dp from '../../util/';
const {height, width} = Dimensions.get('window');
const orignHeight=-250
function UserDetail(props) {
  // console.log('UserDetail.props.navigation', props);
  // const [topHeight, setTopHeight] = useState(new Animated.Value(250));
  const topHeight = useRef(new Animated.Value(0)).current;
  const onClick = () => {
    console.log('usedetai_shirik');
    shrink();
  };
  const backClick = () => {
    console.log('usedetai_grow');
    grow();
  };
  //   org_width: width - 32,
  //   org_height: height / 5,

  //   top_width: new Animated.Value(width - 32),
  //   top_height: new Animated.Value(height / 6),
  //   bottom_width: new Animated.Value(width - 32),
  //   bottom_height: new Animated.Value(height / 6),
  //   content_height: new Animated.Value(0),

  //   top_pan: new Animated.ValueXY(),
  //   bottom_pan: new Animated.ValueXY(),
  //   content_pan: new Animated.ValueXY(),

  //   content_opac: new Animated.Value(0),
  //   button_opac: new Animated.Value(0),
  //   back_opac: new Animated.Value(0),
  //   plus: new Animated.Value(1),

  //   TopBorderRadius: px2dp(0),
  //   BottomBorderRadius: px2dp(10),
  const grow = () => {
    // this.setState({TopBorderRadius: px2dp(10)});

    Animated.parallel([
      Animated.timing(topHeight, {
        toValue: 0,
        useNativeDriver: true,
        duration: 500,
      }).start(),
      // Animated.spring(this.state.top_height, {
      //   toValue: parseInt(height / 2 + this.compensation),
      //   useNativeDriver: false,
      //   duration: 500,
      // }).start(),
      // Animated.spring(this.state.bottom_height, {
      //   toValue: parseInt(height / 6 + 50),
      //   useNativeDriver: false,
      //   duration: 500,
      // }).start(),
      // Animated.spring(this.state.content_height, {
      //   toValue: parseInt(height / 2),
      //   useNativeDriver: false,
      //   duration: 500,
      // }).start(),
      // Animated.spring(this.state.top_pan, {
      //   toValue: {
      //     x: 0,
      //     y: -parseInt(this.state.offset),
      //   },
      //   useNativeDriver: false,
      //   duration: 500,
      // }).start(),
      // Animated.spring(this.state.content_pan, {
      //   toValue: {
      //     x: 0,
      //     y: -parseInt(height / 8 + this.state.offset),
      //   },
      //   useNativeDriver: false,
      //   duration: 500,
      // }).start(),
      // Animated.spring(this.state.bottom_pan, {
      //   toValue: {
      //     x: 0,
      //     y: -(50 + this.state.offset),
      //   },
      //   useNativeDriver: false,
      //   duration: 500,
      // }).start(),

      // Animated.timing(this.state.content_opac, {
      //   toValue: 1,
      //   useNativeDriver: false,
      //   duration: 500,
      // }).start(),
      // Animated.timing(this.state.button_opac, {
      //   toValue: 1,
      //   useNativeDriver: false,
      //   duration: 500,
      // }).start(),
      // Animated.timing(this.state.back_opac, {
      //   toValue: 1,
      //   useNativeDriver: false,
      //   duration: 500,
      // }).start(),
      // Animated.timing(this.state.plus, {
      //   toValue: 0,
      //   useNativeDriver: false,
      //   duration: 500,
      // }).start(),
    ]);
  };

  const shrink = () => {
    // this.setState({TopBorderRadius: px2dp(0)});
    Animated.parallel([
      Animated.timing(topHeight, {
        toValue: orignHeight,
        useNativeDriver: true,
        duration: 500,
      }).start(),
      // Animated.spring(this.state.top_height, {
      //   toValue: this.state.org_height,
      //   useNativeDriver: false,
      //   duration: 500,
      // }).start(),
      // Animated.spring(this.state.bottom_height, {
      //   toValue: height / 6,
      //   useNativeDriver: false,
      //   duration: 500,
      // }).start(),
      // Animated.spring(this.state.top_pan, {
      //   toValue: {
      //     x: 0,
      //     y: 0,
      //   },
      //   useNativeDriver: false,
      //   duration: 500,
      // }).start(),
      // Animated.spring(this.state.bottom_pan, {
      //   toValue: {
      //     x: 0,
      //     y: 0,
      //   },
      //   useNativeDriver: false,
      //   duration: 500,
      // }).start(),
      // Animated.spring(this.state.content_height, {
      //   toValue: 0,
      //   useNativeDriver: false,
      //   duration: 500,
      // }).start(),
      // Animated.timing(this.state.content_opac, {
      //   toValue: 0,
      //   useNativeDriver: false,
      //   duration: 500,
      // }).start(),
      // Animated.timing(this.state.button_opac, {
      //   toValue: 0,
      //   useNativeDriver: false,
      //   duration: 500,
      // }).start(),
      // Animated.timing(this.state.back_opac, {
      //   toValue: 0,
      //   useNativeDriver: false,
      //   duration: 500,
      // }).start(),
      // Animated.timing(this.state.plus, {
      //   toValue: 1,
      //   useNativeDriver: false,
      //   duration: 500,
      // }).start(),
    ]);
  };
  // var borderStyles = !this.state.pressed
  //   ? {
  //       borderRadius: px2dp(10),
  //       borderBottomLeftRadius: 0,
  //       borderBottomRightRadius: 0,
  //     }
  //   : {
  //       borderTopRightRadius: px2dp(10),
  //       borderTopLeftRadius: px2dp(10),
  //     };
  const owener = props.route.params.owner;
  console.log('userdetai_owener', owener);
  const [spaceNotice, setSpaceNotice] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const getSpaceNotice = async () => {
    console.log(owener.mid);
    const result = await reqSpaceNotice(owener.mid);
    // const result = await reqSpaceNotice(540564177);
    setSpaceNotice(result.data);
    getData();
  };
  const getData = async () => {
    const result = await reqSpaceVideos(owener.mid);
    const Soucedata = result.data.list.vlist;
    // console.log('Soucedata', Soucedata);
    console.log(Soucedata,'usedetaisoucedata')
    let preDataList = [];
    Soucedata.map((data, i) => {
      data.key = data.aid;
      // let newtitle = data.title.replace(`<em class="keyword">`, '');
      // newtitle = newtitle.replace(`</em>`, '');
      return preDataList.push({
        ...data,
        pic: data.pic,
        owner: owener,
        tname: data.length,
      });
    });
    setDataSource(preDataList);
    setLoaded(true);
    // console.log(preDataList, '/n --------------usedetailprelist');
  };
  useEffect(() => {
    getSpaceNotice();
    return () => {};
  }, []);
  return (
    <Animated.View style={{transform: [{translateY: topHeight}]}}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1.0}}
        locations={[0, 1]}
        colors={['white', '#f4f4f4']}>
        <Animated.View>
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
                source={{uri: owener.face}}
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
              {owener.name}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.spaceNotice}>
                {spaceNotice ? spaceNotice : '这个人很神秘，什么都没有写'}
              </Text>
            </View>
          </View>
        </Animated.View>
      </LinearGradient>
      <VideoList
        compensation={px2dp(240)}
        dataSource={dataSource}
        isLoaded={loaded}
        fetchData={() => getData()}
        onClick={() => onClick()}
        backClick={() => backClick()}
      />
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
});

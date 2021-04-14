import React, {useState, useRef} from 'react';
import CardModal from '../card-modal';
import {View, FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {press, setFullscreen} from '../../redux/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import VideoPlayer from '../../component/video/VideoPlayer';
import Orientation from 'react-native-orientation';
import px2dp from '../../util';

function VideoList(props) {
  const [scroll, setScroll] = useState(true);
  const [child, setChild] = useState({});
  const listRef = useRef();
  const compensation = props.compensation ? props.compensation : 0;
  const backClick = () => {
    {
      // console.log(child)
      Orientation.lockToPortrait();
      try {
        props.backClick();
      } catch {}
      if (props.fullscreen) {
        props.setFullscreen(false);
      } else {
        child._onPress();
        props.press(false);
        setScroll(true);
      }
      // setScroll(true);
    }
  };
  const disableScroll = () => {
    try {
      props.onClick();
    } catch {
      console.log('没有传入onClick');
    }

    setScroll(false);
  };
  const onRefresh = () => {
    props.press(false);
    props.fetchData();
  };
  const _renderRow = item => {
    return (
      <CardModal
        compensation={compensation}
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
        touchable={props.pressed}
        description={'UP主：' + item.owner.name}
        image={item.pic}
        up={item.owner.face}
        color="#01BDC5"
        content={item.desc}
        onClick={() => disableScroll()}
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
      <VideoPlayer show={!scroll} />
      {props.pressed ? (
        <TouchableOpacity
          style={[styles.backButton]}
          onPress={() => backClick()}>
          <View
            style={[
              {
                opacity: 1,
                flex: 1,
                left: px2dp(6),
                // top: px2dp(5),
                justifyContent: 'center',
                // alignItems:'center'
              },
            ]}>
            <Icon size={23} color="white" name="chevron-left" />
          </View>
        </TouchableOpacity>
      ) : (
        <View />
      )}
      <FlatList
        ref={listRef}
        // style={{display: 'none'}}
        initialListSize={6}
        data={props.dataSource}
        scrollEnabled={scroll}
        onTouchStart={() => console.log('我被按了')}
        // numColumns={1}
        renderItem={({item}) => _renderRow(item)}
        // contentContainerStyle={styles.ListViewStyle}
        refreshing={!props.isLoaded}
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
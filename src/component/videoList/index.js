import React, {useState, useRef} from 'react';
import CardModal from '../card-modal';
import {View, FlatList, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {press, setFullscreen} from '../../redux/actions';
import Orientation from 'react-native-orientation';
// import px2dp from '../../util';
import {useNavigation} from '@react-navigation/native';
import Bottom from '../bottom';
function VideoList(props) {
  const navigation = useNavigation();
  const [scroll, setScroll] = useState(true);
  const [child, setChild] = useState({});
  const listRef = useRef();
  const backClick = () => {
    Orientation.lockToPortrait();
    if (props.fullscreen) {
      props.setFullscreen(false);
    } else {
      try {
        props.backClick();
      } catch {}
      child._onPress();
      props.press(false);
      setScroll(true);
    }
    // setScroll(true);
  };
  const _onScroll = event => {
    // console.log(event.nativeEvent.contentOffset.y);
    try {
      props.setContentOffsetY(event.nativeEvent.contentOffset.y);
    } catch {}
  };
  const onClick = () => {
    try {
      props.onClick();
    } catch {
      // console.log('没有传入onClick');
    }
    setScroll(!scroll);
  };
  const onRefresh = () => {
    props.press(false);
    props.fetchData();
  };
  const _renderRow = item => {
    return (
      <CardModal
        navigation={navigation}
        onRef={ref => {
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
        due={
          item.tname
            ? item.tname.length > 20
              ? item.tname.substr(0, 20) + '...'
              : item.tname
            : ''
        }
        video={item}
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
        ListEmptyComponent={<View style={{height: 800}} />}
        // style={{display: 'none'}}
        onScroll={_onScroll}
        initialListSize={6}
        data={props.dataSource}
        scrollEnabled={scroll}
        // onTouchStart={() => console.log('我被按了')}
        // numColumns={1}
        renderItem={({item}) => _renderRow(item)}
        // contentContainerStyle={styles.ListViewStyle}
        refreshing={!props.isLoaded}
        onRefresh={() => onRefresh()}
        ListFooterComponent={<Bottom listRef={listRef} />}
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
});

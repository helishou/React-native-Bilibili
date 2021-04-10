import React, {useState, useRef} from 'react';
import CardModal from '../card-modal';
import {View, FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {press} from '../../redux/action';
import Icon from 'react-native-vector-icons/FontAwesome';
import VideoPlayer from '../../component/video/VideoPlayer';
function VideoList(props) {
  const [scroll, setScroll] = useState(true);
  const [child, setChild] = useState({});
  const disableScroll = () => {
    setScroll(!scroll);
  };
  const onRefresh = () => {
    props.press(false);
    props.fetchData();
  };
  const _renderRow = item => {
    return (
      <CardModal
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
        onClick={ disableScroll}
        // onClick2={() => this.disablePressed()}
        due={
          item.tname
            ? item.tname.length > 20
              ? item.tname.substr(0, 20) + '...'
              : item.tname
            : ''
        }
        videos={item.videos}
        aid={item.aid}
        cid={item.cid}
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
      <VideoPlayer />
      {props.pressed ? (
        <TouchableOpacity
          style={[styles.backButton]}
          onPress={() => {
            // console.log(child)
            child._onPress();
            props.press(false);
            // setScroll(true);
          }}>
          <View
            style={[
              {
                opacity: 0.8,
                position: 'relative',
                left: 5,
                top: 5,
              },
            ]}>
            {/* <Text style={{color: 'white'}}>? */}
              <Icon size={23}  style={{color:'white'}} name="chevron-left" />
            {/* </Text> */}
          </View>
        </TouchableOpacity>
      ) : (
        <View />
      )}
      <FlatList
        // style={{display: 'none'}}
        initialListSize={6}
        data={props.dataSource}
        scrollEnabled={scroll}
        // numColumns={1}
        renderItem={({item}) => _renderRow(item)}
        // contentContainerStyle={styles.ListViewStyle}
        refreshing={!props.isLoaded}
        onRefresh={() => onRefresh()}
        ListFooterComponent={<Text style={{color: 'gray',opacity:0.7,marginTop:20,marginBottom:200,fontWeight:'bold',textAlign:'center'}}>已经到底了哦</Text>}
      />
    </View>
  );
}

export default connect(state => ({pressed: state.pressed}), {press})(VideoList);
const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 50,
    left: 20,
    zIndex: 20,
    width: 35,
    height: 35,
    borderRadius: 40,
    backgroundColor: 'black',
    opacity: 0.7,
    elevation: 20,
    zIndex: 99,
  },
});

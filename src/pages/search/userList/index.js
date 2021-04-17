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
      console.log('没有传入onClick');
    }
    setScroll(!scroll);
  };
  const onRefresh = () => {
    props.press(false);
    props.fetchData();
  };
  const _renderRow = item => {
    return (
      <View style={{paddingTop: 30}}>
        <WingBlank size="lg">
          <Card>
            <Card.Header
              title="This is title"
              thumbStyle={{width: 30, height: 30}}
              thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
              extra={<Button title='666'></Button>}
            />
            <Card.Body>
              <View style={{height: 42}}>
                <Text style={{marginLeft: 16}}>Card Content</Text>
              </View>
            </Card.Body>
            <Card.Footer
              content="footer content"
              extra="footer extra content"
            />
          </Card>
        </WingBlank>
        <WhiteSpace size="lg" />
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
      <FlatList
        ref={listRef}
        ListEmptyComponent={<View style={{height: 800}}></View>}
        // style={{display: 'none'}}
        onScroll={_onScroll}
        initialListSize={6}
        data={props.dataSource}
        scrollEnabled={scroll}
        onTouchStart={() => console.log('我被按了')}
        // numColumns={1}
        renderItem={({item}) => _renderRow(item)}
        // contentContainerStyle={styles.ListViewStyle}
        refreshing={!props.isLoaded}
        onRefresh={() => onRefresh()}
        ListFooterComponent={<Bottom listRef={listRef}></Bottom>}
      />
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

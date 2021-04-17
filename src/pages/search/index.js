import React from 'react';
import SeachView from './searchView';
import {View, StyleSheet, Dimensions, TextInput} from 'react-native';
import ScrollableTabView, {
  DefaultTabBar,
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';

import px2dp from '../../util';
import {useState, useRef, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {reqSeach} from '../../config/api';
import VideoList from '../../component/videoList';
import LinearGradient from 'react-native-linear-gradient';
import Nav from '../../component/Nav';
import {connect} from 'react-redux';
import {set} from 'react-native-reanimated';
import {
  setSearchHistory,
  getSearchHistory,
  cleanSearchHistory,
  toggleSearch,
} from '../../redux/actions/search';
import UserList from './userList';
const {height, width} = Dimensions.get('window');
// import { styles } from '../../style/CommStyle';
function Search(props) {
  const [text, setText] = useState('');
  const [first, setFirst] = useState(true);
  const [loaded, setLoaded] = useState(true);
  const [onfocus, setOnFocus] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [show, setShow] = useState(true);
  const textInputRef = useRef();
  const loadRef = useRef();
  // useEffect(() => {
  //   console.log('useeffect');
  //   textInputRef.current.focus();
  //   return () => {
  //     textInputRef.current.focus();
  //   };
  // });
  console.log('Searchshow', show);
  console.log('Searchfirst', first);
  const onChangeText = text => {
    setText(text);
  };
  const onClick = () => {
    setShow(false);
    setFirst(false);
    console.log('我被调用');
  };
  const backClick = () => {
    setShow(true);
    console.log('我被调用2');
  };
  const onSubmitEditing = (sText = text) => {
    setOnFocus(false);
    console.log('搜索', sText);
    if (sText) {
      props.setSearchHistory(props.searchHistory, sText);
      getData(sText);
    } else {
      alert('输入不能为空');
    }
  };
  const getData = async (sText = text) => {
    // loadRef.current.set
    const result = await reqSeach(sText);
    const Soucedata = result.data.result[8].data;
    console.log(Soucedata, 'SearchSoucedata');
    let preDataList = [];
    Soucedata.map((data, i) => {
      data.key = data.aid;
      let newtitle = data.title.replace(/<em class="keyword">/g, '');
      newtitle = newtitle.replace(/<em class=\"keyword\">/g, '');
      newtitle = newtitle.replace(/<\/em>/g, '');
      // newtitle = newtitle.replace(`</em>`, '');
      return preDataList.push({
        ...data,
        pic: 'http:' + data.pic,
        title: newtitle,
        owner: {
          name: data.author,
          face: null,
          mid: data.mid,
        },
        tname: data.tag,
      });
    });
    setDataSource(preDataList);
    // console.log(preDataList);

    setLoaded(false);
  };
  return (
    <View style={{flex: 1}}>
      {/* <Nav
        title="搜索"
        onClick={() => {
          console.log('search里的Nav返回被调用了');
          setFirst(true);
          setText('');
        }}
        style={{display: props.pressed ? 'none' : 'flex'}}></Nav> */}
      {show ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1.0}}
          locations={[0, 1]}
          colors={['white', '#f4f4f4']}
          style={styles.container}>
          <View style={styles.searchBox}>
            <Icon name="search" size={18} style={styles.searchIcon}></Icon>

            <TextInput
              ref={textInputRef}
              onFocus={() => {
                console.log('文字选中');
                setOnFocus(true);
              }}
              autoFocus={first}
              placeholder="请输入文字"
              style={styles.inputText}
              keyboardType="web-search"
              value={text}
              onChangeText={text => onChangeText(text)}
              onSubmitEditing={() => onSubmitEditing()}
            />
          </View>
        </LinearGradient>
      ) : null}
      {!onfocus ? (
        <ScrollableTabView
          // tabBarPosition={'overlayTop'}
          locked={true}
          style={[
            styles.scrollContainer,
            {
              backgroundColor: 1 ? '#f4f4f4' : 'white',
              transform: [{translateY: 1 < 2 ? 0 : -50}],
            },
          ]}
          // renderTabBar={() => <DefaultTabBar />}
          tabBarUnderlineStyle={{
            width: width / 4,
            height: 2,
            backgroundColor: props.activeTheme,
            marginLeft: width / 8,
          }}
          tabBarActiveTextColor={props.activeTheme}>
          <VideoList
            tabLabel="视频"
            dataSource={dataSource}
            isLoaded={!loaded}
            fetchData={() => getData()}
            onClick={() => onClick()}
            backClick={() => backClick()}
          />
          <UserList
            tabLabel="用户"
            dataSource={dataSource}
            // isLoaded={!loaded}
            // fetchData={() => getData()}
            // onClick={() => onClick()}
            // backClick={() => backClick()}
          />
          {/* <VideoList
            tabLabel="直播"
            dataSource={dataSource}
            isLoaded={!loaded}
            fetchData={() => getData()}
            onClick={() => onClick()}
            backClick={() => backClick()}
          /> */}
        </ScrollableTabView>
      ) : (
        <SeachView
          setText={s => setText(s)}
          onSubmitEditing={s => onSubmitEditing(s)}
        />
      )}
    </View>
  );
}
export default connect(
  state => ({
    pressed: state.pressed,
    searchHistory: state.search.searchHistory,
  }),
  {
    setSearchHistory,
    getSearchHistory,
    cleanSearchHistory,
    toggleSearch,
  },
)(Search);
const styles = StyleSheet.create({
  container: {
    // position:'absolute',
    flexDirection: 'row', // 水平排布
    // left:0,
    // top:0,
    // right:0,
    paddingLeft: 10,
    paddingRight: 10,
    // paddingTop: 10,
    paddingTop: Platform.OS === 'ios' ? 20 : 0, // 处理iOS状态栏
    paddingBottom: Platform.OS === 'ios' ? 20 : 0, // 处理iOS状态栏
    height: Platform.OS === 'ios' ? 68 : 58, // 处理iOS状态栏
    // backgroundColor: 'rgba(255,255,255,1)',
    alignItems: 'center', // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中
    zIndex: 11,
  },

  searchBox: {
    //搜索框
    height: 40,
    flexDirection: 'row', // 水平排布
    flex: 1,
    borderRadius: 5, // 设置圆角边
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 8,
    elevation: 2,
  },
  searchIcon: {
    //搜索图标
    height: 20,
    width: 20,
    marginLeft: 10,
    // resizeMode: 'stretch',
    opacity: 0.7,
  },
  inputText: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: 15,
  },
});

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
import {reqSeach, reqFuzzySeach} from '../../config/api';
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
  const [userDataSource, setUserDataSource] = useState([]);
  const [show, setShow] = useState(true);
  const textInputRef = useRef();
  const onChangeText = text => {
    setText(text);
  };
  const onClick = () => {
    setShow(false);
    setFirst(false);
  };
  const backClick = () => {
    setShow(true);
  };
  const onSubmitEditing = (sText = text) => {
    setOnFocus(false);
    if (sText) {
      props.setSearchHistory(props.searchHistory, sText);
      getData(sText);
    } else {
      alert('输入不能为空');
    }
  };
  const getSearch = async (type = 'video', sText, pg = 1) => {
    const resultV = await reqSeach(type, sText, pg);
    const {numPages, numResults} = resultV.data;
    // console.log('搜索结果', resultV.data.result, '搜索结果');
    let preDataList = [];
    let data = {};
    console.log(resultV.data.result.length);
    if (type == 'video') {
      for (let i = 0; i < resultV.data.result.length; i++) {
        data = resultV.data.result[i];
        let newtitle = data.title.replace(/<em class="keyword">/g, '');
        newtitle = newtitle.replace(/<em class=\"keyword\">/g, '');
        newtitle = newtitle.replace(/<\/em>/g, '');
        preDataList.push({
          ...data,
          key: data.aid,
          pic: 'http:' + data.pic,
          title: newtitle,
          owner: {
            name: data.author,
            face: null,
            mid: data.mid,
          },
          tname: data.tag,
        });
      }
    } else {
      for (let i = 0; i < resultV.data.result.length; i++) {
        data = resultV.data.result[i];
        // console.log(data);
        preDataList.push({
          ...data,
          key: data.mid,
        });
      }
    }
    console.log(preDataList);
    return {preDataList, numPages};
  };
  const getData = async (sText = text) => {
    setLoaded(true);
    //偷懒,直接展示前100条
    let preVideoList = [];
    let numVideoPages = 1;
    let {preDataList, numPages} = await getSearch('video', sText, 1);
    preVideoList = preVideoList.concat(preDataList);
    numVideoPages = numPages > 5 ? 5 : numPages;
    // console.log(preVideoList);
    setDataSource(preVideoList);
    setLoaded(false);
    let preUserList, numUserPages;
    let resultU = await getSearch('bili_user', sText, 1);
    preUserList = resultU.preDataList;
    numUserPages = resultU.numPages > 5 ? 5 : resultU.numPages;
    setUserDataSource(preUserList);
    for (let i = 2; i < numVideoPages; i++) {
      let {preDataList} = await getSearch('video', sText, i);
      preVideoList = preVideoList.concat(preDataList);
      setDataSource(preVideoList);
    }
    for (let i = 2; i < numUserPages; i++) {
      let {preDataList} = await getSearch('bili_user', sText, i);
      preUserList = preUserList.concat(preDataList);
      setUserDataSource(preUserList);
    }
  };
  return (
    <View style={{flex: 1}}>
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
                setText('');
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
          // locked={true}
          style={[
            styles.scrollContainer,
            {
              backgroundColor: 1 ? '#f4f4f4' : 'white',
              // transform: [{translateY: 1 < 2 ? 0 : -50}],
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
            dataSource={userDataSource}
            isLoaded={!loaded}
            color={props.activeTheme}
            // fetchData={() => getData()}
            // onClick={() => onClick()}
            // backClick={() => backClick()}
          />
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
    activeTheme: state.common.activeTheme,
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

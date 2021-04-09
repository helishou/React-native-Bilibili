import React, {Component} from 'react';
import {Text, View,StyleSheet,Dimensions,Animated,TouchableWithoutFeedback, TextInput} from 'react-native';
import SeachView from '../searchView';
import px2dp from '../../util'
import Icon from 'react-native-vector-icons/Ionicons'
const isIOS = Platform.OS == "ios"
const { width, height } = Dimensions.get('window')
const headH = px2dp(isIOS?140:120)
const InputHeight = px2dp(28)
export default class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
      location: "三里屯SOHO",
      scrollY: new Animated.Value(0),
      searchView: new Animated.Value(0),
      modalVisible: false,
      searchBtnShow: true,
      listLoading: false,
      isRefreshing: false
    }

    this.SEARCH_BOX_Y = px2dp(isIOS?48:43)
    this.SEARCH_FIX_Y = headH-px2dp(isIOS?64:44)
    this.SEARCH_KEY_P = px2dp(58)
    this.SEARCH_DIFF_Y = this.SEARCH_FIX_Y-this.SEARCH_BOX_Y
    this.SEARCH_FIX_DIFF_Y = headH-this.SEARCH_FIX_Y-headH
}
openLbs(){
  this.setState({modalVisible: true})
}
  _renderHeader() {
    let searchY = this.state.scrollY.interpolate({
      inputRange: [0, this.SEARCH_BOX_Y, this.SEARCH_FIX_Y, this.SEARCH_FIX_Y],
      outputRange: [0, 0, this.SEARCH_DIFF_Y, this.SEARCH_DIFF_Y],
    });
    let lbsOpaticy = this.state.scrollY.interpolate({
      inputRange: [0, this.SEARCH_BOX_Y],
      outputRange: [1, 0],
    });
    let keyOpaticy = this.state.scrollY.interpolate({
      inputRange: [0, this.SEARCH_BOX_Y, this.SEARCH_KEY_P],
      outputRange: [1, 1, 0],
    });
    return (
      <View style={styles.header}>
        <Animated.View style={[styles.lbsWeather, {opacity: lbsOpaticy}]}>
          <TouchableWithoutFeedback onPress={this.openLbs.bind(this)}>
            <View style={styles.lbs}>
              <Icon name="ios-pin" size={px2dp(18)} color="#fff" />
              <Text
                style={{
                  fontSize: px2dp(18),
                  fontWeight: 'bold',
                  color: '#fff',
                  paddingHorizontal: 5,
                }}>
                {this.state.location}
              </Text>
              <Icon name="md-arrow-dropdown" size={px2dp(16)} color="#fff" />
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.weather}>
            <View style={{marginRight: 5}}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: px2dp(11),
                  textAlign: 'center',
                }}>
                {'3°'}
              </Text>
              <Text style={{color: '#fff', fontSize: px2dp(11)}}>{'阵雨'}</Text>
            </View>
            <Icon name="ios-flash-outline" size={px2dp(25)} color="#fff" />
          </View>
        </Animated.View>
        <Animated.View
          style={{
            marginTop: px2dp(15),
            transform: [
              {
                translateY: searchY,
              },
            ],
          }}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={[styles.searchBtn, {backgroundColor: '#fff'}]}>
              <Icon name="ios-search-outline" size={20} color="#666" />
              <Text style={{fontSize: 13, color: '#666', marginLeft: 5}}>
                {'输入商家，商品名称'}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
        <Animated.View style={[styles.keywords, {opacity: keyOpaticy}]}>
          {[
            '肯德基',
            '烤肉',
            '吉野家',
            '粥',
            '必胜客',
            '一品生煎',
            '星巴克',
          ].map((item, i) => {
            return (
              <TouchableWithoutFeedback key={i}>
                <View style={{marginRight: 12}}>
                  <Text style={{fontSize: px2dp(12), color: '#fff'}}>
                    {item}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </Animated.View>
      </View>
    );
  }
  render() {
    return (
      <View>
        <TextInput></TextInput>
        {/* {this._renderHeader()} */}
        <SeachView></SeachView>
        <Text>搜索页面</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0398ff",
    height: headH,
    paddingTop: px2dp(isIOS?30:10),
    paddingHorizontal: 16
  },
  typesView: {
    paddingBottom: 10,
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  typesItem: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  lbsWeather: {
    height: InputHeight,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  placeholder: {
    height: InputHeight,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    borderRadius: px2dp(14),
    backgroundColor: "#fff",
    alignItems: "center"
  },
  lbs: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  weather: {
    flexDirection: "row",
    alignItems: "center"
  },
  textInput:{
    flex: 1,
    fontSize: 13,
    paddingLeft: 10,
    paddingRight: 10,
    height: InputHeight,
    borderRadius: px2dp(14),
    backgroundColor: "#fff"
  },
  searchHeadBox: {
    height: InputHeight,
    flexDirection: "row",
    alignItems: "center"
  },
  searchBtn: {
    borderRadius: InputHeight,
    height: InputHeight,
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  keywords: {
    marginTop: px2dp(14),
    flexDirection: "row"
  },
  scrollView: {
    marginBottom: px2dp(46)
  },
  recom: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginTop: 10,
    flexWrap: "wrap"
  },
  card: {
    backgroundColor: "#fff",
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  business: {
    backgroundColor: "#fff",
    marginTop: 10,
    paddingVertical: 16
  },
  time: {
    paddingHorizontal: 3,
    backgroundColor: "#333",
    fontSize: px2dp(11),
    color: "#fff",
    marginHorizontal: 3
  },
  recomItem: {
    width: width/2,
    height: 70,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row"
  },
  recomWrap: {
    flex: 1,
    height: 70,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  lTimeScrollView: {
  },
  lTimeList: {
    backgroundColor:"#fff",
    alignItems: "center"
  },
  qtag: {
    fontSize: 12,
    borderWidth: 1,
    color: "#00abff",
    borderColor: "#00abff",
    paddingHorizontal: 4,
    paddingVertical: 3,
    borderRadius: 5
  },
  gift: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff"
  },
  fixSearch: {
    backgroundColor: "#0398ff",
    height: isIOS ? 64 : 42,
    paddingTop: isIOS ? 20 : 0,
    paddingHorizontal: 16,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0
  }
})

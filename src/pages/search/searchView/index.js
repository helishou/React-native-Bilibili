import React, {Component} from 'react';
import {
  Text,
  View,
  Animated,
  Platform,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
let {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import px2dp from '../../../util';
import {
  setSearchHistory,
  getSearchHistory,
  cleanSearchHistory,
  toggleSearch,
} from '../../../redux/actions/search';
import Item from '@ant-design/react-native/lib/list/ListItem';
class SearchView extends Component {
  constructor(props) {
    super(props);
    this.showCountMax = parseInt((height - 120) / 38);
  }
  _cleanHistory = () => {
    this.props.cleanSearchHistory();
  };
  render() {
    console.log('seach view', this.props);
    const {searchHistory, toggleSearch} = this.props;
    let showHistory = [];
    for (let i = 0; (i < searchHistory.length) & (i < 99); i++) {
      showHistory[i] = searchHistory[searchHistory.length - 1 - i];
    }
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.head}>
          <Text style={{fontSize: px2dp(13), color: '#333'}}>{'历史搜索'}</Text>
          <TouchableOpacity>
            <Icon
              onPress={() => this._cleanHistory()}
              name={'trash'}
              size={px2dp(16)}
              color="#333"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.queryList}>
          {showHistory.length ? (
            showHistory.map((item, i) => {
              return (
                <View key={i} style={{marginRight: 12, marginBottom: 12}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.onSubmitEditing(item);
                      this.props.setText(item);
                    }}>
                    <Text style={styles.queryItem}>{item}</Text>
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <Text
              style={{
                flex: 1,
                opacity: 0.6,
                fontSize: px2dp(13),
                color: '#666',
                textAlign: 'center',
              }}>
              无历史搜索记录
            </Text>
          )}
        </View>
        <View style={styles.head}>
          <Text style={{fontSize: px2dp(13), color: '#333'}}>{'热门搜索'}</Text>
        </View>
        <View style={styles.queryList}>
          {[
            '我的卷王朋友:刘国文',
            '研一卷死研二',
            '修炼卷王卖原神号',
            'JAVA',
            'C++',
            'VUE',
          ].map((item, i) => {
            return (
              <View key={i} style={{marginRight: 12, marginBottom: 12}}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.onSubmitEditing(item);
                    this.props.setText(item);
                  }}>
                  <Text style={styles.queryItem}>{item}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}
export default connect(state => ({searchHistory: state.search.searchHistory}), {
  setSearchHistory,
  getSearchHistory,
  cleanSearchHistory,
  toggleSearch,
})(SearchView);
const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: Platform.OS === 'ios' ? 64 : 42,
    backgroundColor: '#eee',
  },
  head: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  queryList: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // alignItems: 'center',
    backgroundColor: '#fff',
    overflow: 'hidden',
    height: 182,
  },
  queryItem: {
    // flex: 1,
    fontSize: px2dp(13),
    color: '#666',
    borderWidth: 1,
    borderColor: '#bbb',
    paddingHorizontal: 3,
    paddingVertical: 3,
    borderRadius: 4,
  },
  scrollView: {},
  mask: {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  searchBox: {
    width: width - 8,
    height: 45,
    backgroundColor: 'rgba(255,255,255,1)',
    marginLeft: 4,
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  saerchHistory: {},
  headIcon: {
    width: 18,
    height: 18,
    marginLeft: 16,
    // marginTop:12
  },
  input: {
    flex: 1,
    // height:45,
    backgroundColor: '#fff',
    marginLeft: 4,
    alignSelf: 'center',
  },
  searchIcon: {
    width: 28,
    height: 28,
    // marginTop:8,
    marginRight: 8,
  },
  searchHistory: {
    width: width - 8,
    marginLeft: 4,
    backgroundColor: '#fff',
    borderTopColor: 'rgb(205,205,205)',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  historyRow: {
    flexDirection: 'row',
    marginLeft: 10,
    marginVertical: 6,
    alignItems: 'center',
  },
  historyIcon: {
    width: 26,
    height: 26,
  },
  historyText: {
    color: '#222',
    marginLeft: 10,
    fontSize: 13,
  },
  cleanHistory: {
    height: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

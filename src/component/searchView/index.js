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
} from 'react-native';
let {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import px2dp from '../../util';

export default class SearchView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <ScrollView style={styles.scrollView}>
          <View style={styles.head}>
            <Text style={{fontSize: px2dp(13), color: '#333'}}>
              {'历史搜索'}
            </Text>
            <TouchableOpacity>
              <Icon name={'ios-trash'} size={px2dp(16)} color="#333" />
            </TouchableOpacity>
          </View>
          <View style={styles.queryList}>
            {[
              '原神',
              '如何摸鱼',
              '如何找到月薪2k的工作',
              '避免要饭',
              '休闲人生',
              '暗杀卷王',
            ].map((item, i) => {
              return (
                <View key={i} style={{marginRight: 12, marginBottom: 12}}>
                  <TouchableOpacity>
                    <Text style={styles.queryItem}>{item}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          <View style={styles.head}>
            <Text style={{fontSize: px2dp(13), color: '#333'}}>
              {'热门搜索'}
            </Text>
          </View>
          <View style={styles.queryList}>
            {['我的卷王朋友:刘国文', '研一卷死研二', '修炼卷王卖原神号', 'JAVA', 'C++', 'VUE'].map(
              (item, i) => {
                return (
                  <View key={i} style={{marginRight: 12, marginBottom: 12}}>
                    <TouchableOpacity>
                      <Text style={styles.queryItem}>{item}</Text>
                    </TouchableOpacity>
                  </View>
                );
              },
            )}
          </View>
        </ScrollView>

    );
  }
}

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
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  queryItem: {
    flex: 1,
    fontSize: px2dp(13),
    color: '#666',
    borderWidth: 1,
    borderColor: '#bbb',
    paddingHorizontal: 3,
    paddingVertical: 3,
    borderRadius: 4,
  },
  scrollView: {},
});

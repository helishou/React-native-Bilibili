import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import {styles} from '../../style/video/videoDetailStyle';

export const VideoRelated = ({item}) => {
  return (
    <TouchableOpacity
      style={styles.wrapStyle}
      activeOpacity={0.5}
      // onPress={() => this.pushToVideoDetail(item)}
      onPress={() => alert(item.data.cover.feed)}>
      <View style={styles.innerView}>
        <Image style={styles.imgView} source={{uri: item.data.cover.feed}} />
        <View>
          <Text style={styles.categoryTitle}>
            {item.data.title
              ? item.data.title.length > 18
                ? item.data.title.substr(0, 18) + '...'
                : item.data.title
              : ''}
          </Text>
          <Text style={styles.author}>UP：{item.data.author.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
export default function Bottom(props) {
  const listRef = props.listRef;
  return (
    <TouchableOpacity
      onPress={() =>
        listRef.current.scrollToIndex({
          index: 1,
          viewPosition: 0,
        })
      }>
      <Text style={styles.bottomText}>已经到底了哦,点我返回顶部↑</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  bottomText: {
    color: 'gray',
    opacity: 0.7,
    marginTop: 20,
    marginBottom: 200,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

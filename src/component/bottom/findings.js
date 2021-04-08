import React from 'react'
import { StyleSheet, View } from 'react-native'
import Video from 'react-native-af-video-player'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})

const url = 'https://player.bilibili.com/player.html?aid=927382529&cid=244002362&page=1'

export default class VideoExample extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Video url={url} />
      </View>
    )
  }
}

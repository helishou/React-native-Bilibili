import {View, TouchableOpacity, StyleSheet} from 'react-native';
import px2dp from '../../util';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class BButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => this.props.backClick()}
      >
        <View style={styles.circle}>
          <Icon size={23} color="white" name="chevron-left" />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    // backgroundColor: 'transparent',
    top: 50,
    left: 20,
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: 'black',
    opacity: 0.7,
    elevation: 20,
    zIndex: 99,
  },
  circle: {
    opacity: 1,
    flex: 1,
    left: px2dp(6),
    // top: px2dp(5),
    justifyContent: 'center',
    // alignItems:'center'
  },
});

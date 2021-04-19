import React, {Component} from 'react';
import SystemSetting from 'react-native-system-setting';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';
export default class testp extends Component {
  constructor(props) {
    super(props);
    this.state = {bg: 'white', count: 0};
  }

  componentWillMount() {
    this._gestureHandlers = {
      onStartShouldSetResponder: () => true,
      onMoveShouldSetResponder: () => true,
      onResponderGrant: () => {
        this.setState({bg: 'red'});
      },
      onResponderMove: () => {
        this.setState({count: this.state.count + 1}, () =>
          console.log(this.state.count),
        );
      },
      onResponderRelease: () => {
        this.setState({bg: 'white'});
      },
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <View
          {...this._gestureHandlers}
          style={[
            styles.rect,
            {
              backgroundColor: this.state.bg,
            },
          ]}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rect: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: 'black',
  },
});

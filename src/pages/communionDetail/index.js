import React, {Component} from 'react';
import {BackHandler} from 'react-native';
import {WebView} from 'react-native-webview';

export default class CommunionDetail extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  // 获取 webview 事件返回的 canGoBack 属性 ， 判断网页是否可以回退
  _onNavigationStateChange(navState) {
    if (navState.canGoBack) {
      global.isBack = true;
    } else {
      global.isBack = false;
    }
  }

  handleBackPress = () => {
    if (isBack) {
      this.refs.webView.goBack();
      return true;
    }
  };

  render() {
    return (
      <WebView
        ref="webView"
        source={{uri: 'https://helishou.github.io/'}}
        onNavigationStateChange={this._onNavigationStateChange}
        mediaPlaybackRequiresUserAction={false}
        startInLoadingState={true}
        injectedJavaScript={"$('.header,footer').remove();"}
      />
    );
  }
}

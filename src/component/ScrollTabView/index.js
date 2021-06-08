/*
 * @Author       : helishou
 * @Date         : 2021-04-19 09:27:57
 * @LastEditTime : 2021-06-08 09:19:35
 * @LastEditors  : helishou
 * @Description  : 二次封装滚动页面
 * @FilePath     : \src\component\ScrollTabView\index.js
 * 你用你的指尖,阻止我说再见,在bug完全失去之前
 */
import React from 'react';
import {connect} from 'react-redux';
import STV from 'react-native-scrollable-tab-view';
import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
function ScrollableTabView(props) {
  return (
    <STV
      // tabBarPosition={'overlayTop'}
      locked={true}
      style={[
        styles.scrollContainer,
        {
          backgroundColor: 'white',
        },
      ]}
      // renderTabBar={() => <DefaultTabBar />}
      tabBarUnderlineStyle={{
        width: width / 4,
        height: 2,
        backgroundColor: props.activeTheme,
        marginLeft: width / 8,
      }}
      tabBarActiveTextColor={props.activeTheme}
      {...props}
    />
  );
}

export default connect(
  state => ({activeTheme: state.common.activeTheme}),
  {},
)(ScrollableTabView);

const styles = StyleSheet.create({
  container: {
    // paddingLeft: 20,
    // marginTop: 80,
    backgroundColor: 'white',
    // borderTopColor: props.activeTheme,
    // elevation: 20,

    // borderTopWidth: 1,
  },
});

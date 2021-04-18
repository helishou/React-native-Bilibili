import React from 'react';
import {connect} from 'react-redux';
import STV, {
  DefaultTabBar,
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
function ScrollableTabView(props) {
  console.log(props.activeTheme);
  return (
    <STV
      // tabBarPosition={'overlayTop'}
      //   locked={true}
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
      {...props}></STV>
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

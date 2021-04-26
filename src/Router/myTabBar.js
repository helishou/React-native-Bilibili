import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import Header from '../component/header';
import Animated, {color} from 'react-native-reanimated';
import {tapGreen, marginLeft} from '../style/CommStyle';
import px2dp from '../util';
function MyTabBar({state, descriptors, navigation, position, pressed}) {
  return (
    <View
      style={[
        styles.topBar,
        // {opacity:pressed?0:1},
        {display: pressed ? 'none' : 'flex'},
      ]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const onPress = () => {
          // console.log(navigation)
          // console.log(route.name)
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = Animated.interpolateNode(position, {
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0.5)),
        });
        const lineOpacity = Animated.interpolateNode(position, {
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0)),
        });
        const width = Animated.interpolateNode(position, {
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 40 : 10)),
        });
        const left = Animated.interpolateNode(position, {
          inputRange,
          outputRange: inputRange.map(i => (i = 9 + index)),
        });
        const fontSize = Animated.interpolateNode(position, {
          inputRange,
          outputRange: inputRange.map(i =>
            i === index ? px2dp(30) : px2dp(19),
          ),
        });
        const fontWeight = Animated.interpolateNode(position, {
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 9 : 5)),
        });
        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            opacity="1"
            onLongPress={onLongPress}
            style={[styles.touchDiv, {marginHorizontal: isFocused ? 15 : 5}]}>
            <Animated.Text
              style={[
                {
                  opacity,
                  fontWeight: toString(parseInt(fontWeight) * 100),
                  fontSize,
                  color: isFocused ? '#01BDC5' : 'black',
                  textAlign: 'left',
                },
              ]}>
              {label}
            </Animated.Text>
            <Animated.View
              style={[
                {opacity: lineOpacity, left: 14, width: width},
                styles.underline,
              ]}></Animated.View>
          </TouchableOpacity>
        );
      })}

      <Header navigation={navigation} search="视频" />
    </View>
  );
}

export default connect(state => ({pressed: state.pressed}), {})(MyTabBar);

const styles = StyleSheet.create({
  underline: {
    position: 'absolute',
    top: 65,
    // left: 7,
    // width: 40,
    height: 3,
    backgroundColor: tapGreen,
    zIndex: 2,
  },
  topBar: {
    flexDirection: 'row',
    marginLeft: marginLeft / 2,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  touchDiv: {
    // flex: 1,
    height: 80,
    backgroundColor: 'rgba(0,0,0,0)',
    // opacity:0.7,
    alignItems: 'flex-start',
    justifyContent: 'center',
    // marginRight:20,
    marginTop: 20,
  },
});

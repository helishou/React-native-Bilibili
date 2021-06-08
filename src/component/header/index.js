import React from 'react';
import {StyleSheet, View, Image, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

export default function Header(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      {props.search ? (
        <TouchableWithoutFeedback
          onPress={() => {
            return navigation.navigate('Search', props.search);
          }}>
          <View
            style={{
              posion: 'abosulute',
              right: 10,
              width: 50,
              height: 50,
              top: 40,
              // backgroundColor: 'red',
            }}>
            <View style={styles.circle}>
              <Icon name="search" size={20} style={styles.search} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <View
          style={{
            posion: 'abosulute',
            right: 10,
            width: 50,
            height: 50,
            top: 40,
            // backgroundColor: 'red',
          }}
        />
      )}
      <TouchableWithoutFeedback
        onPress={() => {
          return navigation.openDrawer();
        }}>
        <View
          style={{
            posion: 'abosulute',
            right: -40,
            top: -12,
            width: 50,
            height: 50,
            // backgroundColor: 'red',
          }}>
          <View style={styles.circle}>
            <Image
              style={styles.user}
              source={require('../../static/images/head.jpeg')}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: 'white',
    elevation: 10,
    // top: 5,
    // left:5,
  },
  search: {
    position: 'relative',
    left: 8,
    top: 8,
    color: '#777777',
  },
  user: {
    position: 'relative',
    width: 40 - 2,
    height: 40 - 2,
    borderRadius: 40,
    zIndex: 1,
  },
  header: {
    position: 'absolute',
    right: 0,
    // top:40,
    height: 100,
    width: 100,
    // flex:2,
    // alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
});

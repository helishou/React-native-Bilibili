import React, {useState, useEffect} from 'react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {reqSpaceNotice} from '../../config/api';
import {marginLeft} from '../../style/CommStyle';
function Testp(props) {
  const [spaceNotice, setSpaceNotice] = useState('');
  const getSpaceNotice = async () => {
    // console.log(props.video.owner.mid);
    // const result = await reqSpaceNotice(props.video.owner.mid);
    const result = await reqSpaceNotice(540564177);
    setSpaceNotice(result.data);
  };
  useEffect(() => {
    getSpaceNotice();
    return () => {};
  }, []);
  return (
    <View
      style={{
        paddingLeft: 20,
        marginTop: 80,
        backgroundColor: 'white',
        // borderTopColor: props.activeTheme,
        elevation: 20,

        // borderTopWidth: 1,
      }}>
      <View style={{flexDirection: 'row', flexWrap: 'nowrap'}}>
        <View class="user_img">
          <Image
            // source={{uri: props.video.owner.face}}
            style={{
              height: 100,
              width: 100,
              borderRadius: 100,
              position: 'relative',
              top: -40,
              backgroundColor: 'black',
            }}></Image>
        </View>
        <View
          style={{
            // position: 'relative',
            // right: -20,
            marginLeft: 20,
            flex: 3,
            flexDirection: 'row',
            marginTop: 10,
            // marginLeft: 50,
            // backgroundColor: 'black',
          }}>
          <View style={styles.fans}>
            <Text style={styles.numbers}>0</Text>
            <Text style={styles.title}>粉丝</Text>
          </View>
          <View style={styles.fans}>
            <Text style={styles.numbers}>54</Text>
            <Text style={styles.title}>关注</Text>
          </View>
          <View style={styles.fans}>
            <Text style={styles.numbers}>0</Text>
            <Text style={styles.title}>获赞</Text>
          </View>
        </View>
        {/* <Text>{props.video.owner.name?props.video.owner.name:'jsonlaoshi'}</Text> */}
      </View>
      <View style={styles.detail}>
        {/* <Text>{props.video.owner.name}</Text> */}
        <Text style={{color: props.activeTheme,fontWeight:'600',paddingBottom:6,fontSize:17}}>这个人很神秘</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.spaceNotice}>
            {spaceNotice ? spaceNotice : '这个人很神秘，什么都没有写'}
          </Text>
        </View>
      </View>
    </View>
  );
}
export default connect(
  state => ({video: state.video, activeTheme: state.common.activeTheme}),
  {},
)(Testp);

const styles = StyleSheet.create({
  fans: {flex: 1},
  numbers: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    width: 50,
    // backgroundColor: 'red',
  },
  title: {color: '#343434', fontSize: 10, paddingLeft: 15},
  detail: {
    // backgroundColor: 'red',
    position: 'relative',
    top: -25,
  },
  spaceNotice: {
    color: 'rgba(0,0,0,0.7)',
  },
});

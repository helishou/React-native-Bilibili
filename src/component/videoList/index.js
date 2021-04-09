import React,{useState} from 'react';
import CardModal from '../card-modal';
import {View,FlatList,Text,StyleSheet} from 'react-native'
export default function index(props) {
    const [scroll, setScroll] = useState(true)
    const   disableScroll=()=> {
        setScroll(!scroll)
      }
      const onRef = ref => {
        let child = ref;
      };
    const _renderRow=(item)=> {
        return (
          <CardModal
            // pressedStyle={styles.container}
            key={item.pic}
            onRef={onRef}
            title={
              item.title
                ? item.title.length > 25
                  ? item.title.substr(0, 25) + '...'
                  : item.title
                : ''
            }
            touchable={props.pressed}
            description={'UP主：' + item.owner.name}
            image={item.pic}
            up={{
              uri: item.owner.face,
            }}
            color="#01BDC5"
            content={item.desc}
            onClick={() => disableScroll()}
            // onClick2={() => this.disablePressed()}
            due={item.tname}
            videos={item.videos}
            aid={item.aid}
            cid={item.cid}
          />)}

    return (
    <View
      style={{
        backgroundColor: '#f4f4f4',
        alignItem: 'center',
        alignContent: 'center',
      }}>
                    {this.props.pressed ? (
            <TouchableOpacity
              style={[styles.backButton]}
              onPress={() => {
                this.child._onPress();
                this.props.press(false);
                this.setState({scroll: true});
              }}>
              <Animated.View
                style={[
                  {
                    opacity: 0.8,
                    position: 'relative',
                    left: 3,
                    top: 3,
                  },
                ]}>
                <Text style={{color: 'white'}}>
                  <Icon size={23} name="chevron-left" />
                </Text>
              </Animated.View>
            </TouchableOpacity>
          ) : (
            <View />
          )}
      <FlatList
        // style={{display: 'none'}}
        initialListSize={6}
        data={props.dataSource}
        scrollEnabled={scroll}
        // numColumns={1}
        renderItem={({item}) => _renderRow(item)}
        // contentContainerStyle={styles.ListViewStyle}
        refreshing={!props.isLoaded}
        onRefresh={() => props.onRefresh()}
        ListFooterComponent={<Text style={{color: 'black'}}>已经到底了哦</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({

})

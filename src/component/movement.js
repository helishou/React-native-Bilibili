import React from 'react';
import Carousel from 'react-native-banner-carousel';
import {StyleSheet, Image, View, Dimensions, Text} from 'react-native';

import {api} from '../config/api';

const BannerWidth = Dimensions.get('window').width - 10;
const BannerHeight = 160;

const banner = [
  'http://img.kaiyanapp.com/1db9d9a520c4c229568cbb0298fd1587.jpeg?imageMogr2/quality/60/format/jpg',
  'http://img.kaiyanapp.com/1db9d9a520c4c229568cbb0298fd1587.jpeg?imageMogr2/quality/60/format/jpg',
  'http://img.kaiyanapp.com/1db9d9a520c4c229568cbb0298fd1587.jpeg?imageMogr2/quality/60/format/jpg',
  'http://img.kaiyanapp.com/1db9d9a520c4c229568cbb0298fd1587.jpeg?imageMogr2/quality/60/format/jpg',
  'http://img.kaiyanapp.com/1db9d9a520c4c229568cbb0298fd1587.jpeg?imageMogr2/quality/60/format/jpg',
  'http://img.kaiyanapp.com/1db9d9a520c4c229568cbb0298fd1587.jpeg?imageMogr2/quality/60/format/jpg',
  'http://img.kaiyanapp.com/1db9d9a520c4c229568cbb0298fd1587.jpeg?imageMogr2/quality/60/format/jpg',
  'http://img.kaiyanapp.com/1db9d9a520c4c229568cbb0298fd1587.jpeg?imageMogr2/quality/60/format/jpg',
  'http://img.kaiyanapp.com/1db9d9a520c4c229568cbb0298fd1587.jpeg?imageMogr2/quality/60/format/jpg',
];

export default class movement extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      tabBarVisible: false,
      header: null,
    };
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(api.yinyuetaiBanner)
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.bigPics.length; i++) {
          // banner.push(data.bigPics[i].mobileImg);
        }

        this.setState({
          banner: banner,
        });
      })
      .catch(err => {
        console.log(err);
      })
      .done();
  }

  render() {
    return (
      <View style={{flex: 1, padding: 10}}>
        <View style={styles.banner_container}>
          <Carousel
            autoplay
            autoplayTimeout={5000}
            loop
            index={0}
            pageSize={BannerWidth}>
            {banner.map((image, index) => this.renderPage(image, index))}
          </Carousel>
        </View>

        <View>
          <Text>暂时没有更多动态~</Text>
        </View>
      </View>
    );
  }

  renderPage(image, index) {
    return (
      <View key={index}>
        <Image
          style={{
            width: BannerWidth,
            height: BannerHeight,
            borderRadius: 13,
          }}
          source={{uri: image}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  banner_container: {
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

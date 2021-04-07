import React, {Component} from 'react';
import {Dimensions, View, Image, StyleSheet} from 'react-native';
import Carousel from 'react-native-banner-carousel';
const BannerWidth = Dimensions.get('window').width - 10;
const BannerHeight = 130;

const images = [
  'http://img.kaiyanapp.com/1db9d9a520c4c229568cbb0298fd1587.jpeg?imageMogr2/quality/60/format/jpg',
  'https://img1.c.yinyuetai.com/others/admin/181010/0/3359cfcc1b937d3ba2b4a2e882f2c3f6_0x0.jpg',
  'https://img1.c.yinyuetai.com/others/admin/181008/0/786a245a76efdf1dabb3ad8d6801a154_0x0.jpg',
  'https://img2.c.yinyuetai.com/others/admin/181009/0/48e90fe2b4a30565c12152072b902708_0x0.jpg',
  'https://img0.c.yinyuetai.com/others/admin/181008/0/b18bc3896105b4f2795a6ea5731e319b_0x0.jpg',
  'https://img1.c.yinyuetai.com/others/admin/181008/0/7d379e83edc155d7f19f6adf4a856325_0x0.jpg',
  'https://img2.c.yinyuetai.com/others/admin/181008/0/642a40bc448fa4c3c6ccbf245ef5efab_0x0.jpg',
  'https://img4.c.yinyuetai.com/others/admin/181007/0/bacdc7bc975c0b63d3d8637c9c67a0fd_0x0.jpg',
  'https://img1.c.yinyuetai.com/others/admin/181008/0/07a8596b37c52781348de7910fbba0ab_0x0.jpg',
  'https://img1.c.yinyuetai.com/others/admin/180926/0/5fb850a73eabcaa8db1ad9ccff14f4c6_0x0.jpg',
  'https://img2.c.yinyuetai.com/others/admin/180930/0/1b29482a882b59df75f14f131bafff8b_0x0.jpg',
];

export default class Banner extends Component {
  render() {
    return (
      <View style={styles.banner_container}>
        <Carousel
          autoplay
          autoplayTimeout={5000}
          loop
          index={0}
          pageSize={BannerWidth}>
          {images.map((image, index) => this.renderPage(image, index))}
        </Carousel>
      </View>
    );
  }

  //顶部banner
  renderPage = (image, index) => {
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
  };
}

const styles = StyleSheet.create({
  banner_container: {
    marginTop: 10,
    borderRadius: 13,
    flexDirection: 'row',
    backgroundColor: '#e7e1ea',
    justifyContent: 'center',
  },
});

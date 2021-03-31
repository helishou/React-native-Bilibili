import React, {useState} from 'react';
import {View, Text} from 'react-native';
//导入ant列表组件
import {ListView} from '@ant-design/react-native';
//自适应布局
import pxSize from '../../assets/js/pxSize.js';
export default function ListViewCom() {
  const [layout, setLayout] = useState('list');
  const sleep = (time: any) =>
    new Promise(resolve => setTimeout(() => resolve(), time));
  const onFetch = async (page = 1, startFetch, abortFetch) => {
    try {
      let pageLimit = 10;
      if (this.state.layout === 'grid') pageLimit = 60;
      const skip = (page - 1) * pageLimit;

      //Generate dummy data
      let rowData = Array.from(
        {length: pageLimit},
        (_, index) => `item -> ${index + skip}`,
      );

      //Simulate the end of the list if there is no more data returned from the server
      if (page === 3) {
        rowData = [];
      }

      //Simulate the network loading in ES7 syntax (async/await)
      await this.sleep(2000);
      startFetch(rowData, pageLimit);
    } catch (err) {
      abortFetch(); //manually stop the refresh or pagination if it encounters network error
    }
  };

  const renderItem = item => {
    return (
      <View style={{padding: 10}}>
        <Text>{item}</Text>
      </View>
    );
  };

  return (
    <ListView
      onFetch={onFetch}
      keyExtractor={(item, index) => `${layout} - ${item} - ${index}`}
      renderItem={renderItem}
      numColumns={layout === 'list' ? 1 : 3}
    />
  );
}

const styles = StyleSheet.create({
  style: {},
});

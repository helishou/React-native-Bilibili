import React, {Component} from 'react';
import {View, Text} from 'react-native';

const App = () => {
  return (
    <View>
      <View>
        <Text>Wxy打码</Text>
      </View>
      <View style={{marginTop: 8, padding: 8, backgroundColor: 'blue'}}>
        <Text style={{color: 'white'}}>Wxy打码1</Text>
      </View>
      <View
        style={{marginTop: 8, padding: 8, width: 200, backgroundColor: 'blue'}}>
        <Text style={{color: 'white'}}>Wxy打码2</Text>
      </View>
      <View>
        <Text style={{color: 'black'}}>Wxy打码3</Text>
      </View>
    </View>        
  );
};

export default App;

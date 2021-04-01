import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  View,
  Image,
  StyleSheet,
  Button,
  Alert,
  Text,
  TouchableOpacity,
  TextInput,
  Animated,
  Switch,
  StatusBar,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
export default function App15() {
  users = [
    {label: '请选择性别', value: ''},
    {label: '男', value: 'male'},
    {label: '女', value: 'female'},
    {label: '其他', value: 'other'},
  ];
  const [user, setUser] = useState('');
  const updateUser = user => {
    setUser(user);
  };
  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.label}>请选择性别</Text>
        <Picker
          selectedValue={user}
          onValueChange={updateUser}
          style={{width: 200}}>
          {users.map((o, index) => {
            return <Picker.Item label={o.label} value={o.value} key={index} />;
          })}
        </Picker>
        <Text style={styles.label}>你的选择是</Text>
        <Text style={styles.label}>{user}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'blue',
    // width:50,
    // height:100,
  },
  button: {
    // flex: 1,
    margin: 20,
    height: 40,
    borderColor: 'black',
    borderRadius: 50,
    borderWidth: 1,
    justifyContent: 'center',
    width: 100,
    backgroundColor: '#4ba37b',
    alignItems: 'center',
  },
  buttonTxt: {
    justifyContent: 'center',
    color: '#ffffff',
  },
  container: {
    flex: 1,
    // marginTop: 10,
    // paddingTop: 100,
    // backgroundColor:'red',
    // justifyContent:'center',
    alignItems: 'center',
  },
});

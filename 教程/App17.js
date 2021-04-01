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
import axios from 'axios';

var REQUEST_URL =
  'https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json';
export default function App15() {
  const [movies, setMovies] = useState(null);
  const fetchData = () => {
    fetch(REQUEST_URL)
      .then(response => response.json())
      .then(responseData => {
        // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
        setMovies(responseData.movies);
      });
  };
  const renderLoadingView = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>loading</Text>
      </View>
    );
  };
  const renderMovie = movie => {
    return (
      <View style={styles.container}>
        <Image
          style={styles.thumbnail}
          source={{
            uri:
              'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2588644203,3440251002&fm=11&gp=0.jpg',
          }}
        />
        <View>
          <Text>{movie.title}</Text>
          <Text>{movie.year}</Text>
        </View>
      </View>
    );
  };
  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  if (!movies) {
    return renderLoadingView();
  }
  var movie = movies[0];
  return renderMovie(movie);
}

const styles = StyleSheet.create({
  thumbnail: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
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

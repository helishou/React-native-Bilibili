
import React, {useState, useRef} from 'react';
import {
  Button,
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
} from 'react-native';

const Test = () => {
  const [drawerPosition, setDrawerPosition] = useState('left');
  const changeDrawerPosition = () => {
    if (drawerPosition === 'left') {
      setDrawerPosition('right');
    } else {
      setDrawerPosition('left');
    }
  };
  const drawRef = useRef();

  const navigationView = (
    <View style={styles.navigationContainer}>
      <Text style={{margin: 10, fontSize: 15}}>I'm in the Drawer!</Text>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawRef}
      drawerWidth={300}
      drawerPosition={drawerPosition}
      renderNavigationView={() => navigationView}>
      <View style={styles.container}>
        <Text style={{margin: 10, fontSize: 15}}>
          DrawerLayoutAndroid example
        </Text>
        <Button
          title="Change Drawer Position"
          onPress={() => changeDrawerPosition()}
        />
        <Button
          title="onpen Drawer"
          onPress={() => drawRef.current.openDrawer()}
        />
        <Text style={{margin: 10, fontSize: 15}}>
          Drawer on the {drawerPosition}! Swipe from the side to see!
        </Text>
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  navigationContainer: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
    padding: 8,
  },
});

export default Test;

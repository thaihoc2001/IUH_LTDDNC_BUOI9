import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Button, Image } from 'react-native';
import tom from './assets/tom.png'
import jerry from './assets/jerry.png'

export default function App() {

  const [locationTom, setLocationTom]
    = useState({
      x: null,
      y: null,
      marginLeft: 10,
      marginTop: 10
    });
  const [locationJerry, setLocationJerry]
    = useState({
      x: null,
      y: null,
      left:Math.floor(Math.random() * 300) + 20,
      top: Math.floor(Math.random() * 500) + 20
    });
  function onPress(evt) {
    const x = evt.nativeEvent.locationX;
    const y = evt.nativeEvent.locationY;
    setLocationTom({
      x: x,
      y: y,
      marginLeft: x,
      marginTop: y
    })
    moveMouse();
  }
  function onMove(evt) {
    const x = evt.nativeEvent.locationX;
    const y = evt.nativeEvent.locationY;
    setLocationTom({ marginLeft: x, marginTop: y })
    moveMouse();
  }
  function onRelease() {
    // console.log("Realse!");
  }

  const moveMouse = () => {
    console.log("Move mouse!");
    setLocationJerry({x: Math.floor(Math.random() * 300) + 20, y: Math.floor(Math.random() * 500) + 20,  left: Math.floor(Math.random() * 300) + 20, top: Math.floor(Math.random() * 500) + 20 });
    console.log(locationTom.x, locationTom.y);
    console.log(parseInt(locationJerry.left), parseInt(locationJerry.top));
    const positonXTomJerry = locationTom.x - locationJerry.left;
    const positonYTomJerry = locationTom.y - locationJerry.top;
    console.log(parseInt(positonXTomJerry), positonYTomJerry);
  }

  const { marginTop, marginLeft } = locationTom;
  const { top, left } = locationJerry;
  return (
    <View
      onStartShouldSetResponder={() => true}
      onMoveShouldSetResponder={() => true}
      onResponderGrant={onPress}
      onResponderMove={onMove}
      onResponderRelease={onRelease}
      style={styles.container}>

      <Animated.Image
        source={tom}
        style={{ left: marginLeft, top: marginTop, width: 100, height: 100, backgroundColor: 'black', position: 'absolute' }}
      >
      </Animated.Image>
      <Animated.View
        style={{ left: left, top: top, width: 100, height: 100, backgroundColor: 'red', position: 'absolute' }}
      >
        <TouchableOpacity onPress={moveMouse}>
          <Image source={jerry} style={{ width: 100, height: 100 }} />
        </TouchableOpacity>
      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});


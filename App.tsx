import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  Animated,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Easing,
} from "react-native";

const { width, height } = Dimensions.get("window");

interface OffSet {
  x: number;
  y: number;
}

const App: React.FC = (): JSX.Element => {
  const [offSet, setOffSet] = useState<OffSet>({ x: 0, y: 0 });
  const scaleAnimation = new Animated.Value(1);

  useEffect((): void => {
    changeAnimation();
  }, []);

  function changeAnimation(): void {
    Animated.timing(scaleAnimation, {
      toValue: 2,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }

  function getStyleDot(screen: number): any {
    console.log(offSet);

    let currentScreen: number = 0;
    if (offSet.x >= width) {
      currentScreen = 1;
    }

    if (offSet.x >= width * 2) {
      currentScreen = 2;
    }

    switch (screen === currentScreen) {
      case true:
        return [
          styles.dot,
          styles.isActive,
          {
            transform: [
              {
                scale: scaleAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 2],
                }),
              },
            ],
          },
        ];
      case false:
        return [styles.dot];
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        scrollEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const offSet = e.nativeEvent.contentOffset;
          setOffSet(offSet);
        }}
      >
        <View style={[styles.box, styles.bgGreen]}>
          <Text style={styles.text}>Green</Text>
        </View>
        <View style={[styles.box, styles.bgTomato]}>
          <Text style={styles.text}>Tomato</Text>
        </View>
        <View style={[styles.box, styles.bgDodgerblue]}>
          <Text style={styles.text}>Dodgerblue</Text>
        </View>
      </ScrollView>
      <View style={styles.dotContainer}>
        <Animated.View style={getStyleDot(0)}></Animated.View>
        <Animated.View style={getStyleDot(1)}></Animated.View>
        <Animated.View style={getStyleDot(2)}></Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  bgGreen: {
    backgroundColor: "green",
  },
  bgTomato: {
    backgroundColor: "tomato",
  },
  bgDodgerblue: {
    backgroundColor: "dodgerblue",
  },
  box: {
    width: width,
    height: height,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },
  dotContainer: {
    position: "absolute",
    flex: 1,
    bottom: height / 3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: width,
  },
  isActive: {
    backgroundColor: "blue",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: "white",
  },
});

export default App;

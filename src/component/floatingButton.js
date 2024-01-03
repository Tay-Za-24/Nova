import { Image, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { AntDesign, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { colors } from "../util/color";

const FloatingButton = ({ navigation }) => {
  const firstValue = useSharedValue(30);
  const secondValue = useSharedValue(30);
  const firstWidth = useSharedValue(60);
  const secondWidth = useSharedValue(60);
  const isOpen = useSharedValue(false);
  const opacity = useSharedValue(0);
  const progress = useDerivedValue(() =>
    isOpen.value ? withTiming(1) : withTiming(0)
  );

  const handlePress = () => {
    const config = {
      easing: Easing.bezier(0.68, -0.6, 0.32, 1.6),
      duration: 500,
    };
    if (isOpen.value) {
      firstWidth.value = withTiming(60, { duration: 100 }, (finish) => {
        if (finish) {
          firstValue.value = withTiming(30, config);
        }
      });
      secondWidth.value = withTiming(60, { duration: 100 }, (finish) => {
        if (finish) {
          secondValue.value = withDelay(50, withTiming(30, config));
        }
      });

      opacity.value = withTiming(0, { duration: 100 });
    } else {
      firstValue.value = withDelay(200, withSpring(130));
      secondValue.value = withDelay(100, withSpring(210));
      firstWidth.value = withDelay(1200, withSpring(200));
      secondWidth.value = withDelay(1100, withSpring(200));
      opacity.value = withDelay(1200, withSpring(1));
    }
    isOpen.value = !isOpen.value;
  };

  const opacityText = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const firstWidthStyle = useAnimatedStyle(() => {
    return {
      width: firstWidth.value,
    };
  });
  const secondWidthStyle = useAnimatedStyle(() => {
    return {
      width: secondWidth.value,
    };
  });

  const firstIcon = useAnimatedStyle(() => {
    const scale = interpolate(
      firstValue.value,
      [30, 130],
      [0, 1],
      Extrapolation.CLAMP
    );

    const bottomPosition = interpolate(
      firstValue.value,
      [30, 130],
      [20, 150],
      Extrapolation.CLAMP
    );

    return {
      bottom: bottomPosition,
      transform: [{ scale: scale }],
    };
  });

  const secondIcon = useAnimatedStyle(() => {
    const scale = interpolate(
      secondValue.value,
      [30, 210],
      [0, 1],
      Extrapolation.CLAMP
    );

    const bottomPosition = interpolate(
      secondValue.value,
      [30, 210],
      [20, 80],
      Extrapolation.CLAMP
    );

    return {
      bottom: bottomPosition,
      transform: [{ scale: scale }],
    };
  });

  const plusIcon = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${progress.value * 45}deg` }],
    };
  });

  const handleAddNotesPress = () => {
    navigation.navigate("AddNote");
  };

  const handleAudioRecordPress = () => {
    navigation.navigate("AudioRecord");
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleAddNotesPress}>
        <Animated.View
          style={[styles.contentContainer, secondIcon, secondWidthStyle]}
        >
          <View style={styles.iconContainer}>
            <FontAwesome5
              name="sticky-note"
              size={25}
              color="white"
              style={styles.icon}
            />
          </View>
          <Animated.Text style={[styles.text, opacityText]}>
            AddNotes
          </Animated.Text>
        </Animated.View>
      </Pressable>
      <Pressable onPress={handleAudioRecordPress}>
        <Animated.View
          style={[styles.contentContainer, firstIcon, firstWidthStyle]}
        >
          <View style={styles.iconContainer}>
            <FontAwesome
              name="microphone"
              size={25}
              color="white"
              style={styles.icon}
            />
          </View>
          <Animated.Text style={[styles.text, opacityText]}>
            AudioRecord
          </Animated.Text>
        </Animated.View>
      </Pressable>

      <Pressable
        style={styles.contentContainer}
        onPress={() => {
          handlePress();
        }}
      >
        <Animated.View style={[styles.iconContainer, plusIcon]}>
          <AntDesign name="plus" size={25} color="white" style={styles.icon} />
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  contentContainer: {
    backgroundColor: colors.accent,
    position: "absolute",
    bottom: 10,
    right: 20,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  iconContainer: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 26,
    height: 26,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "400",
  },
});
import { useEffect } from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface ProgressBarProps {
  progress?: number;
}

export function ProgressBar(props: Readonly<ProgressBarProps>) {
  const sharedProgress = useSharedValue(props.progress ?? 0);

  useEffect(() => {
    sharedProgress.value = withTiming(props.progress ?? 0);
  }, [props.progress]);

  const styles = useAnimatedStyle(() => ({
    width: `${sharedProgress.value}%`
  }));

  return (
    <View className="w-full h-3 rounded-xl bg-zinc-700 mt-4">
      <Animated.View
        className="h-3 rounded-xl bg-violet-600"
        style={styles}
      />
    </View>
  );
}
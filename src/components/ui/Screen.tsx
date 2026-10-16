import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from 'expo-router';
import { PropsWithChildren, useCallback, useRef } from 'react';
import { useWindowDimensions } from 'react-native';
import Animated, { cancelAnimation, Easing, ReduceMotion, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import {
  SafeAreaView,
  type Edge,
} from 'react-native-safe-area-context';

import { colors, gradients } from '@/theme/tokens';

type Props = PropsWithChildren<{
  className?: string;
  edges?: Edge[];
  gradient?: boolean;
  animate?: boolean;
}>;

export function Screen({
  children,
  className = '',
  edges = ['top', 'bottom'],
  gradient = false,
  animate = false,
}: Props) {
  const { width } = useWindowDimensions();
  const focusedBefore = useRef(false);
  const translateX = useSharedValue(animate ? width : 0);

  useFocusEffect(useCallback(() => {
    if (!animate) return;
    translateX.value = focusedBefore.current ? -width : width;
    focusedBefore.current = true;
    translateX.value = withTiming(0, {
      duration: 280,
      easing: Easing.out(Easing.cubic),
      reduceMotion: ReduceMotion.System,
    });
    return () => cancelAnimation(translateX);
  }, [animate, width, translateX]));

  const transitionStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View className="flex-1" style={[{ backgroundColor: colors.bg }, transitionStyle]}>
      {gradient && (
        <LinearGradient
          {...gradients.listingBackground}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        />
      )}

      <SafeAreaView
        edges={edges}
        className={`flex-1 ${className}`}
      >
        {children}
      </SafeAreaView>
    </Animated.View>
  );
}
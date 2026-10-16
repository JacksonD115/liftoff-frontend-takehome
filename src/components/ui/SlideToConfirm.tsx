import { useState } from 'react';
import { Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

export function SlideToConfirm({ onConfirm }: { onConfirm: () => void }) {
  const [width, setWidth] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const offset = useSharedValue(0);
  const complete = useSharedValue(false);
  const max = Math.max(0, width - 56);

  function finish() {
    setConfirmed(true);
    onConfirm();
  }

  const gesture = Gesture.Pan()
    .enabled(max > 0 && !confirmed)
    .activeOffsetX([-5, 5])
    .failOffsetY([-15, 15])
    .onUpdate((event) => {
      if (!complete.value) offset.value = Math.max(0, Math.min(max, event.translationX));
    })
    .onEnd(() => {
      if (complete.value) return;
      if (offset.value >= max * 0.85) {
        complete.value = true;
        offset.value = withTiming(max, { duration: 180 }, (finished) => {
          if (finished) scheduleOnRN(finish);
        });
      } else {
        offset.value = withSpring(0);
      }
    })
    .onFinalize(() => {
      if (!complete.value) offset.value = withSpring(0);
    });

  const style = useAnimatedStyle(() => ({ transform: [{ translateX: offset.value }] }));

  return (
    <View
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
      style={{ height: 56, width: '100%', borderRadius: 16, backgroundColor: '#20293A', justifyContent: 'center' }}
    >
      <Text style={{ color: '#FFFFFF', textAlign: 'center', paddingHorizontal: 56, fontSize: 12 }}>
        {confirmed ? 'Done!' : 'Slide to checkout'}
      </Text>
      <GestureDetector gesture={gesture}>
        <Animated.View
          accessible
          accessibilityRole="button"
          accessibilityLabel="Confirm demo checkout"
          accessibilityState={{ disabled: confirmed }}
          accessibilityActions={[{ name: 'activate', label: 'Confirm checkout' }]}
          onAccessibilityAction={() => {
            if (!complete.value && max > 0) {
              complete.value = true;
              offset.value = withTiming(max);
              finish();
            }
          }}
          style={[{ position: 'absolute', left: 4, top: 4, width: 48, height: 48, borderRadius: 12, backgroundColor: '#36B9F4', alignItems: 'center', justifyContent: 'center' }, style]}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 24 }}>{confirmed ? '✓' : '›'}</Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

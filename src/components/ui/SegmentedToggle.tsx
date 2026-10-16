import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

export type DetailTab = 'description' | 'specification';

type Props = {
  value: DetailTab;
  onChange: (value: DetailTab) => void;
};

const tabs: { value: DetailTab; label: string }[] = [
  { value: 'description', label: 'Description' },
  { value: 'specification', label: 'Specification' },
];

export function SegmentedToggle({ value, onChange }: Props) {
  const [width, setWidth] = useState(0);
  const translateX = useSharedValue(0);

  const tabWidth = Math.max(0, (width - 8) / 2);

  useEffect(() => {
    translateX.value = withTiming(
      value === 'description' ? 0 : tabWidth,
      { duration: 220 }
    );
  }, [value, tabWidth, translateX]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
      className="flex-row rounded-xl bg-[#242C3C] p-1"
    >
      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: 'absolute',
            top: 4,
            bottom: 4,
            left: 4,
            width: tabWidth,
            borderRadius: 8,
            backgroundColor: '#334158',
          },
          indicatorStyle,
        ]}
      />

      {tabs.map((tab) => {
        const selected = value === tab.value;

        return (
          <Pressable
            key={tab.value}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            onPress={() => onChange(tab.value)}
            className="min-h-11 flex-1 items-center justify-center px-2"
          >
            <Text
              className={`text-xs font-semibold ${
                selected ? 'text-[#36B9F4]' : 'text-gray-400'
              }`}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
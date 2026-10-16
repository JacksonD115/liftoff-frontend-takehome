import { Pressable, PressableProps } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = PressableProps & {
  scaleTo?: number;
};

export function PressableScale({
  scaleTo = 0.93,
  onPressIn,
  onPressOut,
  style,
  children,
  ...rest
}: Props) {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <AnimatedPressable
            {...rest}
            onPressIn={(e) => {
                scale.value = withSpring(scaleTo, { damping: 15, stiffness: 300 });
                onPressIn?.(e);
            }}
            onPressOut={(e) => {
                scale.value = withSpring(1, { damping: 15, stiffness: 300 });
                onPressOut?.(e);
            }}
            style={[animatedStyle, style as any]}
        >
            {children}
        </AnimatedPressable>
    );
}
import { LinearGradient } from 'expo-linear-gradient';
import { PropsWithChildren } from 'react';
import Animated, { SlideInRight } from 'react-native-reanimated';
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
  return (
    <Animated.View entering={animate ? SlideInRight.duration(280) : undefined} className="flex-1" style={{ backgroundColor: colors.bg }}>
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
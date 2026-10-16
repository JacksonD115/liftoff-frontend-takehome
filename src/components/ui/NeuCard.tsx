import { View, ViewProps } from 'react-native';
import { shadows } from '@/theme/tokens';

type Props = ViewProps & {
  variant?: 'raised' | 'inset';
  className?: string;
};

export function NeuCard({
  variant = 'raised',
  className = '',
  style,
  children,
  ...rest
}: Props) {
  return (
    <View
      {...rest}
      className={`bg-surface rounded-2xl ${className}`}
      style={[{ boxShadow: shadows[variant] } as any, style]}
    >
      {children}
    </View>
  );
}
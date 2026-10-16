import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PressableScale } from './PressableScale';
import { gradients } from '@/theme/tokens';

type Props = {
    label: string;
    onPress?: () => void;
    className?: string;
};

export function AccentButton({ label, onPress, className = '' }: Props) {
    return (
        <PressableScale onPress={onPress} className={className}>
        <LinearGradient
            {...gradients.accent}
            style={{
                width: 130,
                height: 36,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
            }}
            >
            <Text className="text-white text-xs font-semibold">{label}</Text>
        </LinearGradient>
      </PressableScale>
    );
}
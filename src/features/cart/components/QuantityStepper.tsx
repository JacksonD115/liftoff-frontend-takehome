import { Minus, Plus } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { PressableScale } from '@/components/ui/PressableScale';

type Props = {
    quantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
};

export function QuantityStepper({
    quantity,
    onIncrement,
    onDecrement,
}: Props) {
    return (
        <View className="flex-row items-center gap-2">
          <PressableScale
            onPress={onDecrement}
            accessibilityRole="button"
            accessibilityLabel="Decrease quantity"
            className="h-6 w-6 items-center justify-center rounded bg-[#354158]"
          >
            <Minus size={12} color="#FFFFFF" />
          </PressableScale>
    
          <Text className="text-xs text-white">
            {quantity}
          </Text>
    
          <PressableScale
            onPress={onIncrement}
            accessibilityRole="button"
            accessibilityLabel="Increase quantity"
            className="h-6 w-6 items-center justify-center rounded bg-[#3655EA]"
          >
            <Plus size={12} color="#FFFFFF" />
          </PressableScale>
        </View>
    );
}
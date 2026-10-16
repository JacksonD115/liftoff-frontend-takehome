import { Product } from '@/types/product';
import { Text, View } from 'react-native';

type Props = {
    specs: Product['specs'];
};

export function SpecsPanel({ specs }: Props) {
    return (
        <View className="gap-4">
            {specs.map((spec) => (
                <View
                    key={spec.label}
                    className='flex-row items-start justify-between border-b border-white/10 py-2'
                >
                    <Text className="flex-1 text-xs text-gray-400">
                        {spec.label}
                    </Text>

                    <Text className="flex-1 text-right text-xs text-white">
                        {spec.value}
                    </Text>
                </View>
            ))}
        </View>
    );
}
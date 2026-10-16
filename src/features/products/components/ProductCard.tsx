import { useRouter } from 'expo-router';
import { Heart } from 'lucide-react-native';
import { Image, Text, View } from 'react-native';

import { NeuCard } from '@/components/ui/NeuCard';
import { PressableScale } from '@/components/ui/PressableScale';
import { Product } from '@/types/product';

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const router = useRouter();

  return (
    <PressableScale
      scaleTo={0.97}
      onPress={() =>
        router.push({
          pathname: '/product/[id]',
          params: { id: product.id },
        })
      }
      className="flex-1"
    >
      <NeuCard className="min-h-52 p-3">
        <View className="items-end">
          <Heart size={17} color="#FFFFFF" strokeWidth={1.8} />
        </View>

        <Image
          source={product.image}
          resizeMode="contain"
          className="h-24 w-full"
        />

        <View className="mt-2">
          <Text className="text-[10px] text-gray-400">
            {product.category.toUpperCase()}
          </Text>

          <Text
            numberOfLines={2}
            className="mt-1 text-xs font-semibold text-white"
          >
            {product.name}
          </Text>

          <Text className="mt-1 text-xs text-blue-400">
            ${product.price.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>
      </NeuCard>
    </PressableScale>
  );
}
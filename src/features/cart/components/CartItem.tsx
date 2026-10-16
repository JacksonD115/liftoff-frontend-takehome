import { getProductById } from '@/data/products';
import type { CartItem as CartEntry } from '@/store/cartStore';
import { Image, Text, View } from 'react-native';
import { QuantityStepper } from './QuantityStepper';

type Props = {
    item: CartEntry;
    onIncrement: () => void;
    onDecrement: () => void;
};

export function CartItem({
    item,
    onIncrement,
    onDecrement,
}: Props) {
    const product = getProductById(item.productId);

    if (!product) return null;
  
    return (
      <View className="flex-row items-center gap-3 border-b border-white/10 py-4">
        <View className="h-20 w-20 items-center justify-center rounded-xl bg-[#354158]">
          <Image
            source={product.image}
            resizeMode="contain"
            className="h-16 w-16"
          />
        </View>
  
        <View className="flex-1">
          <Text
            numberOfLines={2}
            className="text-xs font-semibold text-white"
          >
            {product.name}
          </Text>
  
          <Text className="mt-2 text-xs text-blue-400">
            ${product.price.toFixed(2)}
          </Text>
  
          <View className="mt-2 items-end">
            <QuantityStepper
              quantity={item.qty}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
            />
          </View>
        </View>
      </View>
    );
}
import { Stack, useLocalSearchParams } from 'expo-router';
import { Image, Text, View } from 'react-native';

import { AccentButton } from '@/components/ui/AccentButton';
import { Screen } from '@/components/ui/Screen';
import { getProductById } from '@/data/products';
import { useCartStore } from '@/store/cartStore';

export default function ProductDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const product = getProductById(id);
    const add = useCartStore((state) => state.add);

    if (!product) {
        return (
            <Screen>
                <Text className='p-4 text-white'>
                    Product not found.
                </Text>
            </Screen>
        );
    }

    return (
        <Screen>
          <Stack.Screen options={{ title: product.name }} />
    
          <View className="flex-1 p-4">
            <Image
              source={product.image}
              resizeMode="contain"
              className="h-64 w-full"
            />
    
            <Text className="mt-6 text-xl font-bold text-white">
              {product.name}
            </Text>
    
            <Text className="mt-4 text-sm text-gray-400">
              {product.description}
            </Text>
    
            <View className="mt-auto flex-row items-center justify-between">
              <Text className="text-lg text-blue-400">
                ${product.price.toFixed(2)}
              </Text>
    
              <AccentButton
                label="Add to Cart"
                onPress={() => add(product.id)}
              />
            </View>
          </View>
        </Screen>
    );
}
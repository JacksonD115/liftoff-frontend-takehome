import { AccentButton } from '@/components/ui/AccentButton';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

import { Screen } from '@/components/ui/Screen';
import { getProducts } from '@/data/products';
import { CategoryChips } from '@/features/products/components/CategoryChips';
import { ProductCard } from '@/features/products/components/ProductCard';
import { Category } from '@/types/product';

export default function ProductListingScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const filteredProducts = getProducts(
    selectedCategory === 'all' ? undefined : selectedCategory
  );

  return (
    <Screen gradient>
      <View className="flex-1 px-4">
        <View className="flex-row items-center justify-between py-4">
          <Text className="text-lg font-bold text-white">Choose Your Bike</Text>
          <AccentButton label="Cart" onPress={() => router.push('/cart')} />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View className="mt-4 h-48 overflow-hidden rounded-2xl bg-surface p-4">
            <Image
              source={require('../../../assets/images/peugeot-lr01.png')}
              resizeMode="contain"
              style={{ width: '100%', flex: 1 }}
              accessibilityLabel="Peugeot LR01 bicycle"
            />

            <Text className="mt-2 text-xl font-bold text-white">
              30% Off
            </Text>
          </View>
          <View className="mt-5">
            <CategoryChips selected={selectedCategory} onSelect={setSelectedCategory} />
          </View>
          <View className="mt-6 flex-row flex-wrap gap-3">
            {filteredProducts.map((product) => (
              <View key={product.id} style={{ width: '48%' }}>
                <ProductCard product={product} />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
}

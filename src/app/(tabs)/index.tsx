import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, Text, TextInput, View } from 'react-native';

import { Screen } from '@/components/ui/Screen';
import { getProducts } from '@/data/products';
import { CategoryChips } from '@/features/products/components/CategoryChips';
import { ProductCard } from '@/features/products/components/ProductCard';
import { Category } from '@/types/product';

import { PressableScale } from '@/components/ui/PressableScale';
import { gradients } from '@/theme/tokens';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, ShoppingCart } from 'lucide-react-native';

export default function ProductListingScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [searchVisible, setSearchVisible] = useState(false);
  const [query, setQuery] = useState('');
  const filteredProducts = getProducts(
    selectedCategory === 'all' ? undefined : selectedCategory
  ).filter((product) =>
    product.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <Screen gradient animate>
      <View className="flex-1 px-4">
        <View className="flex-row items-center justify-between py-4">
          <Text className="text-lg font-bold text-white">Choose Your Bike</Text>
          <View className="flex-row items-center gap-2">
          <PressableScale
            accessibilityRole="button"
            accessibilityLabel="Search products"
            onPress={() => setSearchVisible((visible) => !visible)}
          >
            <LinearGradient
              {...gradients.accent}
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Search size={20} color="#FFFFFF" />
            </LinearGradient>
          </PressableScale>
          <PressableScale
            accessibilityRole="button"
            accessibilityLabel="Open shopping cart"
            onPress={() => router.push('/cart')}
          >
            <LinearGradient
              {...gradients.accent}
              style={{ width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
            >
              <ShoppingCart size={20} color="#FFFFFF" />
            </LinearGradient>
          </PressableScale>
          </View>
        </View>

        {searchVisible && (
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search products"
            placeholderTextColor="#AAB2C0"
            accessibilityLabel="Search products"
            autoFocus
            autoCorrect={false}
            style={{
              height: 44,
              borderRadius: 12,
              backgroundColor: '#293246',
              color: '#FFFFFF',
              paddingHorizontal: 14,
              marginBottom: 12,
            }}
          />
        )}

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

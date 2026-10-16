import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { AccentButton } from '@/components/ui/AccentButton';
import { Screen } from '@/components/ui/Screen';
import { DetailTab, SegmentedToggle } from '@/components/ui/SegmentedToggle';
import { getProductById } from '@/data/products';
import { BikeHero } from '@/features/products/components/BikeHero';
import { SpecsPanel } from '@/features/specs/components/SpecsPanel';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';

import { RidingWeatherPanel } from '@/features/weather/components/RidingWeatherPanel';
import { useRidingWeather } from '@/features/weather/hooks/useRidingWeather';


export default function ProductDetailScreen() {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = 
        useState<DetailTab>('description');

    const { id } = useLocalSearchParams<{ id: string }>();
    const { weather, loading, error } = useRidingWeather();

    const product = getProductById(id);
    const add = useCartStore((state) => state.add);

    if (!product) {
        return (
            <Screen edges={['bottom']} animate>
                <Text className='p-4 text-white'>
                    Product not found.
                </Text>
            </Screen>
        );
    }

    return (
        <Screen edges={['bottom']} animate>
          <Stack.Screen options={{ title: product.name }} />
    
          <View className="flex-1 p-4">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <BikeHero product={product}/>

                <View className="flex-1 rounded-t-3xl bg-surface px-4 pt-5">
                    <SegmentedToggle
                        value={selectedTab}
                        onChange={setSelectedTab}
                    />

                    <View className="mt-6">
                        {selectedTab === 'description' ? (
                            <View>
                                <Text className="text-sm font-bold text-white">
                                {product.name}
                                </Text>

                                <Text className="mt-3 text-xs leading-5 text-gray-400">
                                {product.description}
                                </Text>
                            </View>
                            ) : (
                            <View className="gap-6">
                                <RidingWeatherPanel
                                weather={weather}
                                loading={loading}
                                error={error}
                                />

                                <SpecsPanel specs={product.specs} />
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
    
            <View className="mt-auto flex-row items-center justify-between">
              <Text className="text-lg text-blue-400">
                ${product.price.toFixed(2)}
              </Text>
    
              <AccentButton
                label="Add to Cart"
                onPress={() => { add(product.id); router.push('/cart'); }}
              />
            </View>
          </View>
        </Screen>
    );
}
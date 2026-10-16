import { useState } from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { Screen } from '@/components/ui/Screen';

const categories = [
    'All',
    'Road',
    'Mountain',
    'Helmet',
];

export default function ProductListingScreen() {
    const [selectedCategory, setSelectedCategory] = useState('All');
  
    return (
      <Screen>
        <View className="flex-1 px-4">
          {/* Header */}
          <View className="flex-row items-center justify-between py-4">
            <Text className="text-white text-lg font-bold">
              Choose Your Bike
            </Text>
  
            <Pressable
              className="h-10 w-10 items-center justify-center rounded-xl bg-accent"
              onPress={() => {}}
            >
              <Text className="text-white text-lg">⌕</Text>
            </Pressable>
          </View>
  
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            {/* Promotional banner */}
            <View className="mt-4 h-48 rounded-2xl bg-surface p-4">
              <Text className="mt-auto text-white text-xl font-bold">
                30% Off
              </Text>
            </View>
  
            {/* Categories */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mt-5"
              contentContainerStyle={{ gap: 12 }}
            >
              {categories.map((category) => (
                <Pressable
                  key={category}
                  onPress={() => setSelectedCategory(category)}
                  className={`h-12 min-w-12 items-center justify-center rounded-xl px-3 ${
                    selectedCategory === category
                      ? 'bg-accent'
                      : 'bg-surface'
                  }`}
                >
                  <Text className="text-white text-xs font-medium">
                    {category}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
  
            {/* Product grid will go here */}
            <View className="mt-6" />
          </ScrollView>
        </View>
      </Screen>
    );
}
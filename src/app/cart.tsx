import { SlideToConfirm } from '@/components/ui/SlideToConfirm';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { AccentButton } from '@/components/ui/AccentButton';
import { Screen } from '@/components/ui/Screen';

import { CartItem } from '@/features/cart/components/CartItem';
import { CartSummary } from '@/features/cart/components/CartSummary';
import { PromoInput } from '@/features/cart/components/PromoInput';

import { useShallow } from 'zustand/react/shallow';

import {
  useCartStore,
  useCartTotals
} from '@/store/cartStore';

export default function CartScreen() {
    const router = useRouter();
    const [confirmedCart, setConfirmedCart] = useState<string | null>(null);

    const { items, promoCode, increment, decrement, applyPromo } =
        useCartStore(useShallow((s) => ({
            items: s.items,
            promoCode: s.promoCode,
            increment: s.increment,
            decrement: s.decrement,
            applyPromo: s.applyPromo,
        })));
  
    const totals = useCartTotals();
    const cartKey = JSON.stringify(items) + promoCode;

    function handleCheckout() {
        setConfirmedCart(cartKey);
    }

    return (
        <Screen edges={['bottom']} animate>
          <View className="flex-1 px-4">
            <Text className="py-4 text-lg font-bold text-white">
              My Shopping Cart
            </Text>
    
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }}
            >
              {items.length === 0 ? (
                <View className="flex-1 items-center justify-center">
                  <Text className="text-sm text-gray-400">
                    Your cart is empty.
                  </Text>
                  <AccentButton label="Continue shopping" onPress={() => router.replace('/')} />
                </View>
              ) : (
                <>
                  {items.map((item) => (
                    <CartItem
                      key={item.productId}
                      item={item}
                      onIncrement={() => increment(item.productId)}
                      onDecrement={() => decrement(item.productId)}
                    />
                  ))}
    
                  <Text className="mt-8 mb-4 text-center text-xs text-gray-400">
                    Your cart qualifies for free shipping
                  </Text>
    
                  <PromoInput onApply={applyPromo} />
    
                  <View className="mt-6">
                    <CartSummary {...totals} />
                  </View>
                </>
              )}
            </ScrollView>
    

        </View>

        {items.length > 0 && (
            <View className="px-4 py-4">
                <SlideToConfirm key={cartKey} onConfirm={handleCheckout} />
                {confirmedCart === cartKey && <Text accessibilityLiveRegion="polite" className="mt-3 text-center text-xs text-white">Demo checkout confirmed. No payment was processed.</Text>}
            </View>
        )}
        </Screen>
    );
}
import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import { AccentButton } from '@/components/ui/AccentButton';

type Props = {
    onApply: (code: string) => boolean;
};

export function PromoInput({ onApply }: Props) {
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');

    function handleApply() {
        const success = onApply(code);
    
        setMessage(
          success ? 'Promo code applied!' : 'Invalid promo code'
        );
    }

    return (
        <View className="gap-2">
          <View className="flex-row items-center rounded-xl bg-[#20293A] p-1">
            <TextInput
              value={code}
              onChangeText={(text) => {
                setCode(text);
                setMessage('');
              }}
              placeholder="Promo code"
              placeholderTextColor="#8D98AB"
              autoCapitalize="characters"
              className="h-9 flex-1 px-3 text-xs text-white"
            />
    
            <AccentButton
              label="Apply"
              onPress={handleApply}
            />
          </View>
    
          {!!message && (
            <Text className="text-xs text-gray-400">
              {message}
            </Text>
          )}
        </View>
    );
}
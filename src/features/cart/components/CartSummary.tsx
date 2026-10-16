import { Text, View } from 'react-native';

type Props = {
    subtotal: number;
    discount: number;
    delivery: number;
    total: number;
};

export function CartSummary({
    subtotal,
    discount,
    delivery,
    total,
}: Props) {

    function Row({
        label,
        value,
    }: {
        label: string;
        value: string;
    }) {
        return (
            <View className="flex-row justify-between">
                <Text className="text-xs text-gray-300">
                    {label}
                </Text>
        
                <Text className="text-xs text-gray-300">
                    {value}
                </Text>
          </View>
        );
    }

    return (
        <View className="gap-3">
          <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
          <Row label="Delivery Fee" value={`$${delivery.toFixed(2)}`} />
          <Row label="Discount" value={`-$${discount.toFixed(2)}`} />
    
          <View className="mt-2 flex-row justify-between">
            <Text className="text-sm font-semibold text-white">
              Total
            </Text>
    
            <Text className="text-sm font-bold text-[#36B9F4]">
              ${total.toFixed(2)}
            </Text>
          </View>
        </View>
    );
}
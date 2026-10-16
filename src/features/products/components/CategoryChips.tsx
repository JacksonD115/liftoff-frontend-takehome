import { PressableScale } from '@/components/ui/PressableScale';
import { gradients } from '@/theme/tokens';
import { Category } from '@/types/product';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, Text } from 'react-native';

type CategoryOption = Category | 'all';

type Props = {
    selected: CategoryOption;
    onSelect: (category: CategoryOption) => void;
};

const categories: { label: string; value: CategoryOption }[] = [
    { label: 'All', value: 'all' },
    { label: 'Road', value: 'road' },
    { label: 'Mountain', value: 'mountain' },
    { label: 'Helmet', value: 'helmet' },
];

export function CategoryChips({ selected, onSelect }: Props) {
    return (
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingVertical: 8 }}
      >
        {categories.map((category) => {
          const isSelected = selected === category.value;
  
          return (
            <PressableScale
              key={category.value}
              onPress={() => onSelect(category.value)}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
            >
              {isSelected ? (
                <LinearGradient
                  {...gradients.accent}
                  className="h-12 min-w-12 items-center justify-center rounded-xl px-3"
                >
                  <Text className="text-xs font-semibold text-white">
                    {category.label}
                  </Text>
                </LinearGradient>
              ) : (
                <Text className="h-12 min-w-12 overflow-hidden rounded-xl bg-surface px-3 text-center text-xs leading-[48px] text-white">
                  {category.label}
                </Text>
              )}
            </PressableScale>
          );
        })}
      </ScrollView>
    );
}
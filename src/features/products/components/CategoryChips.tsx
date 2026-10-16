import { PressableScale } from '@/components/ui/PressableScale';
import { gradients } from '@/theme/tokens';
import { Category } from '@/types/product';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, ScrollView, Text } from 'react-native';

type CategoryOption = Category | 'all';

type Props = {
  selected: CategoryOption;
  onSelect: (category: CategoryOption) => void;
};

const categories = [
  { label: 'All', value: 'all', image: null },
  { label: 'Road', value: 'electric', image: require('../../../../assets/images/categoryIcons/bikeIcon.png') },
  { label: 'Mountain', value: 'mountain', image: require('../../../../assets/images/categoryIcons/MountainIcon.png') },
  { label: 'Helmet', value: 'helmet', image: require('../../../../assets/images/categoryIcons/helmetIcon.png') },
] satisfies {
  label: string;
  value: CategoryOption;
  image: import('react-native').ImageSourcePropType | null;
}[];

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
            accessibilityLabel={category.label}
            accessibilityState={{ selected: isSelected }}
          >
            <LinearGradient
              colors={
                isSelected
                  ? gradients.accent.colors
                  : ['#293246', '#293246']
              }
              start={gradients.accent.start}
              end={gradients.accent.end}
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {category.image ? (
                <Image
                  source={category.image}
                  resizeMode="contain"
                  style={{ width: 28, height: 28 }}
                />
              ) : (
                <Text className="text-xs font-semibold text-white">
                  All
                </Text>
              )}
            </LinearGradient>
          </PressableScale>
        );
      })}
    </ScrollView>
  );
};
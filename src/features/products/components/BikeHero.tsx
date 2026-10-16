import { Colors } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, View } from 'react-native';

import { Product } from '@/types/product';

type Props = {
    product: Product;
};

export function BikeHero({ product }: Props) {
    return (
        <View className='h-64 w-full overflow-hidden'>
            {/* Diagonal background */}
            <LinearGradient
                colors={[Colors.accent, Colors.accentDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  position: 'absolute',
                  top: -90,
                  right: -100,
                  width: '65%',
                  height: 440,
                  transform: [{ skewX: '-25deg' }],
                }}
            />

            {/* Product image */}
            <Image
                source={product.image}
                resizeMode='contain'
                className='h-full w-full'
            />
        </View>
    );
}
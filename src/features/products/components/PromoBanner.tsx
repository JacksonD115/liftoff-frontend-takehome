import { useRouter } from 'expo-router';

import { Product } from '@/types/product';

type Props = {
    product: Product;
    discountPercent?: number;
};

export function PromoBanner({
    product,
    discountPercent = 30,
}: Props) {
    const router = useRouter();
}
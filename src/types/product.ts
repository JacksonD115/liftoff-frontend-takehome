import { ImageSourcePropType } from "react-native";

export type Category = 'road' | 'mountain' | 'helmet' | 'electric';

export type Product = {
    id: string;
    name: string;
    category: Category;
    price: number;
    image: ImageSourcePropType;
    description: string;
    specs: { label: string; value: string }[];
};
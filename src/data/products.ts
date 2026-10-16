import { Category, Product } from "@/types/product";

export const products: Product[] = [
    {
        id: 'peugeot-lr01',
        name: 'PEUGEOT - LR01',
        category: 'electric',
        price: 1999.99,
        image: require('../../assets/images/peugeot-lr01.png'),
        description:
          'The LR01 uses the same design as the most iconic bikes from PEUGEOT Cycles\' 130-year history and combines it with agile, dynamic performance that\'s perfectly suited to navigating today\'s cities. As well as a lugged steel frame and iconic PEUGEOT black-and-white chequer design, this city bike also features a 16-speed Shimano Claris drivetrain.',
        specs: [
          { label: 'Frame', value: 'Lugged steel' },
          { label: 'Drivetrain', value: '16-speed Shimano Claris' },
          { label: 'Type', value: 'City / road' },
        ],
      },
      {
        id: 'pilot-chromoly-520',
        name: 'PILOT - CHROMOLY 520',
        category: 'mountain',
        price: 3999.99,
        image: require('../../assets/images/mikkel-bech.png'),
        description: 'A rugged chromoly steel mountain bike built for durability, control, and confident riding on trails and rough terrain.',
        specs: [
          { label: 'Frame', value: 'Chromoly steel' },
          { label: 'Type', value: 'Mountain' },
        ],
      },
      {
        id: 'smith-trade',
        name: 'SMITH - Trade',
        category: 'helmet',
        price: 120,
        image: require('../../assets/images/SMITH-Trade.png'),
        description: 'A lightweight road helmet designed for everyday comfort, ventilation, and reliable protection on every ride.',
        specs: [
          { label: 'Type', value: 'Road helmet' },
        ],
    },
];

export function getProducts(category?: Category): Product[] {
    return category ? products.filter((p) => p.category === category) : products;
}

export function getProductById(id: string): Product | undefined {
    return products.find((p) => p.id == id);
}
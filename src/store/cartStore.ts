import { getProductById } from '@/data/products';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

export type CartItem = {
  productId: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  promoCode: string | null;

  add: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  remove: (id: string) => void;
  applyPromo: (code: string) => boolean;
  clear: () => void;
};

const promoCodes: Record<string, number> = {
  BIKE30: 0.30,
};

const bumpQty = (items: CartItem[], id: string) => {
    return items.map((item) =>
        item.productId === id
            ? { ...item, qty: item.qty + 1 }
            : item
    );
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  promoCode: null,

  add: (id) => {
    if (!getProductById(id)) return;

    set((state) => {
      const existing = state.items.find(
        (item) => item.productId === id
      );

      if (existing) {
        return { items: bumpQty(state.items, id) };
      }

      return {
        items: [...state.items, { productId: id, qty: 1 }],
      };
    });
  },

  increment: (id) => {
    set((state) => ({
        items: bumpQty(state.items, id),
    }));
  },

  decrement: (id) => {
    set((state) => ({
      items: state.items
        .map((item) =>
          item.productId === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0),
    }));
  },

  remove: (id) => {
    set((state) => ({
      items: state.items.filter(
        (item) => item.productId !== id
      ),
    }));
  },

  applyPromo: (code) => {
    const normalized = code.trim().toUpperCase();

    if (!Object.prototype.hasOwnProperty.call(promoCodes, normalized)) {
      return false;
    }

    set({ promoCode: normalized });
    return true;
  },

  clear: () => set({
    items: [],
    promoCode: null,
  }),
}));

const round2 = (n: number) => Math.round(n * 100) / 100;

export function getCartTotals(
  items: CartItem[],
  promoCode: string | null
) {
  const subtotal = round2(
    items.reduce((sum, item) => {
      const product = getProductById(item.productId);
      return sum + (product?.price ?? 0) * item.qty;
    }, 0)
  );

  const discountRate = promoCode ? promoCodes[promoCode] ?? 0 : 0;
  const discount = round2(subtotal * discountRate);
  const delivery = 0;
  const total = round2(subtotal - discount + delivery);

  return {
    subtotal,
    discount,
    delivery,
    total,
  };
}

export const useCartTotals = () => useCartStore(useShallow((s) => getCartTotals(s.items, s.promoCode)));
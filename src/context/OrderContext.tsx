import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BRAND_CONFIG, ProductItem, ComboDeal } from '../data/config';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

interface OrderContextType {
  cart: CartItem[];
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addToCart: (item: ProductItem | ComboDeal) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
  generateOrderMessage: () => string;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  const addToCart = (item: ProductItem | ComboDeal) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          category: 'category' in item ? item.category : 'Special Combo',
        },
      ];
    });
    setIsOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter((i): i is CartItem => i !== null)
    );
  };

  const clearCart = () => setCart([]);

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const generateOrderMessage = (): string => {
    if (cart.length === 0) {
      return `Hi Jolene! I'd love to place an order with Unicorn Treats.`;
    }
    const lines = cart.map(
      (item) => `• ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toFixed(2)})`
    );
    return `Hi Jolene! 🦄 I'd like to place an order from Unicorn Treats:\n\n${lines.join('\n')}\n\nTotal: $${totalPrice.toFixed(2)}\n\nThank you!`;
  };

  return (
    <OrderContext.Provider
      value={{
        cart,
        isOpen,
        openDrawer,
        closeDrawer,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        totalPrice,
        generateOrderMessage,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

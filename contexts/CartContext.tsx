'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from local storage and backend (if logged in) on mount
  useEffect(() => {
    const loadCart = async () => {
      let localItems: CartItem[] = [];
      const stored = localStorage.getItem('cq-cart');
      if (stored) {
        try {
          localItems = JSON.parse(stored);
        } catch (e) {}
      }

      // Merge from backend if possible
      try {
        const res = await fetch('/api/cart');
        if (res.ok) {
          const data = await res.json();
          if (data.cart && data.cart.items && data.cart.items.length > 0) {
             const serverItems = data.cart.items.map((i: any) => ({
                productId: i.productId,
                name: i.product.name,
                price: i.product.price,
                quantity: i.quantity,
                image: i.product.image,
                category: i.product.categoryId // Note: may not be populated text
             }));
             // Simple strategy: Server wins if length > 0, else keep local items if not empty.
             // Or we just overwrite local with server. Let's overwrite since we sync up.
             localItems = serverItems;
          }
        }
      } catch (error) {}

      setItems(localItems);
      setIsInitialized(true);
    };

    loadCart();
  }, []);

  // Save to local storage & sync with DB
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('cq-cart', JSON.stringify(items));
      syncCartWithDB(items);
    }
  }, [items, isInitialized]);

  const syncCartWithDB = async (currentItems: CartItem[]) => {
    try {
      await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: currentItems })
      });
    } catch (e) {}
  };

  const addToCart = (newItem: CartItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.productId === newItem.productId);
      if (existing) {
        return prev.map(i => i.productId === newItem.productId ? { ...i, quantity: i.quantity + newItem.quantity } : i);
      }
      return [...prev, newItem];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(prev => prev.filter(i => i.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prev => prev.map(i => i.productId === productId ? { ...i, quantity } : i));
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

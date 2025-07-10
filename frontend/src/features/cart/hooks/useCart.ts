import { useState, useEffect } from 'react';

export function useCart() {
    const [items, setItems] = useState<any[]>(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('cart');
            return stored ? JSON.parse(stored) : [];
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addItem = (item: any) => {
        setItems(prev => {
            const existing = prev.find((i: any) => i.id === item.id);
            if (existing) {
                return prev.map((i: any) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                );
            }
            return [...prev, item];
        });
    };

    const updateQuantity = (id: string, quantity: number) => {
        setItems(prev => prev.map(i => (i.id === id ? { ...i, quantity } : i)));
    };

    const removeItem = (id: string) => {
        setItems(prev => prev.filter(i => i.id !== id));
    };

    const clearCart = () => setItems([]);

    return { items, addItem, updateQuantity, removeItem, clearCart };
}

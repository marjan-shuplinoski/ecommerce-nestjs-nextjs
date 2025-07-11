import React, { useEffect, useState } from 'react';

type Product = {
    id: string;
    name: string;
    image: string;
    price: number;
};

type Props = {
    userId?: string;
    fetchWishlist?: () => Promise<Product[]>;
    saveWishlist?: (products: Product[]) => Promise<void>;
};

export const WishlistManager: React.FC<Props> = ({ userId, fetchWishlist, saveWishlist }) => {
    const [wishlist, setWishlist] = useState<Product[]>([]);
    useEffect(() => {
        if (userId && fetchWishlist) {
            fetchWishlist().then(setWishlist);
        } else {
            const local = localStorage.getItem('wishlist');
            setWishlist(local ? JSON.parse(local) : []);
        }
    }, [userId, fetchWishlist]);

    const addToWishlist = (product: Product) => {
        const updated = [...wishlist, product];
        setWishlist(updated);
        if (userId && saveWishlist) saveWishlist(updated);
        else localStorage.setItem('wishlist', JSON.stringify(updated));
    };

    const removeFromWishlist = (id: string) => {
        const updated = wishlist.filter(p => p.id !== id);
        setWishlist(updated);
        if (userId && saveWishlist) saveWishlist(updated);
        else localStorage.setItem('wishlist', JSON.stringify(updated));
    };

    return (
        <div>
            <h2 className="text-lg font-bold mb-2">Wishlist</h2>
            {wishlist.length === 0 ? <div>No items in wishlist.</div> : (
                <ul className="space-y-2">
                    {wishlist.map(p => (
                        <li key={p.id} className="flex items-center space-x-2">
                            <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded" />
                            <span>{p.name}</span>
                            <span className="ml-auto font-semibold">${p.price.toFixed(2)}</span>
                            <button onClick={() => removeFromWishlist(p.id)} className="text-red-500 text-xs">Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

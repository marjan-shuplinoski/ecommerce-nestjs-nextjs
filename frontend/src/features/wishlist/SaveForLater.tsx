import React, { useEffect, useState } from 'react';

type Product = {
    id: string;
    name: string;
    image: string;
    price: number;
};

type Props = {
    userId?: string;
    fetchSaved?: () => Promise<Product[]>;
    saveSaved?: (products: Product[]) => Promise<void>;
};

export const SaveForLater: React.FC<Props> = ({ userId, fetchSaved, saveSaved }) => {
    const [saved, setSaved] = useState<Product[]>([]);
    useEffect(() => {
        if (userId && fetchSaved) {
            fetchSaved().then(setSaved);
        } else {
            const local = localStorage.getItem('saveForLater');
            setSaved(local ? JSON.parse(local) : []);
        }
    }, [userId, fetchSaved]);

    const addToSaved = (product: Product) => {
        const updated = [...saved, product];
        setSaved(updated);
        if (userId && saveSaved) saveSaved(updated);
        else localStorage.setItem('saveForLater', JSON.stringify(updated));
    };

    const removeFromSaved = (id: string) => {
        const updated = saved.filter(p => p.id !== id);
        setSaved(updated);
        if (userId && saveSaved) saveSaved(updated);
        else localStorage.setItem('saveForLater', JSON.stringify(updated));
    };

    return (
        <div>
            <h2 className="text-lg font-bold mb-2">Saved for Later</h2>
            {saved.length === 0 ? <div>No items saved for later.</div> : (
                <ul className="space-y-2">
                    {saved.map(p => (
                        <li key={p.id} className="flex items-center space-x-2">
                            <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded" />
                            <span>{p.name}</span>
                            <span className="ml-auto font-semibold">${p.price.toFixed(2)}</span>
                            <button onClick={() => removeFromSaved(p.id)} className="text-red-500 text-xs">Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

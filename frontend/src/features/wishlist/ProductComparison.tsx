import React from 'react';

type Product = {
    id: string;
    name: string;
    image: string;
    price: number;
    specs: Record<string, string>;
};

type Props = {
    products: Product[];
    onRemove: (id: string) => void;
};

export const ProductComparison: React.FC<Props> = ({ products, onRemove }) => {
    if (products.length === 0) return <div>No products to compare.</div>;
    const specKeys = Array.from(new Set(products.flatMap(p => Object.keys(p.specs))));
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border">
                <thead>
                    <tr>
                        <th></th>
                        {products.map(p => (
                            <th key={p.id} className="p-2 border-b">
                                <img src={p.image} alt={p.name} className="w-20 h-20 object-cover mx-auto" />
                                <div className="font-bold">{p.name}</div>
                                <div>${p.price.toFixed(2)}</div>
                                <button onClick={() => onRemove(p.id)} className="text-red-500 text-xs mt-1">Remove</button>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {specKeys.map(key => (
                        <tr key={key}>
                            <td className="font-semibold p-2 border-b bg-gray-50">{key}</td>
                            {products.map(p => (
                                <td key={p.id + key} className="p-2 border-b">{p.specs[key] || '-'}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

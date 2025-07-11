import React from 'react';

export type Category = {
    id: string;
    name: string;
    parentId?: string;
};

type Props = {
    categories: Category[];
    onSelect: (id: string) => void;
};

export const CategoryList: React.FC<Props> = ({ categories, onSelect }) => (
    <ul className="divide-y">
        {categories.map(cat => (
            <li key={cat.id} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => onSelect(cat.id)}>
                {cat.name}
            </li>
        ))}
    </ul>
);

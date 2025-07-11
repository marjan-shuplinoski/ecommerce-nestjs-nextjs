import React from 'react';
import type { Category } from './CategoryList';

type Props = {
    categories: Category[];
    parentId?: string;
    onSelect: (id: string) => void;
};

export const CategoryTree: React.FC<Props> = ({ categories, parentId, onSelect }) => {
    const nodes = categories.filter(c => c.parentId === parentId);
    if (!nodes.length) return null;
    return (
        <ul className="ml-4 border-l">
            {nodes.map(cat => (
                <li key={cat.id}>
                    <span className="cursor-pointer hover:underline" onClick={() => onSelect(cat.id)}>{cat.name}</span>
                    <CategoryTree categories={categories} parentId={cat.id} onSelect={onSelect} />
                </li>
            ))}
        </ul>
    );
};

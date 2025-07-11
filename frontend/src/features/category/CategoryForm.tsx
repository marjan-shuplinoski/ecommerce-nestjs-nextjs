import React, { useState } from 'react';
import type { Category } from './CategoryList';

type Props = {
    initial?: Partial<Category>;
    onSubmit: (data: { name: string; parentId?: string }) => void;
    parentOptions: Category[];
};

export const CategoryForm: React.FC<Props> = ({ initial = {}, onSubmit, parentOptions }) => {
    const [name, setName] = useState(initial.name || '');
    const [parentId, setParentId] = useState(initial.parentId || '');
    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                onSubmit({ name, parentId: parentId || undefined });
            }}
            className="space-y-4"
        >
            <div>
                <label htmlFor="category-name" className="block font-semibold">Name</label>
                <input id="category-name" className="border p-2 w-full" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="parent-category" className="block font-semibold">Parent Category</label>
                <select id="parent-category" className="border p-2 w-full" value={parentId} onChange={e => setParentId(e.target.value)}>
                    <option value="">None</option>
                    {parentOptions.map(opt => (
                        <option key={opt.id} value={opt.id}>{opt.name}</option>
                    ))}
                </select>
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        </form>
    );
};

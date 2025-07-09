import React from 'react';

export interface FilterSidebarProps {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    minPrice?: number;
    maxPrice?: number;
    onPriceChange?: (min: number, max: number) => void;
}

/**
 * FilterSidebar for category and price filtering.
 */
export const FilterSidebar: React.FC<FilterSidebarProps> = ({
    categories,
    selectedCategory,
    onCategoryChange,
    minPrice,
    maxPrice,
    onPriceChange,
}) => (
    <aside className="w-full sm:w-64 p-4 bg-gray-50 rounded shadow mb-4" aria-label="Product filters">
        <div className="mb-4">
            <div className="font-semibold mb-2">Categories</div>
            <ul>
                {categories.map(cat => (
                    <li key={cat}>
                        <button
                            className={`w-full text-left px-2 py-1 rounded ${selectedCategory === cat ? 'bg-blue-100 font-bold' : ''}`}
                            onClick={() => onCategoryChange(cat)}
                            aria-pressed={selectedCategory === cat}
                            data-testid={`category-${cat}`}
                        >
                            {cat}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
        <div>
            <div className="font-semibold mb-2">Price Range</div>
            <div className="flex items-center gap-2">
                <input
                    type="number"
                    min={0}
                    value={minPrice ?? ''}
                    onChange={e => onPriceChange?.(Number(e.target.value), maxPrice ?? 0)}
                    className="w-20 border rounded px-2 py-1"
                    placeholder="Min"
                    aria-label="Minimum price"
                />
                <span>-</span>
                <input
                    type="number"
                    min={0}
                    value={maxPrice ?? ''}
                    onChange={e => onPriceChange?.(minPrice ?? 0, Number(e.target.value))}
                    className="w-20 border rounded px-2 py-1"
                    placeholder="Max"
                    aria-label="Maximum price"
                />
            </div>
        </div>
    </aside>
);

export default FilterSidebar;

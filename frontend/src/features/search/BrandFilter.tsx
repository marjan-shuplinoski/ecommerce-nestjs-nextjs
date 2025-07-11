import React from 'react';

type Props = {
    brands: string[];
    selected: string[];
    onChange: (selected: string[]) => void;
};

export const BrandFilter: React.FC<Props> = ({ brands, selected, onChange }) => (
    <div>
        <label className="block font-semibold">Brand</label>
        <div className="flex flex-wrap gap-2">
            {brands.map(b => (
                <label key={b} className="inline-flex items-center gap-1">
                    <input
                        type="checkbox"
                        checked={selected.includes(b)}
                        onChange={e => {
                            if (e.target.checked) onChange([...selected, b]);
                            else onChange(selected.filter(s => s !== b));
                        }}
                    />
                    {b}
                </label>
            ))}
        </div>
    </div>
);

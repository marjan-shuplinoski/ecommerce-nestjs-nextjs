import React from 'react';

type Props = {
    options: string[];
    selected: string;
    onChange: (selected: string) => void;
};

export const SortingOptions: React.FC<Props> = ({ options, selected, onChange }) => (
    <div>
        <label className="block font-semibold">Sort By</label>
        <select className="border p-2" value={selected} onChange={e => onChange(e.target.value)}>
            {options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
            ))}
        </select>
    </div>
);

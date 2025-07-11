import React from 'react';

type Props = {
    ratings: number[];
    selected: number[];
    onChange: (selected: number[]) => void;
};

export const RatingFilter: React.FC<Props> = ({ ratings, selected, onChange }) => (
    <div>
        <label className="block font-semibold">Rating</label>
        <div className="flex gap-2">
            {ratings.map(r => (
                <label key={r} className="inline-flex items-center gap-1">
                    <input
                        type="checkbox"
                        checked={selected.includes(r)}
                        onChange={e => {
                            if (e.target.checked) onChange([...selected, r]);
                            else onChange(selected.filter(s => s !== r));
                        }}
                    />
                    {r}★
                </label>
            ))}
        </div>
    </div>
);

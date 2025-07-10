import React from 'react';

type Props = {
    onFilter: (filter: { rating?: number }) => void;
};

export const ReviewFilters: React.FC<Props> = ({ onFilter }) => (
    <div className="flex space-x-2 mb-4">
        {[5, 4, 3, 2, 1].map(rating => (
            <button
                key={rating}
                className="px-2 py-1 border rounded text-sm"
                onClick={() => onFilter({ rating })}
            >
                {rating}★
            </button>
        ))}
        <button className="px-2 py-1 border rounded text-sm" onClick={() => onFilter({})}>All</button>
    </div>
);

import React from 'react';

type Props = {
    value: number;
    onChange: (value: number) => void;
};

export const RatingStars: React.FC<Props> = ({ value, onChange }) => (
    <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map(star => (
            <button
                key={star}
                type="button"
                aria-label={`Rate ${star}`}
                className={star <= value ? 'text-yellow-400' : 'text-gray-300'}
                onClick={() => onChange(star)}
            >
                ★
            </button>
        ))}
    </div>
);

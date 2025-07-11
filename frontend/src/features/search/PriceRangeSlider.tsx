import React from 'react';

type Props = {
    min: number;
    max: number;
    value: [number, number];
    onChange: (value: [number, number]) => void;
};

export const PriceRangeSlider: React.FC<Props> = ({ min, max, value, onChange }) => (
    <div>
        <label className="block font-semibold">Price Range</label>
        <input
            type="range"
            min={min}
            max={max}
            value={value[0]}
            onChange={e => onChange([+e.target.value, value[1]])}
            className="w-full"
        />
        <input
            type="range"
            min={min}
            max={max}
            value={value[1]}
            onChange={e => onChange([value[0], +e.target.value])}
            className="w-full"
        />
        <div>${value[0]} - ${value[1]}</div>
    </div>
);

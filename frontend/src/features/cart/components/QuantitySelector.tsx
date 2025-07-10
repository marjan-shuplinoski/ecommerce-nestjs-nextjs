import React from 'react';

type QuantitySelectorProps = {
    value: number;
    min?: number;
    max?: number;
    onChange: (value: number) => void;
};

export default function QuantitySelector({ value, min = 1, max = 99, onChange }: QuantitySelectorProps) {
    return (
        <input
            type="number"
            value={value}
            min={min}
            max={max}
            onChange={e => onChange(Number(e.target.value))}
            className="quantity-selector"
        />
    );
}

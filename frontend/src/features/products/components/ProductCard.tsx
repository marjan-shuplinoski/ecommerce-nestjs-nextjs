import React from 'react';

export interface ProductCardProps {
    id: string;
    name: string;
    image: string;
    price: number;
    rating: number;
    onClick?: () => void;
}

/**
 * ProductCard displays product image, name, price, and rating.
 * Accessible, keyboard-navigable, and strictly typed.
 */
export const ProductCard: React.FC<ProductCardProps> = ({ id, name, image, price, rating, onClick }) => (
    <div
        tabIndex={0}
        role="button"
        aria-label={`View details for ${name}`}
        className="rounded-lg shadow-md bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer p-4 flex flex-col items-center"
        onClick={onClick}
        onKeyPress={e => { if (e.key === 'Enter' && onClick) onClick(); }}
        data-testid={`product-card-${id}`}
    >
        <img src={image} alt={name} className="w-32 h-32 object-cover mb-2 rounded" loading="lazy" />
        <div className="font-semibold text-lg mb-1 text-center">{name}</div>
        <div className="text-blue-600 font-bold mb-1">${price.toFixed(2)}</div>
        <div className="flex items-center" aria-label={`Rating: ${rating} out of 5`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'} aria-hidden="true">★</span>
            ))}
            <span className="sr-only">{rating} out of 5 stars</span>
        </div>
    </div>
);

export default ProductCard;

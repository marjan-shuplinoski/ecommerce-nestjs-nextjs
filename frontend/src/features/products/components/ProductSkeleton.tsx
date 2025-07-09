import React from 'react';

export interface ProductSkeletonProps {
    count?: number;
}

/**
 * ProductSkeleton displays loading placeholders for product cards.
 */
export const ProductSkeleton: React.FC<ProductSkeletonProps> = ({ count = 8 }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" data-testid="product-skeleton-list">
        {Array.from({ length: count }).map((_, i) => (
            <div
                key={i}
                className="rounded-lg shadow-md bg-gray-100 animate-pulse p-4 flex flex-col items-center"
                data-testid="product-skeleton"
            >
                <div className="w-32 h-32 bg-gray-300 mb-2 rounded" />
                <div className="h-4 w-24 bg-gray-300 mb-1 rounded" />
                <div className="h-4 w-16 bg-gray-200 mb-1 rounded" />
                <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>
        ))}
    </div>
);

export default ProductSkeleton;

import React from 'react';
import { ProductCard, ProductCardProps } from './ProductCard';

export interface ProductListProps {
    products: ProductCardProps[];
    onProductClick?: (id: string) => void;
}

/**
 * ProductList displays a responsive grid of ProductCard components.
 */
export const ProductList: React.FC<ProductListProps> = ({ products, onProductClick }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" data-testid="product-list">
        {products.map(product => (
            <ProductCard key={product.id} {...product} onClick={() => onProductClick?.(product.id)} />
        ))}
    </div>
);

export default ProductList;

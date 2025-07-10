import React from 'react';
import ImageGallery from './ImageGallery';
import ReviewSection from './ReviewSection';

interface ProductDetailProps {
    productId: string;
}

export default function ProductDetail({ productId }: ProductDetailProps) {
    // TODO: fetch product data from API
    // TODO: fetch reviews from API
    // TODO: implement add-to-cart logic
    return (
        <div>
            <ImageGallery images={[]} />
            <h1>Product Name</h1>
            <div>Product specifications here</div>
            <button>Add to Cart</button>
            <ReviewSection productId={productId} />
        </div>
    );
}

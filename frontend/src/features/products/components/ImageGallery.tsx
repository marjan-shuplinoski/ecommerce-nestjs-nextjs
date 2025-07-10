import React from 'react';

interface ImageGalleryProps {
    images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
    // TODO: implement image zoom and gallery logic
    return (
        <div>
            {images.length === 0 ? (
                <div>No images</div>
            ) : (
                images.map((img, idx) => <img key={idx} src={img} alt="Product" style={{ maxWidth: 200 }} />)
            )}
        </div>
    );
}

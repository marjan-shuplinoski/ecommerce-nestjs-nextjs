import React from 'react';

interface ReviewSectionProps {
    productId: string;
}

export default function ReviewSection({ productId }: ReviewSectionProps) {
    // TODO: fetch and display reviews, implement review form
    return (
        <div>
            <h2>Reviews</h2>
            <div>No reviews yet.</div>
            <form>
                <textarea placeholder="Write a review..." />
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
}

import React from 'react';

type Review = {
    id: string;
    user: string;
    rating: number;
    comment: string;
    images?: string[];
    helpfulVotes: number;
    createdAt: string;
};

type Props = {
    reviews: Review[];
    onVoteHelpful: (id: string) => void;
};

export const ReviewList: React.FC<Props> = ({ reviews, onVoteHelpful }) => (
    <div className="space-y-4">
        {reviews.map(r => (
            <div key={r.id} className="border rounded p-4">
                <div className="flex items-center justify-between">
                    <span className="font-semibold">{r.user}</span>
                    <span className="text-yellow-400">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                </div>
                <p className="mt-2">{r.comment}</p>
                {r.images && r.images.length > 0 && (
                    <div className="flex space-x-2 mt-2">
                        {r.images.map((img, i) => (
                            <img key={i} src={img} alt="review" className="w-16 h-16 object-cover rounded" />
                        ))}
                    </div>
                )}
                <div className="flex items-center mt-2 space-x-2">
                    <button onClick={() => onVoteHelpful(r.id)} className="text-blue-500 underline">Helpful ({r.helpfulVotes})</button>
                    <span className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        ))}
    </div>
);

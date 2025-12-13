import React from 'react';

interface ReviewCategory {
    category: string;
    rating: number;
}

interface Review {
    id: number;
    type: string;
    status: string;
    rating: number | null;
    publicReview: string;
    reviewCategory: ReviewCategory[];
    submittedAt: string;
    guestName: string;
    listingName: string;
}

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
    console.log('Rendering ReviewCard for review:', review);
    return (
        <div className="review-card">
            <h3>{review.guestName}</h3>
            <p>{review.publicReview}</p>
            <div className="ratings">
                {review.reviewCategory.map((category) => (
                    <div key={category.category}>
                        <strong>{category.category.replace(/_/g, ' ')}</strong>: {category.rating}
                    </div>
                ))}
            </div>
            <p>Submitted on: {new Date(review.submittedAt).toLocaleDateString()}</p>
        </div>
    );
};

export default ReviewCard;
import React from 'react';
import { Review } from '../types/reviews';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  if (!reviews || reviews.length === 0) return <div className="review-list">No reviews</div>;

  return (
    <div className="review-list">
      {reviews.map(review => (
        <div key={review.id} className="review-item">
          <h4>{review.guestName} {review.rating ? ` - ${review.rating}`:''}</h4>
          <p>{review.publicReview}</p>
          <ul>
            {review.reviewCategory.map(c => (
              <li key={c.category}>{c.category}: {c.rating}</li>
            ))}
          </ul>
          <small>{review.submittedAt}</small>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
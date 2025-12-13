import React from 'react';
import { Review } from '../types/reviews';
import { categoryLabel } from '../utils/categoryLabels';

interface ReviewListProps {
  reviews: Review[];
}



const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  if (!reviews || reviews.length === 0) return <div className="review-list">No reviews</div>;
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
    
  return (
    <div className="review-list">
      {reviews.map(review => {
        const date: Date = new Date(review.submittedAt);
        return <div key={review.id} className="review-item">
          <h4>{review.guestName} {review.rating ? ` - ${review.rating}`:''}</h4>
          <p>{review.publicReview}</p>
          <ul>
            {review.reviewCategory.map(c => (
              <li key={c.category}>{categoryLabel(c.category)}: {c.rating}</li>
            ))}
          </ul>
          <small>{formatter.format(date)}</small>
        </div>
    })}
    </div>
  );
};

export default ReviewList;
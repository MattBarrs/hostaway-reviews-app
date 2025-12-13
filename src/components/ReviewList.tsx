import React from 'react';
import ReviewCard from './ReviewCard';
import { Review } from '../types/reviews';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  if (!reviews || reviews.length === 0) return <div className="review-list">No reviews</div>;

  return (
    <div className="review-list">
      {reviews.map(review => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;

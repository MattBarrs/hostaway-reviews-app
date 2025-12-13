import React from 'react';
import { categoryLabel } from '../utils/categoryLabels';

interface ReviewCategory {
  category: string;
  rating?: number;
}

interface Review {
  id: number;
  guestName?: string;
  publicReview?: string;
  rating?: number | null;
  submittedAt?: string;
  reviewCategory: ReviewCategory[];
}

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <article className="review-item">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
        <div>
          <h4>{review.guestName} {review.rating !== null && review.rating !== undefined ? `— ${review.rating}` : ''}</h4>
          <div className="review-meta">{new Date(review.submittedAt || '').toLocaleString()}</div>
        </div>
        {/* optional approved badge */}
        {typeof (review as any).approved !== 'undefined' && (review as any).approved && (
          <div className="approved-badge">Approved</div>
        )}
      </div>

      <p style={{marginTop:10}}>{review.publicReview}</p>

      <div className="review-cats">
        {review.reviewCategory?.map(c => (
          <span key={c.category} className="cat-pill">{categoryLabel(c.category)}: {c.rating ?? '—'}</span>
        ))}
      </div>
    </article>
  );
};

export default ReviewCard;
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useReviews from '../hooks/useReviews';
import ReviewCard from '../components/ReviewCard';
import { getApproved } from '../utils/approvedReviews';
import Header from '../components/Header';

const ReviewDisplayPage: React.FC = () => {
  const { listingName } = useParams<{ listingName: string }>();
  const decoded = listingName ? decodeURIComponent(listingName) : '';
  const { reviews, loading, error } = useReviews();
  const approvedIds = getApproved();

  if (loading) return <div>Loading property...</div>;
  if (error) return <div>Error: {error}</div>;

  const propertyReviews = reviews.filter(r => r.listingName === decoded && approvedIds.includes(r.id));

  return (
    <>
      <Header />
      <div className="container property-page">
        <Link to="/dashboard" className="back-link">
          Back to dashboard
        </Link>
        
        <header>
          <h1>{decoded}</h1>
          <p className="property-meta">
            {propertyReviews.length} {propertyReviews.length === 1 ? 'review' : 'reviews'} from guests
          </p>
        </header>

        <section>
          <h2>Guest Reviews</h2>
          {propertyReviews.length === 0 ? (
            <div className="card empty-state">
              No approved reviews for this property yet.
            </div>
          ) : (
            <div className="reviews-grid">
              {propertyReviews.map(r => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default ReviewDisplayPage;
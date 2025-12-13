import React from 'react';
import useReviews from '../hooks/useReviews';
import ReviewList from '../components/ReviewList';
import { ReviewType } from '../utils/reviewType';

const Home: React.FC = () => {
  const { reviews, loading, error } = useReviews();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
  <>
    <h1>Guest to Host Reviews</h1>
    <ReviewList reviews={reviews.filter((review) => review.type == ReviewType.GuestToHost)} />;
    
    <h1>Host to Guest Reviews</h1>
    <ReviewList reviews={reviews.filter((review) => review.type == ReviewType.HostToGuest)} />;
  </>);
};

export default Home;
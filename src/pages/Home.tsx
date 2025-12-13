import React from 'react';
import useReviews from '../hooks/useReviews';
import ReviewList from '../components/ReviewList';

const Home: React.FC = () => {
  const { reviews, loading, error } = useReviews();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <ReviewList reviews={reviews} />;
};

export default Home;
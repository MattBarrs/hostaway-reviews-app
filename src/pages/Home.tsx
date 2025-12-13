import React from 'react';
import useReviews from '../hooks/useReviews';
import ReviewList from '../components/ReviewList';
import { ReviewType } from '../utils/types';
import Header from '../components/Header';

const Home: React.FC = () => {
  const { reviews, loading, error } = useReviews();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Header />
      <div style={{padding:20}}>
        <h1>Guest to Host Reviews</h1>
        <ReviewList reviews={reviews.filter((review) => review.type === ReviewType.GuestToHost)} />
        
        <h1 style={{marginTop:24}}>Host to Guest Reviews</h1>
        <ReviewList reviews={reviews.filter((review) => review.type === ReviewType.HostToGuest)} />
      </div>
    </>
  );
};

export default Home;
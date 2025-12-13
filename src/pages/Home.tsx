import React from 'react';
import useReviews from '../hooks/useReviews';
import ReviewList from '../components/ReviewList';
import { ReviewType } from '../utils/types';
import Header from '../components/Header';

const Home: React.FC = () => {
  const { reviews, loading, error } = useReviews();

  return (
    <>
      <Header />
      <section className="hero" style={{backgroundImage: 'url(/hero-placeholder.jpg)'}}>
        <div className="hero-inner container">
            <h1>Book Beautiful Stays</h1>
        </div>
      </section>

        </>
)};

export default Home;
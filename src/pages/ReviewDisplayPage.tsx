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
      <div style={{maxWidth:1000, margin:'0 auto', padding:20}}>
        <Link to="/dashboard">← Back to dashboard</Link>
        <header style={{marginTop:12}}>
          <h1>{decoded}</h1>
          <p style={{color:'#666'}}>This page replicates the Flex Living property layout — reviews shown below are manager-approved.</p>
        </header>

        <section style={{marginTop:20}}>
          <h2>Guest Reviews</h2>
          {propertyReviews.length === 0 ? (
            <div>No approved reviews for this property.</div>
          ) : (
            <div style={{display:'grid', gridTemplateColumns:'1fr', gap:12}}>
              {propertyReviews.map(r => <ReviewCard key={r.id} review={r} />)}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default ReviewDisplayPage;
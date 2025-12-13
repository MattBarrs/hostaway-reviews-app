import React, { useEffect, useState } from "react";
import { fetchReviews } from "../api/reviews";
import ReviewList from "./ReviewList";
import { Review } from "../types/reviews";

const Dashboard: React.FC = () => {
  const [reviews, setReviews] = useState([] as Review[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const fetchedReviews = await fetchReviews();
        setReviews(fetchedReviews);
      } catch (err) {
        setError("Failed to fetch reviews");
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Manager Dashboard</h1>
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default Dashboard;

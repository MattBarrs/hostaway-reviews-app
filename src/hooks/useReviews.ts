import { useEffect, useState } from "react";
import { Review } from "../types/reviews";
import { fetchReviews } from "../api/reviews";

export const useReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchReviews();
        if (mounted) setReviews(data);
      } catch (err: any) {
        if (mounted) setError(err.message || "Error fetching reviews");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return { reviews, loading, error };
};

export default useReviews;

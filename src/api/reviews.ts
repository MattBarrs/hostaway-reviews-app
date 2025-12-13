import axios from 'axios';
import { Review } from '../types/reviews';

const API_URL = '/api/reviews/hostaway';

export const fetchReviews = async (): Promise<Review[]> => {
  try {
    const response = await axios.get(API_URL);
    const data = response.data.result as Review[];

    return data.map(entry => ({
      id: entry.id,
      type: entry.type,
      status: entry.status,
      rating: entry.rating,
      publicReview: entry.publicReview,
      reviewCategory: Array.isArray(entry.reviewCategory)
        ? entry.reviewCategory.map((c: { category: string; rating: number }) => ({
            category: c.category,
            rating: c.rating,
          }))
        : [],
      submittedAt: entry.submittedAt,
      guestName: entry.guestName,
      listingName: entry.listingName,
    }));
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

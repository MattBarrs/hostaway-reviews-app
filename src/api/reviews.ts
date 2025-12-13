import axios from 'axios';
import { Review } from '../types/reviews';

const API_URL = '/api/reviews/hostaway';

export const fetchReviews = async (): Promise<Review[]> => {
  try {
    const response = await axios.get(API_URL);
    const data = response.data;
    let entries: any[] = [];

    if (Array.isArray(data)) {
      data.forEach(item => {
        if (Array.isArray(item.result)) entries.push(...item.result);
      });
    } else if (data && Array.isArray(data.result)) {
      entries = data.result;
    } else {
      entries = [];
    }

    return entries.map(entry => ({
      id: entry.id,
      type: entry.type,
      status: entry.status,
      rating: entry.rating,
      publicReview: entry.publicReview,
      reviewCategory: Array.isArray(entry.reviewCategory)
        ? entry.reviewCategory.map((c: {category: String, rating: Number}) => ({ category: c.category, rating: c.rating }))
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
export interface ReviewCategory {
    category: string;
    rating: number;
}

export interface Review {
    id: number;
    type: string;
    status: string;
    rating: number;
    publicReview: string;
    reviewCategory: ReviewCategory[];
    submittedAt: string;
    guestName: string;
    listingName: string;
    isApproved?: boolean;
}
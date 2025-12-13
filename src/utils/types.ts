export const ReviewType = {
    GuestToHost: 'guest-to-host',
    HostToGuest: 'host-to-guest',
} as const;
export type ReviewTypeKey = typeof ReviewType[keyof typeof ReviewType];

export const SortType = {
    RatingAsc: 'rating_asc',
    RatingDesc: 'rating_desc',
    Reviews: 'reviews',
    Name: 'name',
} as const;
export type SortKey = typeof SortType[keyof typeof SortType];

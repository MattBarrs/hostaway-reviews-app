export const APPROVED_KEY = 'approvedReviews';

export const getApproved = (): number[] => {
  try {
    const raw = localStorage.getItem(APPROVED_KEY);
    return raw ? JSON.parse(raw) as number[] : [];
  } catch {
    return [];
  }
};

export const setApproved = (ids: number[]) => {
  localStorage.setItem(APPROVED_KEY, JSON.stringify(Array.from(new Set(ids))));
};

export const toggleApproved = (id: number) => {
  const ids = getApproved();
  const exists = ids.includes(id);
  const next = exists ? ids.filter(i => i !== id) : [...ids, id];
  setApproved(next);
  return next;
};

export const isApproved = (id: number) => getApproved().includes(id);
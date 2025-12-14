import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import useReviews from '../hooks/useReviews';
import { Review } from '../types/reviews';
import { categoryLabel } from '../utils/categoryLabels';
import { SortType, SortKey } from '../utils/types';
import { getApproved } from '../utils/approvedReviews';
import Header from '../components/Header';

interface Property {
  listingName: string;
  reviews: Review[];
  avgRating: number | null;
  total: number;
  topCategories: Array<{ category: string; avg: number }>;
}

const groupByProperty = (reviews: Review[], approvedIds: number[]): Property[] => {
  const map = new Map<string, Review[]>();
  reviews.forEach(r => {
    const key = r.listingName || 'Unknown';
    const arr = map.get(key) || [];
    arr.push(r);
    map.set(key, arr);
  });
  return Array.from(map.entries()).map(([listingName, revs]) => {
    const approvedRevs = revs.filter(r => approvedIds.includes(r.id));

    const ratings = approvedRevs
      .map(r => (r.rating === null || r.rating === undefined ? null : r.rating))
      .filter((rating): rating is number => rating !== null);
    const avgRating = ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : null;

    const categoryMap = new Map<string, number[]>();
    approvedRevs.forEach(r => {
      r.reviewCategory.forEach(c => {
        const existing = categoryMap.get(c.category) || [];
        categoryMap.set(c.category, [...existing, c.rating ?? 0]);
      });
    });

    const topCategories = Array.from(categoryMap.entries())
      .map(([cat, categoryRatings]) => ({
        category: cat,
        avg: categoryRatings.reduce((a, b) => a + b, 0) / categoryRatings.length,
      }))
      .sort((a, b) => b.avg - a.avg)
      .slice(0, 3);

    return {
      listingName,
      reviews: approvedRevs,
      avgRating,
      total: approvedRevs.length,
      topCategories,
    };
  });
};

const PropertiesDashboard: React.FC = () => {
  const { reviews, loading, error } = useReviews();
  const approvedIds = getApproved();
  const [q, setQ] = useState('');
  const [sort, setSort] = useState<SortKey>(SortType.RatingDesc);
  const [minRating, setMinRating] = useState<number | ''>('');
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  const props = useMemo(() => {
    const grouped = groupByProperty(reviews, approvedIds);
    let filtered = grouped.filter(p => p.listingName.toLowerCase().includes(q.toLowerCase()));
    if (minRating !== '') {
      filtered = filtered.filter(p => (p.avgRating ?? 0) >= Number(minRating));
    }
    if (sort === SortType.RatingDesc)
      filtered.sort((a, b) => (b.avgRating ?? 0) - (a.avgRating ?? 0));
    if (sort === SortType.RatingAsc)
      filtered.sort((a, b) => (a.avgRating ?? 0) - (b.avgRating ?? 0));
    if (sort === SortType.Reviews) filtered.sort((a, b) => b.total - a.total);
    if (sort === SortType.Name) filtered.sort((a, b) => a.listingName.localeCompare(b.listingName));
    return filtered;
  }, [reviews, approvedIds, q, sort, minRating]);

  if (loading) return <div>Loading properties...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Header />
      <div className="properties-dashboard">
        <div className="container">
          <h1>Properties</h1>

          <div className="filters">
            <input
              placeholder="Search properties..."
              value={q}
              onChange={e => setQ(e.target.value)}
              className="filter-input"
              style={{ flex: 1 }}
            />
            <input
              type="number"
              min={0}
              max={10}
              placeholder="Min rating"
              value={minRating as string}
              onChange={e => setMinRating(e.target.value === '' ? '' : Number(e.target.value))}
              className="filter-input"
              style={{ width: 110 }}
            />
            <select
              value={sort}
              onChange={e => setSort(e.target.value as SortKey)}
              className="filter-input"
            >
              <option value={SortType.RatingDesc}>Rating (high → low)</option>
              <option value={SortType.RatingAsc}>Rating (low → high)</option>
              <option value={SortType.Reviews}># Reviews</option>
              <option value={SortType.Name}>Name</option>
            </select>
          </div>

          <div className="properties-list">
            {props.map(p => (
              <div key={p.listingName} className="property-card">
                <div>
                  <Link to={`/property/${encodeURIComponent(p.listingName)}`}>{p.listingName}</Link>
                  <div className="meta">
                    {p.total} reviews • Avg: {p.avgRating ? p.avgRating.toFixed(1) : 'N/A'}
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      display: 'flex',
                      gap: 6,
                      flexWrap: 'wrap',
                    }}
                  >
                    {p.topCategories.map(cat => (
                      <span key={cat.category} className="cat-pill">
                        {categoryLabel(cat.category)}: {cat.avg.toFixed(1)}
                      </span>
                    ))}
                  </div>
                </div>
                {p.total > 0 && (
                  <div style={{ textAlign: 'right' }}>
                    <div>Avg: {p.avgRating ? p.avgRating.toFixed(1) : 'N/A'}</div>
                    <div className="property-actions-group">
                      <button
                        className={` btn-link btn-manage view-reviews-btn ${selectedProperty === p.listingName ? 'active' : ''}`}
                        onClick={() =>
                          setSelectedProperty(
                            selectedProperty === p.listingName ? null : p.listingName
                          )
                        }
                      >
                        {selectedProperty === p.listingName ? 'Hide' : 'View Reviews'}
                      </button>
                    </div>
                  </div>
                )}

                {selectedProperty === p.listingName && (
                  <div className="property-reviews">
                    {p.reviews.map(r => (
                      <div key={r.id} className="review-item">
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div>
                            <strong>{r.guestName}</strong> — {r.rating ?? 'N/A'}
                            <div className="review-meta">
                              {new Date(r.submittedAt).toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <p style={{ marginTop: 8 }}>{r.publicReview}</p>
                        <div style={{ fontSize: 13 }}>
                          {r.reviewCategory.map(c => (
                            <span key={c.category} className="cat-pill">
                              {categoryLabel(c.category)}: {c.rating}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {props.length === 0 && (
              <div className="card empty-state">No properties match the filters.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertiesDashboard;

import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import useReviews from '../hooks/useReviews';
import { Review } from '../types/reviews';
import { categoryLabel } from '../utils/categoryLabels';
import { getApproved, toggleApproved } from '../utils/approvedReviews';
import Header from '../components/Header';
import { SortType, SortKey } from '../utils/types';

const groupByProperty = (reviews: Review[]) => {
  const map = new Map<string, Review[]>();
  reviews.forEach(r => {
    const key = r.listingName || 'Unknown';
    const arr = map.get(key) || [];
    arr.push(r);
    map.set(key, arr);
  });
  return Array.from(map.entries()).map(([listingName, revs]) => {
    const ratings = revs
      .map(r => (r.rating === null || r.rating === undefined ? null : r.rating))
      .filter(Boolean) as number[];
    const avgRating = ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : null;
    return { listingName, reviews: revs, avgRating, total: revs.length };
  });
};

const ManagerDashboard: React.FC = () => {
  const { reviews, loading, error } = useReviews();
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [minRating, setMinRating] = useState<number | ''>('');
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>(SortType.RatingDesc);
  const [approvedIds, setApprovedIds] = useState<number[]>(() => getApproved());

  const properties = useMemo(() => groupByProperty(reviews), [reviews]);

  const processed = useMemo(() => {
    return properties.map(p => {
      const filteredReviews =
        categoryFilter !== 'all'
          ? p.reviews.filter(r => r.reviewCategory.some(c => c.category === categoryFilter))
          : p.reviews.slice();

      const ratings = filteredReviews.map(r => r.rating ?? null).filter(Boolean) as number[];
      const avgFiltered = ratings.length
        ? ratings.reduce((a, b) => a + b, 0) / ratings.length
        : null;
      return { ...p, filteredReviews, avgFiltered };
    });
  }, [properties, categoryFilter]);

  // exclude properties that don't have any reviews matching the category filter
  const visible = useMemo(() => {
    let list = processed.slice();
    if (categoryFilter !== 'all') {
      list = list.filter(p => p.filteredReviews.length > 0);
    }
    if (minRating !== '') {
      list = list.filter(p => (p.avgFiltered ?? p.avgRating ?? 0) >= Number(minRating));
    }
    if (sort === SortType.RatingDesc)
      list.sort(
        (a, b) => (b.avgFiltered ?? b.avgRating ?? 0) - (a.avgFiltered ?? a.avgRating ?? 0)
      );
    if (sort === SortType.RatingAsc)
      list.sort(
        (a, b) => (a.avgFiltered ?? a.avgRating ?? 0) - (b.avgFiltered ?? b.avgRating ?? 0)
      );
    if (sort === SortType.Reviews) list.sort((a, b) => b.total - a.total);
    if (sort === SortType.Name) list.sort((a, b) => a.listingName.localeCompare(b.listingName));
    return list;
  }, [processed, minRating, sort, categoryFilter]);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div>Error: {error}</div>;

  const allCategories = Array.from(
    new Set(reviews.flatMap(r => r.reviewCategory.map(c => c.category)))
  );

  return (
    <>
      <Header />
      <div className="dashboard">
        <div className="container">
          <header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <h2>Manager Dashboard</h2>
          </header>

          <section className="filters">
            <label>
              Category:
              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="filter-input"
                style={{ marginLeft: 8 }}
              >
                <option value="all">All</option>
                {allCategories.map(c => (
                  <option key={c} value={c}>
                    {categoryLabel(c)}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Min Rating:
              <input
                type="number"
                min={0}
                max={10}
                value={minRating as any}
                onChange={e => setMinRating(e.target.value === '' ? '' : Number(e.target.value))}
                className="filter-input"
                style={{ width: 90, marginLeft: 8 }}
              />
            </label>

            <label>
              Sort:
              <select
                value={sort}
                onChange={e => setSort(e.target.value as any)}
                className="filter-input"
                style={{ marginLeft: 8 }}
              >
                <option value="rating_desc">Rating (high → low)</option>
                <option value="rating_asc">Rating (low → high)</option>
                <option value="reviews"># Reviews</option>
                <option value="name">Name</option>
              </select>
            </label>
          </section>

          <section style={{ display: 'flex', gap: 24, marginTop: 20 }}>
            <div style={{ flex: 1 }}>
              <h3>Properties</h3>
              <div className="properties-list">
                {visible.map(p => (
                  <div key={p.listingName} className="property-card">
                    <div>
                      <strong>{p.listingName}</strong>
                      <div className="meta">
                        {p.filteredReviews.length} reviews (total {p.total})
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div>
                        Avg:{' '}
                        {(p.avgFiltered ?? p.avgRating)
                          ? ((p.avgFiltered ?? p.avgRating) as number).toFixed(1)
                          : 'N/A'}
                      </div>
                      <div className="property-actions-group">
                        <button
                          className={`btn-link btn-manage ${selectedProperty === p.listingName ? 'active' : ''}`}
                          onClick={() =>
                            setSelectedProperty(
                              selectedProperty === p.listingName ? null : p.listingName
                            )
                          }
                        >
                          {selectedProperty === p.listingName ? 'Hide' : 'Manage Reviews'}
                        </button>
                      </div>
                    </div>

                    {selectedProperty === p.listingName && (
                      <div className="property-reviews">
                        {p.filteredReviews.map(r => (
                          <div
                            key={r.id}
                            style={{
                              padding: 8,
                              border: '1px solid var(--border)',
                              borderRadius: 8,
                              marginBottom: 8,
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                              }}
                            >
                              <div>
                                <strong>{r.guestName}</strong> — {r.rating ?? 'N/A'}
                                <div className="small">
                                  {new Date(r.submittedAt).toLocaleString()}
                                </div>
                              </div>
                              <div>
                                <label>
                                  <input
                                    type="checkbox"
                                    checked={approvedIds.includes(r.id)}
                                    onChange={() => {
                                      const next = toggleApproved(r.id);
                                      setApprovedIds(next);
                                    }}
                                  />{' '}
                                  Approved
                                </label>
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
                {visible.length === 0 && (
                  <div className="card">No properties match the filters.</div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ManagerDashboard;

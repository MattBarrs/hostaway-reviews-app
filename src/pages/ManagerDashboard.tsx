import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import useReviews from '../hooks/useReviews';
import { Review } from '../types/reviews';
import { categoryLabel } from '../utils/categoryLabels';
import { getApproved, toggleApproved, isApproved } from '../utils/approvedReviews';
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
      .map(r => (r.rating === null || r.rating === undefined) ? null : r.rating)
      .filter(Boolean) as number[];
    const avgRating = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length) : null;
    return { listingName, reviews: revs, avgRating, total: revs.length };
  });
};

const ManagerDashboard: React.FC = () => {
  const { reviews, loading, error } = useReviews();
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [minRating, setMinRating] = useState<number | ''>('');
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>(SortType.RatingDesc);

  const properties = useMemo(() => groupByProperty(reviews), [reviews]);

  const processed = properties.map(p => {
    const filteredReviews = p.reviews.filter(r => {
      if (categoryFilter !== 'all') {
        return r.reviewCategory.some(c => c.category === categoryFilter);
      }
      return true;
    });
    const ratings = filteredReviews.map(r => (r.rating ?? null)).filter(Boolean) as number[];
    const avgFiltered = ratings.length ? (ratings.reduce((a,b)=>a+b,0)/ratings.length) : null;
    return { ...p, filteredReviews, avgFiltered };
  });

  // exclude properties that don't meet minRating (use avgFiltered first, fallback to avgRating)
  const visible = useMemo(() => {
    let list = processed.slice();
    if (minRating !== '') {
      list = list.filter(p => ((p.avgFiltered ?? p.avgRating ?? 0) >= Number(minRating)));
    }
    if (sort === 'rating_desc') list.sort((a,b) => (b.avgFiltered ?? b.avgRating ?? 0) - (a.avgFiltered ?? a.avgRating ?? 0));
    if (sort === 'rating_asc') list.sort((a,b) => (a.avgFiltered ?? a.avgRating ?? 0) - (b.avgFiltered ?? b.avgRating ?? 0));
    if (sort === 'reviews') list.sort((a,b) => b.total - a.total);
    if (sort === 'name') list.sort((a,b) => a.listingName.localeCompare(b.listingName));
    return list;
  }, [processed, minRating, sort]);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div>Error: {error}</div>;

  const allCategories = Array.from(new Set(reviews.flatMap(r => r.reviewCategory.map(c => c.category))));

  return (
    <>
      <Header />
      <div className="dashboard" style={{padding:20}}>
        <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h2>Manager Dashboard</h2>
        </header>

        <section style={{marginTop: 16, display:'flex', gap:12, alignItems:'center'}}>
          <label>
            Category:
            <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} style={{marginLeft:8}}>
              <option value="all">All</option>
              {allCategories.map(c => <option key={c} value={c}>{categoryLabel(c)}</option>)}
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
              style={{width:80, marginLeft:8}}
            />
          </label>

          <label>
            Sort:
            <select value={sort} onChange={e => setSort(e.target.value as any)} style={{marginLeft:8}}>
              <option value="rating_desc">Rating (high → low)</option>
              <option value="rating_asc">Rating (low → high)</option>
              <option value="reviews"># Reviews</option>
              <option value="name">Name</option>
            </select>
          </label>
        </section>

        <section style={{display: 'flex', gap: 24, marginTop: 24}}>
          <div style={{flex: 1}}>
            <h3>Properties</h3>
            <ul style={{listStyle: 'none', padding: 0}}>
              {visible.map(p => (
                <li key={p.listingName} style={{padding:8, borderBottom:'1px solid #eee'}}>
                  <div style={{display:'flex', justifyContent:'space-between'}}>
                    <div>
                      <strong>{p.listingName}</strong>
                      <div style={{fontSize:12, color:'#666'}}>{p.filteredReviews.length} reviews (total {p.total})</div>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <div>Avg: {(p.avgFiltered ?? p.avgRating) ? ((p.avgFiltered ?? p.avgRating) as number).toFixed(1) : 'N/A'}</div>
                      <div style={{marginTop:6}}>
                        <Link to={`/property/${encodeURIComponent(p.listingName)}`}>View property</Link>
                        <button style={{marginLeft:8}} onClick={() => setSelectedProperty(selectedProperty === p.listingName ? null : p.listingName)}>
                          {selectedProperty === p.listingName ? 'Hide' : 'Manage reviews'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {selectedProperty === p.listingName && (
                    <div style={{marginTop:12}}>
                      {p.filteredReviews.map(r => (
                        <div key={r.id} style={{padding:8, border:'1px solid #f0f0f0', marginBottom:8}}>
                          <div style={{display:'flex', justifyContent:'space-between'}}>
                            <div>
                              <strong>{r.guestName}</strong> — {r.rating ?? 'N/A'}
                              <div style={{fontSize:12, color:'#666'}}>{new Date(r.submittedAt).toLocaleString()}</div>
                            </div>
                            <div>
                              <label>
                                <input
                                  type="checkbox"
                                  checked={isApproved(r.id)}
                                  onChange={() => toggleApproved(r.id)}
                                /> Approved
                              </label>
                            </div>
                          </div>
                          <p style={{marginTop:8}}>{r.publicReview}</p>
                          <div style={{fontSize:13}}>
                            {r.reviewCategory.map(c => <span key={c.category} style={{marginRight:10}}>{categoryLabel(c.category)}: {c.rating}</span>)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              ))}
              {visible.length === 0 && <li style={{padding:12}}>No properties match the filters.</li>}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};

export default ManagerDashboard;
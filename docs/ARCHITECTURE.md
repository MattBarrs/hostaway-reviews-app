# Architecture & Design Decisions

## Component Structure

### Page Components

#### Home (`/`)
- Landing page with hero section
- Background image

#### PropertiesDashboard (`/properties-dashboard`)
- Public-facing properties view
- Shows only **approved reviews**
- View-only interface (no management controls)
- Filter by search, minimum rating
- Sort by rating, review count, name

#### ManagerDashboard (`/dashboard`)
- Manager control panel
- Shows **all reviews** (approved and unapproved)
- Approve/disapprove individual reviews
- Inline review expansion
- Filter and sort reviews
- Store approvals in LocalStorage

#### ReviewDisplayPage (`/property/:listingName`)
- Detailed property page
- Shows reviews for single property
- Only displays approved reviews
- Back button uses browser history

### Shared Components
- **Header** - Navigation with logo
- **ReviewCard** - Individual review display
- **ReviewList** - List of reviews

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   useReviews() Hook                      │
│         (Fetches reviews from API/Mock data)             │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   Review[] Array                         │
│        (Raw review data from backend)                    │
└────────────────────┬────────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
         ▼                       ▼
┌──────────────────────┐  ┌──────────────────────┐
│  ManagerDashboard    │  │ PropertiesDashboard  │
│  (Show All Reviews)  │  │ (Show Approved Only) │
└────────┬─────────────┘  └──────────┬───────────┘
         │                           │
         ├─► getApproved()           │
         │   (from LocalStorage)     │
         │                           │
         ▼                           ▼
    Filter & Sort            Filter & Sort
         │                           │
         ▼                           ▼
    Render Cards              Render Cards
         │                           │
         └───────────┬───────────────┘
                     │
                     ▼
         ┌──────────────────────┐
         │  ReviewDisplayPage   │
         │  (Single Property)   │
         └──────────────────────┘
```

## Review Approval System

### Approval Logic

1. **ManagerDashboard** displays all reviews
2. Manager clicks "Approve" / "Disapprove" button
3. Review ID added/removed from `approvedIds` array
4. Array saved to `localStorage` under key `approvedReviewIds`
5. **PropertiesDashboard** filters reviews by `approvedIds`

### Storage Structure

```javascript
// localStorage['approvedReviewIds']
[1, 3, 5, 7, 12, 15, ...]  // Array of approved review IDs
```

### Persistence

- Survives page refreshes
- Survives browser restarts
- Per-device storage (not synced across devices)
- Can be cleared via browser DevTools

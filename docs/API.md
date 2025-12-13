# API & Routes

## Route Structure

### Public Routes

| Route | Component | Purpose | Access |
|-------|-----------|---------|--------|
| `/` | Home | Landing page with hero section | Public |
| `/properties-dashboard` | PropertiesDashboard | Browse properties with approved reviews | Public |
| `/property/:listingName` | ReviewDisplayPage | Detailed reviews for single property | Public |

### Manager Routes

| Route | Component | Purpose | Access |
|-------|-----------|---------|--------|
| `/dashboard` | ManagerDashboard | Manager control panel | Private (for managers) |

## State Management

### LocalStorage Keys
| Key | Type | Purpose |
|-----|------|---------|
| `approvedReviewIds` | `number[]` | Array of approved review IDs |
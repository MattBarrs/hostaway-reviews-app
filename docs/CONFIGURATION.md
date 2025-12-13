# Configuration & Development

## Environment Variables

Currently, the app uses no environment variables for local development. Mock data is used or API calls are made to a local backend.

### Future Configuration

When integrating with a backend, add to `.env`:
```
REACT_APP_API_URL=http://localhost:3001
REACT_APP_API_KEY=your_api_key_here
REACT_APP_ENVIRONMENT=development
```

Load with:
```typescript
const apiUrl = process.env.REACT_APP_API_URL;
```

## Code Quality Configuration

### Prettier Config
**File:** `.prettierrc.json`

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

**Why These Settings:**
- `semi: true` - Explicit semicolons for safety
- `trailingComma: "es5"` - Avoid git diffs
- `singleQuote: true` - Consistent with codebase
- `printWidth: 100` - Balance readability and compactness
- `tabWidth: 2` - Standard React convention
- `arrowParens: "avoid"` - Less verbose
- `endOfLine: "lf"` - Cross-platform compatibility

### ESLint Config
**File:** `.eslintrc.json`

**Enabled Rules:**
- `@typescript-eslint/no-unused-vars` - Catch dead code
- `import/order` - Consistent import structure
- `react/react-in-jsx-scope` - Disabled (React 17+)
- `react/prop-types` - Disabled (TypeScript validates)

**Import Order:**
1. React
2. External packages
3. Internal absolute imports
4. Parent directory imports
5. Sibling imports
6. Index imports

**All alphabetically sorted within each group**

### Prettier Ignore
**File:** `.prettierignore`

```
node_modules
build
dist
.env
.git
package-lock.json
```

## Build Configuration

### Production Build

**Command:**
```bash
npm run build
```

**Process:**
1. Sets `NODE_OPTIONS=--openssl-legacy-provider` for webpack
2. Bundles all assets
3. Optimizes for production
4. Outputs to `build/` directory

**Output:**
- Minified JavaScript
- Optimized CSS
- Compressed images
- Source maps (for debugging)

### Why Legacy OpenSSL Provider?

Modern Node.js versions use OpenSSL 3.0 which disabled legacy algorithms that webpack 4.x uses. The flag allows backward compatibility without updating webpack.

**When to Update:**
- When moving to Create React App 5.0+
- When upgrading webpack to v5+
- Migration will be automatic at that point

## Development Environment

### File Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx
│   ├── ReviewCard.tsx
│   └── ReviewList.tsx
├── pages/              # Full page components
│   ├── Home.tsx
│   ├── ManagerDashboard.tsx
│   ├── PropertiesDashboard.tsx
│   └── ReviewDisplayPage.tsx
├── hooks/              # Custom React hooks
│   └── useReviews.ts
├── utils/              # Utility functions
│   ├── approvedReviews.ts
│   ├── categoryLabels.ts
│   └── types.ts
├── types/              # TypeScript type definitions
│   └── reviews.ts
├── styles/             # CSS files
│   ├── hostaway.css
│   ├── header.css
│   ├── dashboard.css
│   └── ...
├── App.tsx             # Root component
└── index.tsx           # Entry point
```

### Hot Reload

Changes to `.tsx` and `.css` files automatically reload without losing state.

### Browser DevTools

**React DevTools:**
- Inspect component hierarchy
- View props and state
- Debug component rendering

**Redux DevTools:**
- Not currently used
- Can be added if state grows

**Application Tab:**
- View LocalStorage data
- Inspect approvedReviewIds
- Clear cache if needed

## Testing

### Current Setup
```bash
npm test
```

Runs Jest with React Scripts test runner.

### Adding Tests

**Unit Tests:**
```typescript
// src/utils/approvedReviews.test.ts
describe('approvedReviews', () => {
  test('getApproved returns array', () => {
    const result = getApproved();
    expect(Array.isArray(result)).toBe(true);
  });
});
```

**Component Tests:**
```typescript
// src/components/ReviewCard.test.tsx
import { render } from '@testing-library/react';
import ReviewCard from './ReviewCard';

test('renders guest name', () => {
  const { getByText } = render(<ReviewCard review={mockReview} />);
  expect(getByText('John Doe')).toBeInTheDocument();
});
```

## Performance Monitoring

### Bundle Analysis

```bash
# Install
npm install --save-dev source-map-explorer

# Analyze
npx source-map-explorer 'build/js/*.js'
```

### Key Metrics to Track

1. **Bundle Size**
   - Target: < 200KB (gzipped)
   - Monitor on each build

2. **Lighthouse Score**
   - Target: 90+ overall
   - Check quarterly

3. **Runtime Performance**
   - Frame rate: 60 FPS
   - Time to Interactive: < 3s

4. **Network Requests**
   - Minimize API calls
   - Cache review data
   - Compress images

## Git Workflow

### Recommended Branch Structure
```
main (production-ready)
├── develop (development branch)
└── feature/xxx (feature branches)
```

### Pre-commit Checks
```bash
npm run lint:fix
npm run format:fix
```

Consider adding husky for automatic pre-commit hooks:
```bash
npm install husky --save-dev
npx husky install
npx husky add .husky/pre-commit "npm run lint:fix && npm run format:fix"
```

## Deployment

### Build for Production
```bash
npm run build
```

### Static Hosting (Vercel, Netlify)
1. Connect repository
2. Build command: `npm run build`
3. Output directory: `build`
4. Deploy

### Server Hosting (Node.js)
```bash
npm install --production
npm start
```

Serve `build/` directory as static files.

## Troubleshooting

### Port 3000 Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### Cache Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### TypeScript Errors
```bash
# Rebuild TypeScript
npx tsc --noEmit

# Check for any type issues
npm run lint
```

### Styling Issues
```bash
# Ensure CSS variables are defined
# Check in src/styles/theme.css

# Clear browser cache
# Press Ctrl+Shift+Delete in browser
```
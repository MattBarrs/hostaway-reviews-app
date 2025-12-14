# Setup Instructions

## Running Version / Local Setup Instructions

### Prerequisites
- Node.js v16+ (tested with v24.12.0)
- npm v8+

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hostaway-reviews-app
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Build & Start the development server:
```bash
npm run server:build
npm run server:start
```

The app will open at `http://localhost:4000`

### Available Scripts

```bash
npm start              # Start dev server
npm run build          # Production build (with legacy OpenSSL support)
npm run test           # Run tests
npm run lint           # Check code quality
npm run lint:fix       # Auto-fix linting issues
npm run format         # Check code formatting
npm run format:fix     # Auto-format code
```

### Build Notes

The production build uses `NODE_OPTIONS=--openssl-legacy-provider` to support webpack compatibility with Node.js v17+. This is handled automatically in the build script.

### Troubleshooting

**Peer dependency conflicts during install:**
```bash
npm install --legacy-peer-deps
```

**Build fails with OpenSSL error:**
- Already handled in build script
- If manual build needed: `NODE_OPTIONS=--openssl-legacy-provider npm run build`

**ESLint/Prettier issues:**
```bash
npm run lint:fix
npm run format:fix
```
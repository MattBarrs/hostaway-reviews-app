# Tech Stack

## Frontend

### Core Libraries
- **React** 17.0.2 - UI framework for building components
- **React Router** 5.x - Client-side routing and navigation
- **TypeScript** 5.9.3 - Type-safe JavaScript with compile-time checking

### Styling
- **CSS3** - Custom CSS with CSS variables for theming
- **CSS Grid & Flexbox** - Modern layout techniques
- **Responsive Design** - Mobile-first approach with clamp() for typography

### Development & Quality Assurance

#### Code Quality
- **ESLint** - Linting with import ordering and TypeScript support
- **Prettier** - Code formatting (100px line width, single quotes)
- **@typescript-eslint** - TypeScript-specific linting rules

#### Build & Runtime
- **react-scripts** 4.0.3 - Create React App build tooling
- **webpack** - Module bundling (with legacy OpenSSL support)
- **Babel** - JavaScript transpilation

### State Management & Storage

#### Persistence
- **LocalStorage API** - Persistent storage for approved review IDs, this was done due to time contraints. Given more time a backend DB could be configured and written to in order to persist the state. 
- No external state management library (simple requirements)



## Why These Choices?
### TypeScript
- Catch errors at compile-time
- Self-documenting code through types
- Better IDE support and refactoring capabilities
- Team consistency and maintainability

### LocalStorage
- No backend dependency for MVP
- Fast client-side persistence
- Easy to migrate to backend API later
- Suitable for single-device use cases

### API and Server in one
- For MVP the server and API was written as one, this was done due to ease/speed. Would be good to split the two of them. 
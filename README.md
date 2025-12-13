# Hostaway Reviews App

This project is a React application that integrates with the Hostaway Reviews API to provide a manager dashboard for review management and performance tracking.

## Features

- Fetch and display reviews from the Hostaway Reviews API.
- Manager dashboard for filtering and sorting reviews.
- Individual review cards displaying guest names, review texts, and ratings.

## Project Structure

```
hostaway-reviews-app
├── src
│   ├── api
│   │   ├── client.ts          # Axios client setup for API requests
│   │   └── reviews.ts         # Functions to fetch and normalize reviews
│   ├── components
│   │   ├── ReviewCard.tsx     # Component for displaying individual reviews
│   │   ├── ReviewList.tsx     # Component for listing multiple reviews
│   │   └── Dashboard.tsx       # Manager dashboard component
│   ├── pages
│   │   ├── Home.tsx           # Landing page component
│   │   └── ManagerDashboard.tsx # Dashboard interface for managers
│   ├── types
│   │   └── reviews.ts         # TypeScript interfaces for reviews
│   ├── hooks
│   │   └── useReviews.ts      # Custom hook for managing review state
│   ├── App.tsx                # Main application component
│   ├── index.tsx              # Entry point of the React application
│   └── styles
│       └── index.css          # Global styles for the application
├── public
│   └── index.html             # Main HTML template for the React app
├── package.json                # npm configuration file
├── tsconfig.json              # TypeScript configuration file
└── README.md                  # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd hostaway-reviews-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

- The home page provides an overview of the reviews.
- Navigate to the manager dashboard to filter and manage reviews.
- Each review card displays detailed information about the review, including ratings for different categories.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.
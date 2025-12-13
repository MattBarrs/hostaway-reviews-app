import React from 'react';
import './styles/hostaway.css';
import './styles/theme.css';
import './styles/header.css';
import './styles/layout.css';
import './styles/dashboard.css';
import './styles/properties.css';
import './styles/reviews.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ManagerDashboard from './pages/ManagerDashboard';
import PropertyPage from './pages/ReviewDisplayPage';
import './styles/index.css';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/dashboard" component={ManagerDashboard} />
        <Route path="/property/:listingName" component={PropertyPage} />
      </Switch>
    </Router>
  );
};

export default App;
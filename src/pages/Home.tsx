import React from 'react';
import Header from '../components/Header';

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <section
        className="hero"
        style={{
          backgroundImage: 'url(/main-background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="hero-inner container">
          <div>
            <h1 className="hero-title">Book Beautiful Stays</h1>
            <p className="lead">Find thoughtfully designed homes across the city</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

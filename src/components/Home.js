import React, { useState, useEffect } from 'react';
import video from './Videos/video-2.mp4';
import { Link } from 'react-router-dom';
import Services from './ServicesWeOffer';
import '../index.css';

const Home = ({ isLoggedIn }) => {
  const [codingVisible, setCodingVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const codingSection = document.getElementById('coding-section');
      if (codingSection) {
        const top = codingSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        setCodingVisible(top < windowHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="container-fluid p-0">
      <div className="hero-container">
        <video src={video} autoPlay loop muted className="w-100 h-100 object-fit-cover" />
        <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
          <h1 className="display-4">
            Build your coding skills <br />
            through <strong className="text-primary">CodexHub</strong>
          </h1>
          <p className="lead">
            We will help you in every coding phase to <br /> design and build your skills.
          </p>
          <div className="mt-3">
                     <Link
  to={isLoggedIn ? '/contest' : '/login'}
  className="btn btn-primary btn-lg"
>
  {isLoggedIn ? "Explore now" : "Get Started"}
</Link>
          </div>
        </div>
      </div>

      <hr />

      <div 
        id="coding-section" 
        className={`coding-section ${codingVisible ? 'visible' : ''}`}
      >
        <Services />
      </div>
    </div>
  );
};

export default Home;

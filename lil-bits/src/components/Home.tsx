import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { getOrder } from '../api/ordersApi';
import carousel1 from '../assets/carousel1.png';
import carousel2 from '../assets/carousel2.png';
import carousel3 from '../assets/carousel3.png';
import './Home.css';

const Home: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const images = [carousel1, carousel2, carousel3];
    setShuffledImages(shuffleArray(images));
  }, []);

  const handleStartOrder = () => {
    navigate('/pick-dish');
  };

  const handleFindOrder = async () => {
    try {
      const order = await getOrder(email);
      if (order) {
        navigate('/pick-dish', { state: { order } });
      } else {
        alert('Email not found');
      }
    } catch (error) {
      console.error('Error finding order', error);
      alert('Failed to find order. Please ensure the API server is running.');
    }
  };

  const clickPrev = () => {
    const prevButton = document.querySelector('.carousel .control-prev') as HTMLElement;
    if (prevButton) prevButton.click();
  };

  const clickNext = () => {
    const nextButton = document.querySelector('.carousel .control-next') as HTMLElement;
    if (nextButton) nextButton.click();
  };

  return (
    <div>
      <header className="header">
        <div className="logo-container">
          <img
            src="http://ih1.redbubble.net/image.181146356.8650/sticker,375x360.u1.png"
            alt="Logo"
            className="logo"
          />
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <span className="nav-link current">Home</span>
            </li>
            <li className="nav-item">
              <span className="nav-link">Products</span>
            </li>
            <li className="nav-item">
              <span className="nav-link">Contact</span>
            </li>
            <li className="nav-item">
              <span className="nav-link">Restaurants</span>
            </li>
          </ul>
        </nav>
      </header>
      <div className="main-container">
        <div className="carousel-order-container">
          <div className="carousel-container">
            <Carousel
              showArrows={false}
              showThumbs={false}
              showIndicators={true}
              emulateTouch={true}
              infiniteLoop={true}
            >
              {shuffledImages.map((image, index) => (
                <div key={index} className="carousel-slide">
                  <div className="clickable-area left-side" onClick={clickPrev}></div>
                  <img src={image} alt={`Carousel ${index + 1}`} />
                  <div className="clickable-area right-side" onClick={clickNext}></div>
                </div>
              ))}
            </Carousel>
          </div>
          <div className="order-box">
            <h2>Start New Order!</h2>
            <button className="order-button" onClick={handleStartOrder}>Order</button>
          </div>
        </div>
      </div>
      <div className="order-section">
        <div className="order-form">
          <h3>Find an Order</h3>
          <input
            type="email"
            placeholder="Enter Email Address..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="find-order-button" onClick={handleFindOrder}>Find</button>
        </div>
      </div>
    </div>
  );
};

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default Home;

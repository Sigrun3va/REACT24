import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PickDish.css';

const PickDish: React.FC = () => {
  const [dish, setDish] = useState<any>(null);
  const navigate = useNavigate();

  const fetchDish = async () => {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
      setDish(response.data.meals[0]);
    } catch (error) {
      console.error('Error fetching dish:', error);
    }
  };

  useEffect(() => {
    fetchDish();
  }, []);

  const handleNext = () => {
    navigate('/select-drinks', { state: { selectedDish: dish } });
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
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link">Products</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">Contact</Link>
            </li>
            <li className="nav-item">
              <Link to="/restaurants" className="nav-link">Restaurants</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="pickdish-page">
        <div className="dish-container">
          <h2>Choose dish!</h2>
          {dish && (
            <>
              <h2>{dish.strMeal}</h2>
              <img src={dish.strMealThumb} alt={dish.strMeal} />
              <p>{dish.strInstructions}</p>
              <div className="selected-dish-message">You have selected {dish.strMeal}</div>
            </>
          )}
          <button onClick={fetchDish} className="generate-dish-button">Generate New Dish</button>
        </div>
        <div className="next-container" onClick={handleNext}>
          <span>Click to select drinks</span>
          <button className="next-button">Next</button>
        </div>
      </div>
    </div>
  );
};

export default PickDish;

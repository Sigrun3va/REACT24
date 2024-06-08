import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './SelectDrinks.css';

interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  price: number;
}

const SelectDrinks: React.FC = () => {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [selectedDrinks, setSelectedDrinks] = useState<Drink[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedDish = location.state?.selectedDish;

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail');
        const drinksWithPrices = response.data.drinks.map((drink: Drink) => ({
          ...drink,
          price: Math.floor(Math.random() * 10) + 5, // Assign a random price between $5 and $15
        }));
        setDrinks(drinksWithPrices);
      } catch (error) {
        console.error('Error fetching drinks', error);
      }
    };

    fetchDrinks();
  }, []);

  const toggleDrinkSelection = (drink: Drink) => {
    setSelectedDrinks((prevSelectedDrinks) =>
      prevSelectedDrinks.find((d) => d.idDrink === drink.idDrink)
        ? prevSelectedDrinks.filter((d) => d.idDrink !== drink.idDrink)
        : [...prevSelectedDrinks, drink]
    );
  };

  const handleNext = () => {
    if (selectedDrinks.length === 0) {
      alert('Please select at least one drink.');
      return;
    }

    const orderDetails = {
      selectedDish,
      selectedDrinks,
    };

    navigate('/order', { state: { orderDetails } });
  };

  return (
    <div className="selectdrinks-page">
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
              <span className="nav-link">Home</span>
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
      <div className="main-content">
        <h1>Select Drinks</h1>
        <div className="drink-container">
          {drinks.map((drink) => (
            <div
              key={drink.idDrink}
              className={`drink-card ${selectedDrinks.find((d) => d.idDrink === drink.idDrink) ? 'selected' : ''}`}
              onClick={() => toggleDrinkSelection(drink)}
            >
              <img src={drink.strDrinkThumb} alt={drink.strDrink} />
              <h2>{drink.strDrink}</h2>
              <p>${drink.price.toFixed(2)}</p> {/* Display drink price */}
            </div>
          ))}
        </div>
        <div className="sticky-button-container">
          <span className="selected-drinks-count">
            {selectedDrinks.length} drink(s) selected
          </span>
          <button onClick={handleNext} className="next-button">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectDrinks;

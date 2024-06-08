import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Receipt.css';

const Receipt: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state?.orderDetails;

  if (!orderDetails) {
    return <div>Error: No order details found.</div>;
  }

  const { selectedDish, selectedDrinks, date, people, email } = orderDetails;
  const foodPrice = 20; // Standard price of $20
  const drinksPrice = selectedDrinks.reduce((total: number, drink: any) => total + drink.price, 0);
  const totalPrice = (foodPrice * people) + drinksPrice;

  return (
    <div className="receipt-container">
      <h2>Receipt</h2>
      <div className="receipt-item">
        <h3>Dish</h3>
        <p>Name: {selectedDish?.strMeal}</p>
        <p>Price: ${foodPrice.toFixed(2)}</p>
        <p>Amount for {people} people: ${(foodPrice * people).toFixed(2)}</p>
      </div>
      <div className="receipt-item">
        <h3>Drinks</h3>
        {selectedDrinks.map((drink: any) => (
          <div key={drink.idDrink}>
            <p>Name: {drink.strDrink}</p>
            <p>Price: ${drink.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="receipt-item">
        <h3>Details</h3>
        <p>Date: {date.toString()}</p>
        <p>People: {people}</p>
        <p>Email: {email}</p>
      </div>
      <div className="receipt-item">
        <h3>Total Price</h3>
        <p>${totalPrice.toFixed(2)}</p>
      </div>
      <button onClick={() => navigate('/')}>Home</button>
    </div>
  );
};

export default Receipt;

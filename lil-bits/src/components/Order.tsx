import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createOrder, updateOrder } from '../api/ordersApi';
import './Order.css';

const Order: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | null>(null);
  const [people, setPeople] = useState<number>(1);
  const [email, setEmail] = useState<string>('');

  const orderDetails = location.state?.orderDetails;

  const handleNext = async () => {
    if (!date || people < 1 || people > 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter valid information.');
      return;
    }

    const newOrderDetails = {
      ...orderDetails,
      date,
      people,
      email,
    };

    try {
      if (orderDetails) {
        await updateOrder(newOrderDetails);
      } else {
        await createOrder(newOrderDetails);
      }
      navigate('/receipt', { state: { orderDetails: newOrderDetails } });
    } catch (error) {
      console.error('Error creating/updating order:', error);
      alert('Failed to create/update order. Please try again.');
    }
  };

  const filterTime = (time: Date) => {
    const hour = time.getHours();
    return hour >= 16 && hour <= 23;
  };

  const today = new Date();
  const minTime = new Date();
  minTime.setHours(16, 0, 0, 0);
  const maxTime = new Date();
  maxTime.setHours(23, 0, 0, 0);

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
        <div className="order-container">
          <h2>Order Details</h2>
          <div className="order-form">
            <label>Date and Time:</label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              showTimeSelect
              dateFormat="Pp"
              timeFormat="HH:mm"
              minDate={today}
              placeholderText="Select a date and time"
              filterTime={filterTime}
              minTime={minTime}
              maxTime={maxTime}
            />
            <label>Number of People:</label>
            <div className="people-input">
              <button onClick={() => setPeople(Math.max(1, people - 1))}>-</button>
              <input
                type="number"
                min="1"
                max="10"
                value={people}
                onChange={(e) => setPeople(Number(e.target.value))}
              />
              <button onClick={() => setPeople(Math.min(10, people + 1))}>+</button>
            </div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <button onClick={handleNext} className="next-button">
              {orderDetails ? 'Update Order' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;

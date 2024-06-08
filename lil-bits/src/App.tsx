import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import PickDish from './components/PickDish';
import SelectDrinks from './components/SelectDrinks';
import Order from './components/Order';
import Receipt from './components/Receipt'; 
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pick-dish" element={<PickDish />} />
        <Route path="/select-drinks" element={<SelectDrinks />} />
        <Route path="/order" element={<Order />} />
        <Route path="/receipt" element={<Receipt />} />  
      </Routes>
    </Router>
  );
};

export default App;

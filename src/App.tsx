import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import WeatherForecast from './components/WeatherForecast';

const App: React.FC = () => {
  return (
    <Router basename="/weather-app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/weather/:city" element={<WeatherForecast />} />
      </Routes>
    </Router>
  );
};

export default App;

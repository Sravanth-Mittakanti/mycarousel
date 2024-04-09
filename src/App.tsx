import React, { useState } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import CarouselContainer from './components/CarouselContainer';

function App() {

  // Store Provider for state management
  return (
    <Provider store={store}>
      <div className="app">
        <h2>Welcome to My Image Carousel</h2>
        <CarouselContainer />
      </div>
    </Provider>
  );
} 

export default App;

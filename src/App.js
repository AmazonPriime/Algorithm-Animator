import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="content">
        <p>Main content</p>
      </div>
      <Footer />
    </div>
  );
}

export default App;

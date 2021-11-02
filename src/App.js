import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        Main content
        <Footer />
      </header>
    </div>
  );
}

export default App;

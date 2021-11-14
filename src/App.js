import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import GraphBuilder from './components/GraphBuilder';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="content">
        <GraphBuilder />
      </div>
      <Footer />
    </div>
  );
}

export default App;

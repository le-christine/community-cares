import React from 'react';
import './App.css';
import TopNav from './Nav';
import MainSearch from './MainSearch';
import ExampleSearch from './ExampleSearch';

function App() {
  return (
    <div className="App">
    <TopNav/>
    <MainSearch/>
    <ExampleSearch/>
    </div>
  );
}

export default App;

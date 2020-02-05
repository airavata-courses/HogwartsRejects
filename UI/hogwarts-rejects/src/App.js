import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './components/landing-page/HomePage'
import {BrowserRouter as Router , Route, Link} from "react-router-dom"

function App() {
  return (
    <Router>
    <Route path="/" exact component={HomePage}/>
    </Router>
  );
}

export default App;

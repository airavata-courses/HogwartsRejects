import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './components/landing-page/HomePage'
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard.js"
import DataSelection from "./components/new-activity/Dataselection"
import ActivityList from "./components/session-management/actvityList"
function App() {
  return (
    <BrowserRouter>
    <Switch>
    <Route path="/" exact component={HomePage}/>
    <Route path="/dashboard" component={Dashboard}/>
    </Switch>
    </BrowserRouter>
    
  );
}

export default App;

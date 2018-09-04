import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/layout/Navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        < Navbar />
      </div>
    );
  }
}

export default App;

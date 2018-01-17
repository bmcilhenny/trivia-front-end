import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import QuestionContainer from './containers/QuestionContainer';
import Navbar from './Navbar';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <QuestionContainer />
      </div>
    );
  }
}

export default App;

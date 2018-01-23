import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import QuestionContainer from './containers/QuestionContainer';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import GameOver from './components/GameOver';
import QuestionContent from './components/QuestionContent';
import StartGame from './components/StartGame'


class App extends Component {
  constructor() {
    super()

    this.state = {
      user1Id: null,
      user2Id: null,
      gameId: null
    }
  }

  setUpGame = (game) => {
    this.setState({
      user1Id: game.user1_id,
      user2Id: game.user2_id,
      gameId: game.id
    }, () => console.log(this.state))
  }

  render() {
    return (
      <Router>
          <div>
            <Route exact path="/gameover" component={GameOver} />
            <Route exact path="/startgame" render={ () => < StartGame setUpGame={this.setUpGame} />} />
            <Route exact path="/gametime" render={ () => < QuestionContainer user1Id={this.state.user1Id} user2Id={this.state.user2Id} gameId={this.state.gameId} />} />
          </div>

      </Router>
    );
  }
}

export default App;

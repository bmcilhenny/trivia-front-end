import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import QuestionContainer from './containers/QuestionContainer';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import GameOver from './components/GameOver';
import QuestionContent from './components/QuestionContent';
import StartGame from './components/StartGame'
import EditUser from './components/EditUser'
import NewUser from './components/NewUser'


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

  componentDidMount() {
    console.log("Mounting ", this.state)
  }

  render() {
    console.log(this.state);
    return (
      <Router>
          <div>
            <Route exact path="/gameover" component={GameOver} />
            <Route exact path="/new" component={NewUser} />
            <Route exact path="/edit" component={EditUser} />
            <Route exact path="/startgame" render={ (routerProps) => < StartGame routerProps={routerProps} setUpGame={this.setUpGame} />} />
            <Route exact path="/gametime" render={ (routerProps) => < QuestionContainer user1Id={this.state.user1Id} user2Id={this.state.user2Id} gameId={this.state.gameId} routerProps={routerProps}/>} />
          </div>

      </Router>
    );
  }
}

export default App;

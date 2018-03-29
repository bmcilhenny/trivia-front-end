import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import QuestionContainer from './containers/QuestionContainer';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import GameOver from './components/GameOver';
import QuestionContent from './components/QuestionContent';
import Home from './components/Home';
import EditUser from './components/EditUser';
import NewUser from './components/NewUser'
import { Container } from 'semantic-ui-react';


class App extends Component {
  constructor() {
    super()

    this.state = {
      user1Id: null,
      user2Id: null,
      gameId: null,
      user1Obj: null,
      user2Obj: null
    }
  }

  setUpGame = (game, user1, user2) => {
    this.setState({
      user1Id: game.user1_id,
      user2Id: game.user2_id,
      gameId: game.id,
      user1Obj: user1,
      user2Obj: user2
    }, () => console.log(this.state))
  }

  componentDidMount() {
    console.log("Mounting ", this.state)
  }

  render() {
    console.log(this.state);
    console.log("This is the process.env", process.env.PUBLIC_URL)
    // debugger
    return (
      <div>
        <Route exact path={`/gameover`} component={GameOver} />
        <Route exact path={`/new`} render={ (routerProps) => < NewUser routerProps={routerProps} />} />
        <Route exact path={`/edit`} render={ (routerProps) => < EditUser routerProps={routerProps} />} />
        <Route exact path={`/`} render={ (routerProps) => < Home routerProps={routerProps} setUpGame={this.setUpGame} />} />
        <Route exact path={`/gametime`} render={ (routerProps) => < QuestionContainer user1Id={this.state.user1Id} user1Obj={this.state.user1Obj} user2Id={this.state.user2Id} user2Obj={this.state.user2Obj} gameId={this.state.gameId} routerProps={routerProps}/>} />
      </div>
    );
  }
}

export default App;

import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import LeaderBoard from './LeaderBoard';
import {Header} from "semantic-ui-react";

class StartGame extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      counter: 5,
      displayCount: false,
      timer: null,
      players: [],
      player1Select: "",
      player2Select: "",
      leaderboard: []
    }
  }

  //grab the players from the database and set the players array in state to the db's list of players
  componentDidMount(){
    fetch('http://localhost:3000/api/v1/users')
    .then(resp => resp.json())
    .then(json => this.setState({players: json}))

    fetch('http://localhost:3000/api/v1/leaderboard')
    .then(resp => resp.json())
    .then(json => this.setState({leaderboard: json}))
  }

  //change the displayCount boolean to true, then start the 5 second counter. Once 5 seconds have passed, redirect to the /gametime path
  delayStartGame = () => {
    this.setState({
      displayCount: true,
      timer: window.setInterval(() => this.setState({counter: this.state.counter -1}), 1000)});
    setTimeout( () => {
       this.props.routerProps.history.push("/gametime");
    }, 5000);
  }

  // if same player is chosen, stop from moving forward. Else post the game to the database with the relevant users, start the 5 second counter
  handleClick = () => {
    if (this.state.player1Select === this.state.player2Select || this.state.player1Select === '' || this.state.player2Select === '') {
      alert("choose different players");
    } else {
      let myBody = {"user1_id": this.state.player1Select, "user2_id": this.state.player2Select}
      fetch('http://localhost:3000/api/v1/games', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(myBody)
      }).then(resp => resp.json())
      .then(json => {console.log(json); this.props.setUpGame(json); this.delayStartGame()})
    }

  }

  //update the state to reflect the selected player for player 1, same thing for player 2
  handlePlayer1Select = (event) => {
    this.setState({player1Select: event.target.value})
  }
  handlePlayer2Select = (event) => {
    this.setState({player2Select: event.target.value})
  }



  render() {


    let counter = this.state.counter
    return (
      <div>
        <Header as='h1'>Welcome</Header>
        <Link to="/new">
          <button>New User</button>
        </Link>
        <Link to="/edit">
          <button>Edit/Delete a User</button>
        </Link>
        <label>Select Player 1</label>
        <select value={this.state.player1Select} onChange={this.handlePlayer1Select}>
          <option value={''}>Select Your Player</option>
          {this.state.players.map(player => <option value={player.id} key={player.id}>{player.name}</option>)}
        </select>
        <label>Select Player 2</label>
        <select value={this.state.player2Select} onChange={this.handlePlayer2Select}>
          <option value={''}>Select Your Player</option>
          {this.state.players.map(player => <option value={player.id} key={player.id}>{player.name}</option>)}
        </select>
        <br/>
        <button onClick={this.handleClick}>Start a Game</button>
        <h1>{this.state.displayCount ? counter : ''}</h1>
        <LeaderBoard leaderboard={this.state.leaderboard} />
      </div>
    )
  }
}


export default StartGame;

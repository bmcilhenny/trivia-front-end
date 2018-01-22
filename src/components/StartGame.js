import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

class StartGame extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      counter: 5,
      displayCount: false,
      timer: null,
      players: [],
      player1Select: "",
      player2Select: ""
    }
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/users')
    .then(resp => resp.json())
    .then(json => this.setState({players: json}))
  }

  delayStartGame = () => {
    this.setState({
      displayCount: true,
      timer: window.setInterval(() => this.setState({counter: this.state.counter -1}), 1000)});
    setTimeout(function () {
       window.location.href = "/";
    }, 5000);
  }

  handleClick = () => {
    if (this.state.player1Select === this.state.player2Select) {
      alert("choose different players")
    } else {
      myBody: {user1_id: this.state.player1Select, user2_id: this.state.player2Select}
      fetch('http://localhost:3000/api/v1/games', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(myBody)
      }).then(resp => resp.json())
      .then(json => console.log(json); this.delayStartGame())
    }

  }

  handlePlayer1Select = (event) => {
    this.setState({player1Select: event.target.value}, () => console.log(this.state.player1Select))
  }
  handlePlayer2Select = (event) => {
    this.setState({player2Select: event.target.value})
  }




  render() {
    console.log(this.state.counter)
    let counter = this.state.counter
    return (
      <div>
        <h1>Welcome</h1>
        <label>Select Player 1</label>
        <select value={this.state.player1Select} onChange={this.handlePlayer1Select}>
          {this.state.players.map(player => <option value={player.id}>{player.name}</option>)}
        </select>
        <label>Select Player 2</label>
        <select value={this.state.player2Select} onChange={this.handlePlayer2Select}>
          {this.state.players.map(player => <option value={player.id}>{player.name}</option>)}
        </select>
        <br/>
        <button onClick={this.handleClick}>Start a Game</button>
        <h1>{this.state.displayCount ? counter : ''}</h1>
      </div>
    )
  }


}


export default StartGame;

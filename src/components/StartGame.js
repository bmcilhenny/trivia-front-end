import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import LeaderBoard from './LeaderBoard';
import {Header, Segment, Divider, Icon, Button, Container, Dropdown} from "semantic-ui-react";
import Jumbo from '../Jumbo';

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
      leaderboard: [],
      activeItem: 'home'
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
  handlePlayer1Select = (event, data) => {
    this.setState({player1Select: data.value});
  }

  handlePlayer2Select = (event, data) => {
    this.setState({player2Select: data.value})
  }

  // this function is required to populate the Dropdown Semantic component with "options"
  createOptionsForForm = () => {
    let newArr = []
    this.state.players.forEach(el => newArr.push(Object.assign({text: el.name, key: el.id, value: el.id})))
    return newArr;
}


  render() {
    let counter = this.state.counter;
    console.log(this.state)
    return (
      <div>
        <Jumbo handleClick={this.handleClick}/>

        <div>

          <Link to="/new">
            <button>New User</button>
          </Link>
          <Link to="/edit">
            <button>Edit/Delete a User</button>
          </Link>
          <Dropdown
            onChange={this.handlePlayer1Select}
            options={this.createOptionsForForm()}
            placeholder='Select Player 1'
            selection
            value={this.state.player1Select}
          />
          <Dropdown
            onChange={this.handlePlayer2Select}
            options={this.createOptionsForForm()}
            placeholder='Select Player 2'
            selection
            value={this.state.player2Select}
          />

          <h1>{this.state.displayCount ? counter : ''}</h1>
          <Segment>
            <Divider horizontal>LeaderBoard</Divider>
          </Segment>
          <LeaderBoard leaderboard={this.state.leaderboard} />
        </div>
      </div>
    )
  }
}


export default StartGame;

// <Container>
//   <Button animated='fade' onClick={this.handleClick} color="black">
//     <Button.Content visible>
//       Start a Game
//     </Button.Content>
//     <Button.Content hidden>
//       Let's Get Sloppy
//     </Button.Content>
//   </Button>
// </Container>
//

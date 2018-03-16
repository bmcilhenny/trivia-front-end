import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import LeaderBoard from './LeaderBoard';
import {Header, Segment, Divider, Icon, Button, Container, Dropdown} from "semantic-ui-react";
import Jumbo from '../Jumbo';
import Sound from 'react-sound';
import {API_ROOT} from '../constants';

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      counter: 5,
      displayCount: false,
      timer: null,
      players: [],
      player1Select: "",
      player1: null,
      player2Select: "",
      player2: null,
      leaderboard: [],
      activeItem: 'home',
      play: false,
      theme: "PLAYING"
    }
  }

  //grab the players from the database and set the players array in state to the db's list of players
  componentDidMount(){
    fetch(`${API_ROOT}/users`)
    .then(resp => resp.json())
    .then(json => this.setState({players: json}))

    fetch(`${API_ROOT}/leaderboard`)
    .then(resp => resp.json())
    .then(json => this.setState({leaderboard: json}))
  }

  //change the displayCount boolean to true, then start the 5 second counter. Once 5 seconds have passed, redirect to the /gametime path
  delayStartGame = () => {
    this.setState({
      displayCount: true,
      play: "PLAYING",
      theme: "FALSE",
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
      fetch(`${API_ROOT}/games`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(myBody)
      }).then(resp => resp.json())
      .then(json => {console.log(json); this.props.setUpGame(json, this.state.player1, this.state.player2); this.delayStartGame()})
    }
  }



  //update the state to reflect the selected player for player 1, same thing for player 2
  handlePlayer1Select = (event, data) => {
    let player1 = this.state.players.find(x => x.id === data.value)
    this.setState({
      player1Select: data.value,
      player1: player1
    });
  }

  handlePlayer2Select = (event, data) => {
    let player2 = this.state.players.find(x => x.id === data.value)
    this.setState({
      player2Select: data.value,
      player2: player2
    })
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
        <Jumbo handleClick={this.handleClick} displayCount={this.state.displayCount} counter={counter} onChange1={this.handlePlayer1Select} onChange2={this.handlePlayer2Select} createOptionsForForm={this.createOptionsForForm} player1Select={this.state.player1Select} leaderboard={this.state.leaderboard} player2Select={this.state.player2Select}/>
        <Sound
          url="http://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=Jeopardy+Board+SMS&filename=mj/Mjc4OTQ5Nzc4Mjc4OTI1_Da0o9hEwISM.MP3"
          playStatus={this.state.play}
          onFinishedPlaying={() => this.setState({play: false})}
         />
        <Sound
          url='https://www.myinstants.com/media/sounds/jeopardy-theme-lowq.mp3'
          playStatus={this.state.theme}
          loop="true"
         />
      </div>
    )
  }
}


export default Home;
